"""Build the full-bleed hero banner from a supplied photograph.

The division discs are 3:4 and only 900px wide — fine for a 112px circle, far
too small to stretch across a hero. This crops a wide banner straight from the
full-resolution original instead.

    BANNER_SRC="photo.jpg" python make-banner.py  ->  public/banner-clinic.jpg
"""
import os

from PIL import Image, ImageEnhance
import numpy as np

W, H = 2400, 1200  # 2:1, wide enough for a full-bleed hero

# The consultation frame: blurred product shelves fill the left third, which is
# where the hero copy sits, and the white coat carries the clinical read.
SRC = os.environ.get(
    "BANNER_SRC",
    "C:/Users/HP/Downloads/female-cosmetologist-making-facial-treatment-beautiful-woma.jpg",
)
OUT = os.environ.get("BANNER_OUT", "public/banner-clinic.jpg")

FOCUS = (float(os.environ.get("BANNER_FX", "0.62")), float(os.environ.get("BANNER_FY", "0.45")))

img = Image.open(SRC).convert("RGB")
want = W / H
if img.width / img.height > want:
    new_w = int(img.height * want)
    left = int((img.width - new_w) * FOCUS[0])
    box = (left, 0, left + new_w, img.height)
else:
    new_h = int(img.width / want)
    top = int((img.height - new_h) * FOCUS[1])
    box = (0, top, img.width, top + new_h)

cut = img.crop(box)
out_w = min(W, cut.width)
cut = cut.resize((out_w, round(out_w / want)), Image.LANCZOS)

# Light grade only. These are real clinical frames and should look like it.
cut = ImageEnhance.Color(cut).enhance(0.95)
cut = ImageEnhance.Brightness(cut).enhance(1.02)
cut = ImageEnhance.Contrast(cut).enhance(1.04)
a = np.asarray(cut).astype(float)
tint = np.array([248, 249, 252], dtype=float)[None, None, :]
cut = Image.fromarray(
    np.clip(a * 0.86 + (a * tint / 255.0) * 0.14, 0, 255).astype(np.uint8), "RGB"
)

cut.save(OUT, quality=84, optimize=True, progressive=True)
print("%s %s  %d KB" % (OUT, cut.size, os.path.getsize(OUT) / 1024))
