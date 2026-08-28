"""Lift the subject out of a studio portrait.

Skin and a warm studio backdrop overlap heavily in colour, and the backdrop is
rarely flat — these shots are lit with a vignette, so its tone drifts across the
frame. A single threshold therefore either leaves patches behind or eats the
skin.

So the backdrop is *modelled* rather than thresholded: a quadratic surface is
fitted per channel to pixels that look like backdrop, refitted a few times
against its own inliers so the subject stops influencing it. Every pixel is then
scored by how far it sits from that surface. The mask is grown inward from the
frame edge, so anything the growth cannot reach — hair, the roller, the hand —
survives regardless of its colour.

    FACE_SRC="photo.png" python make-face-cutout.py  ->  public/ritual-face.png
"""
import os

from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

SRC = os.environ.get("FACE_SRC", "public/face-source.png")
OUT = os.environ.get("FACE_OUT", "public/ritual-face.png")

INLIER = 22.0     # residual within which a pixel is treated as backdrop when refitting
GROW = 30.0       # residual the region growth is allowed to travel through
SAT_MAX = 80      # second signal: backdrop measures ~50-66, skin ~90-125
SOFT_LO = 18.0    # residual at or below which a boundary pixel is transparent
SOFT_HI = 54.0    # residual at or above which it is fully opaque
EDGE_BAND = 10    # how far the soft ramp reaches in from the silhouette
MAX_WIDTH = 1200
# The subject is cropped by the bottom of the frame, and the backdrop shadow in
# the bottom corners is colourimetrically identical to shadowed skin — no
# threshold separates them. Trimming and fading the foot of the frame removes
# those patches and softens the hard torso crop at the same time.
BOTTOM_CROP = 0.07
BOTTOM_FADE = 0.13

img = Image.open(SRC).convert("RGB")
if img.width > MAX_WIDTH:
    img = img.resize((MAX_WIDTH, round(MAX_WIDTH * img.height / img.width)), Image.LANCZOS)

rgb = np.asarray(img).astype(np.float64)
sat = np.asarray(img.convert("HSV")).astype(np.int16)[:, :, 1]
h, w = rgb.shape[:2]

ys, xs = np.mgrid[0:h, 0:w]
xn, yn = xs / w, ys / h
basis = np.stack([np.ones_like(xn), xn, yn, xn * xn, xn * yn, yn * yn], axis=-1)
flat_basis = basis.reshape(-1, 6)

# Seed the fit from the top and sides only. In a portrait the subject exits
# through the BOTTOM of the frame, so including that edge would fit the model to
# skin and the chest would then be cut away as if it were backdrop.
band_h, band_w = max(2, h // 12), max(2, w // 12)
seed_fit = np.zeros((h, w), dtype=bool)
seed_fit[:band_h] = True
seed_fit[: int(h * 0.72), :band_w] = True
seed_fit[: int(h * 0.72), -band_w:] = True

inliers = seed_fit.reshape(-1)
for _ in range(4):
    coeffs = [
        np.linalg.lstsq(flat_basis[inliers], rgb[..., c].reshape(-1)[inliers], rcond=None)[0]
        for c in range(3)
    ]
    model = np.stack([flat_basis @ coeffs[c] for c in range(3)], axis=-1).reshape(h, w, 3)
    residual = np.abs(rgb - model).max(axis=2)
    inliers = (residual < INLIER).reshape(-1)

# Grow the backdrop inward from the frame edge.
#
# Residual alone is not enough: skin in shadow at the bottom of the frame sits
# only 15-22 from the extrapolated surface, overlapping the backdrop's 3-12.
# Saturation is the clean second signal there, so a pixel must satisfy both.
allowed = (residual <= GROW) & (sat <= SAT_MAX)
seed = np.zeros_like(allowed)
seed[0, :] = allowed[0, :]
seed[-1, :] = allowed[-1, :]
seed[:, 0] = allowed[:, 0]
seed[:, -1] = allowed[:, -1]
backdrop = ndimage.binary_propagation(seed, mask=allowed)

# Close pinholes in the backdrop, then drop any small islands the growth punched
# into the subject (specular highlights on skin read as backdrop-coloured).
backdrop = ndimage.binary_closing(backdrop, structure=np.ones((5, 5)))
subject = ~backdrop
lbl, n = ndimage.label(subject)
if n:
    sizes = ndimage.sum(subject, lbl, range(1, n + 1))
    keep = np.isin(lbl, 1 + np.flatnonzero(sizes > 0.002 * subject.size))
    subject = keep
holes = ndimage.binary_fill_holes(subject) & ~subject
lbl, n = ndimage.label(holes)
if n:
    sizes = ndimage.sum(holes, lbl, range(1, n + 1))
    small = np.isin(lbl, 1 + np.flatnonzero(sizes < 0.004 * holes.size))
    subject = subject | small
backdrop = ~subject

# Soft edge follows the photograph's own antialiasing — but only in a narrow
# band against the subject. Applied across the whole backdrop it leaves a haze
# wherever the backdrop drifts furthest from the model, i.e. the frame corners.
# The subject casts a shadow on the wall that measures identically to skin —
# same colour, same chromaticity, same channel ratios — so no pixel rule can
# delete it. What it must not do is end on a hard line and read as a border, so
# the ramp is widened: whatever survives beside the silhouette fades out.
soft = np.clip((residual - SOFT_LO) / (SOFT_HI - SOFT_LO), 0.0, 1.0)
band = ndimage.binary_dilation(
    subject, structure=np.ones((3, 3)), iterations=EDGE_BAND
) & backdrop
alpha = np.where(backdrop, np.where(band, soft, 0.0), 1.0)

keep = int(h * (1 - BOTTOM_CROP))
alpha = alpha[:keep]
fade_from = int(keep * (1 - BOTTOM_FADE))
ramp = np.ones(keep)
ramp[fade_from:] = np.linspace(1, 0, keep - fade_from)
alpha = alpha * ramp[:, None]

# A short fade at the top: the subject's hair is cropped by the frame there, so
# without it the alpha ends abruptly and renders as a hairline across the image.
top_fade = max(2, int(keep * 0.04))
top_ramp = np.ones(keep)
top_ramp[:top_fade] = np.linspace(0, 1, top_fade)
alpha = alpha * top_ramp[:, None]

side = max(2, int(w * 0.05))
side_ramp = np.ones(w)
side_ramp[:side] = np.linspace(0, 1, side)
side_ramp[-side:] = np.linspace(1, 0, side)
alpha = alpha * side_ramp[None, :]

img = img.crop((0, 0, w, keep))

# Hard-clear the outermost pixels. Blur and ramps can leave a sliver of alpha
# against the frame, which reads as a border line once composited.
alpha[:2, :] = 0
alpha[-2:, :] = 0
alpha[:, :2] = 0
alpha[:, -2:] = 0

mask = Image.fromarray((alpha * 255).astype(np.uint8), "L")
mask = mask.filter(ImageFilter.GaussianBlur(radius=2.5))

out = img.copy()
out.putalpha(mask)
bbox = mask.point(lambda v: 255 if v > 8 else 0).getbbox()
out = out.crop(bbox)
out.save(OUT, optimize=True)

print("%s %s  %d KB" % (OUT, out.size, os.path.getsize(OUT) / 1024))
print("removed %.1f%% as backdrop" % (100 * backdrop.mean()))
