"""Build 3:4 card artwork for the six divisions.

Same approach as the journal covers: the site's own photography, but each card
gets a different source, crop and grade so the carousel does not read as one
picture six times. Replace any of them by dropping a photograph in public/ and
pointing that division's `image` at it in src/data/catalogue.ts.

    python make-division-covers.py  ->  public/division-*.jpg
"""
import os

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import numpy as np

W, H = 900, 1200  # 3:4


def crop(img, focus=(0.5, 0.5)):
    want = W / H
    if img.width / img.height > want:
        new_w = int(img.height * want)
        left = int((img.width - new_w) * focus[0])
        box = (left, 0, left + new_w, img.height)
    else:
        new_h = int(img.width / want)
        top = int((img.height - new_h) * focus[1])
        box = (0, top, img.width, top + new_h)
    cut = img.crop(box)
    # Never upscale: a small or very wide source leaves little to crop from, and
    # blowing it up to the nominal size only adds softness. The discs render at
    # ~112px, so anything above that is already plenty.
    out_w = min(W, cut.width)
    return cut.resize((out_w, round(out_w / (W / H))), Image.LANCZOS)


def grade(img, tint, strength, brightness=1.0, contrast=1.0, saturation=1.0):
    img = ImageEnhance.Color(img).enhance(saturation)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    a = np.asarray(img).astype(float)
    t = np.array(tint, dtype=float)[None, None, :]
    return Image.fromarray(
        np.clip(a * (1 - strength) + (a * t / 255.0) * strength, 0, 255).astype(np.uint8), "RGB"
    )


def foot_scrim(img):
    """Darken the lower third — the card sets its title over the image."""
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    for i in range(int(H * 0.62)):
        y = H - 1 - i
        d.line((0, y, W, y), fill=int(215 * (1 - i / (H * 0.62)) ** 1.35))
    dark = Image.new("RGB", (W, H), (1, 18, 45))
    return Image.composite(dark, img, mask.filter(ImageFilter.GaussianBlur(6))).convert("RGB")


def on_ground(src, ground, scale=1.0, offset=(0.0, 0.0)):
    canvas = Image.new("RGB", (W, H), ground)
    cut = Image.open(src).convert("RGBA")
    th = int(H * scale)
    cut = cut.resize((round(cut.width * th / cut.height), th), Image.LANCZOS)
    canvas.paste(
        cut,
        (int(W / 2 - cut.width / 2 + W * offset[0]), int(H / 2 - cut.height / 2 + H * offset[1])),
        cut,
    )
    return canvas


def save(img, name):
    path = "public/%s.jpg" % name
    img.save(path, quality=84, optimize=True, progressive=True)
    print("%-32s %4d KB" % (path, os.path.getsize(path) / 1024))


photo = lambda p: Image.open(p).convert("RGB")


def from_photo(src, name, **kw):
    """Build a disc from a supplied photograph.

    The multi-megabyte originals are not kept in the repo, so a missing source
    is not an error — the disc already generated from it is left in place and
    the rest of the script still runs. Point SRC_* at the file to rebuild one.
    """
    if not os.path.exists(src):
        print("%-32s skipped (source not present: %s)" % ("public/%s.jpg" % name, src))
        return
    save(grade(crop(photo(src), focus=kw.pop("focus")), **kw), name)

# Supplied clinical photography. Set these to wherever the originals live; the
# generated discs are what ships, the originals are not kept in the repo.
SRC_CLINICAL = os.environ.get(
    "SRC_CLINICAL", "public/female-cosmetologist-making-facial-treatment-beautiful-woma.jpg"
)
SRC_AESTHETIC = os.environ.get(
    "SRC_AESTHETIC", "public/high-angle-woman-getting-injection.jpg"
)
SRC_HAIR = os.environ.get(
    "SRC_HAIR", "public/beautician-protective-mask-doing-procedure-hair.jpg"
)
SRC_BODY = os.environ.get(
    "SRC_BODY",
    "public/body-contouring-treatments-your-complete-guide-178379-1024x512.webp",
)
SRC_LASER = os.environ.get(
    "SRC_LASER", "public/female-patient-receiving-cosmetic-treatment.jpg"
)
SRC_REGEN = os.environ.get(
    "SRC_REGEN",
    "public/client-beautician-s-appointment-consultation-face-shaping-preparation-"
    "upcoming-procedures-visual-examination-problem-areas.jpg",
)

# 01 Clinical — supplied consultation photograph. Barely graded: these are real
# clinical frames and should look like it.
from_photo(SRC_CLINICAL, "division-clinical", focus=(0.56, 0.46),
           tint=(246, 248, 252), strength=0.16, brightness=1.03, contrast=1.03,
           saturation=0.94)

# 02 Aesthetic — supplied injectables photograph.
from_photo(SRC_AESTHETIC, "division-aesthetic", focus=(0.5, 0.5),
           tint=(250, 246, 244), strength=0.16, brightness=1.02, contrast=1.04,
           saturation=0.96)

# 03 Trichology — supplied scalp treatment photograph, cropped to the hands and
# hairline rather than the centre of the frame.
from_photo(SRC_HAIR, "division-hair", focus=(0.8, 0.5),
           tint=(248, 249, 252), strength=0.16, brightness=1.02, contrast=1.05,
           saturation=0.94)

# 04 Regenerative — supplied consultation photograph, cropped right so the
# patient and the examining hands fill the disc.
from_photo(SRC_REGEN, "division-regenerative", focus=(0.8, 0.5),
           tint=(250, 248, 250), strength=0.16, brightness=1.02, contrast=1.04,
           saturation=0.95)

# 05 Lasers — supplied laser treatment photograph, framing the handpiece and
# the face together.
from_photo(SRC_LASER, "division-laser", focus=(0.55, 0.5),
           tint=(246, 248, 253), strength=0.16, brightness=1.01, contrast=1.05,
           saturation=0.93)

# 06 Body — supplied contouring photograph. It is 2:1, so a 3:4 crop is a
# narrow slice; framed on the handpiece against the décolletage.
from_photo(SRC_BODY, "division-body", focus=(0.45, 0.5),
           tint=(255, 250, 244), strength=0.14, brightness=1.02, contrast=1.04,
           saturation=0.96)
