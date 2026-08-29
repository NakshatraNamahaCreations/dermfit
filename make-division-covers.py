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
    return img.crop(box).resize((W, H), Image.LANCZOS)


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
    foot_scrim(img).save(path, quality=84, optimize=True, progressive=True)
    print("%-32s %4d KB" % (path, os.path.getsize(path) / 1024))


photo = lambda p: Image.open(p).convert("RGB")

# 01 Clinical — the examination frame, neutral and clinical.
save(
    grade(crop(photo("public/hero-1.jpg"), focus=(0.62, 0.4)), (236, 240, 246), 0.34,
          brightness=1.03, contrast=1.05, saturation=0.8),
    "division-clinical",
)

# 02 Aesthetic — the golden treatment frame, warm and rich.
save(
    grade(crop(photo("public/hero-2.jpg"), focus=(0.66, 0.35)), (255, 232, 198), 0.4,
          brightness=1.04, contrast=1.05, saturation=1.05),
    "division-aesthetic",
)

# 03 Trichology — cropped to the head, cool and close.
save(
    grade(crop(on_ground("public/ritual-face.png", (8, 30, 64), scale=1.7, offset=(0.02, 0.22)),
               focus=(0.5, 0.3)), (198, 216, 255), 0.3, brightness=0.98, contrast=1.08,
          saturation=0.9),
    "division-hair",
)

# 04 Regenerative — the serum portrait on deep navy.
save(
    grade(crop(on_ground("public/about-portrait.png", (4, 22, 52), scale=1.75, offset=(0.02, 0.14)),
               focus=(0.5, 0.3)), (214, 226, 255), 0.26, brightness=1.0, contrast=1.06,
          saturation=0.95),
    "division-regenerative",
)

# 05 Lasers — the aloe treatment frame, cooled and contrasty.
save(
    grade(crop(photo("public/why-choose.jpg"), focus=(0.5, 0.28)), (216, 226, 246), 0.32,
          brightness=0.99, contrast=1.12, saturation=0.88),
    "division-laser",
)

# 06 Body — foliage on cream, light and open.
foliage = on_ground("public/leaf-left.png", (246, 240, 227), scale=2.1, offset=(-0.16, 0.06))
_spray = Image.open("public/leaf-right.png").convert("RGBA")
_sh = int(H * 1.5)
_spray = _spray.resize((round(_spray.width * _sh / _spray.height), _sh), Image.LANCZOS)
foliage.paste(_spray, (int(W * 0.1), int(H * 0.3)), _spray)
save(
    grade(foliage, (255, 244, 222), 0.3, brightness=1.05, contrast=1.02, saturation=0.95),
    "division-body",
)
