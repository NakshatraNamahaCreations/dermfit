"""Lift the subject out of the face-roller photograph.

Skin and the backdrop are both warm, so a plain colour threshold would eat the
face. Two things separate them reliably:

  * saturation — the backdrop sits around 41, skin around 83
  * connectivity — the backdrop is one region touching the frame edge, while
    skin never is except where the subject is cropped

So the mask is grown from backdrop-coloured border pixels and confined to
low-saturation, backdrop-ish pixels. Anything the growth cannot reach stays
opaque, which keeps hair and the roller intact.

    python make-face-cutout.py  ->  public/ritual-face.png
"""
import os

from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

SRC = os.environ.get("FACE_SRC", "public/ritual-face.jpg")
OUT = "public/ritual-face.png"

SAT_MAX = 62      # backdrop ~41, skin ~83
DIST_MAX = 52     # how far a pixel may stray from the sampled backdrop colour
SOFT_LO = 20      # below this distance the pixel is certainly backdrop
SOFT_HI = 46      # above it, certainly subject

img = Image.open(SRC).convert("RGB")
rgb = np.asarray(img).astype(np.int16)
sat = np.asarray(img.convert("HSV")).astype(np.int16)[:, :, 1]

# Sample the backdrop from the top-left, which is clear of the subject.
h, w = rgb.shape[:2]
ref = np.median(rgb[0 : h // 6, 0 : w // 5].reshape(-1, 3), axis=0)
dist = np.abs(rgb - ref).max(axis=2)

allowed = (dist <= DIST_MAX) & (sat <= SAT_MAX)

seed = np.zeros_like(allowed)
seed[0, :] = allowed[0, :]
seed[-1, :] = allowed[-1, :]
seed[:, 0] = allowed[:, 0]
seed[:, -1] = allowed[:, -1]

backdrop = ndimage.binary_propagation(seed, mask=allowed)
# Close pinholes the growth left behind (specks of shadow on the wall).
backdrop = ndimage.binary_closing(backdrop, structure=np.ones((5, 5)))

# Soft edge: inside the grown region fade by how backdrop-like the pixel is,
# so the cut follows the photograph's own antialiasing instead of stair-stepping.
soft = np.clip((dist - SOFT_LO) / float(SOFT_HI - SOFT_LO), 0.0, 1.0)
alpha = np.where(backdrop, soft, 1.0)

mask = Image.fromarray((alpha * 255).astype(np.uint8), "L")
mask = mask.filter(ImageFilter.GaussianBlur(radius=0.8))

out = img.copy()
out.putalpha(mask)
bbox = mask.point(lambda v: 255 if v > 8 else 0).getbbox()
out = out.crop(bbox)
out.save(OUT, optimize=True)

print("%s %s  %d KB" % (OUT, out.size, os.path.getsize(OUT) / 1024))
print("removed %.1f%% of the frame as backdrop" % (100 * backdrop.mean()))
