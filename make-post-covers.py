"""Build cover art for the journal posts.

Sources are the real clinical photographs the clinic supplied — the same frames
the division discs are cut from — each with a different crop and a light grade
so the row of cards does not read as one picture four times.

Earlier versions used AI-generated imagery, which looked like a beauty brand
rather than a dermatology practice. Nothing here is generated.

    python make-post-covers.py  ->  public/post-*.jpg
"""
import os

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import numpy as np

W, H = 1600, 1000  # 16:10, matching the card aspect


def cover(img, focus=(0.5, 0.5)):
    """Crop to 16:10 around a focal point given in 0-1 coordinates."""
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
    out_w = min(W, cut.width)  # never upscale
    return cut.resize((out_w, round(out_w / want)), Image.LANCZOS)


def grade(img, tint, strength, brightness=1.0, contrast=1.0, saturation=1.0):
    img = ImageEnhance.Color(img).enhance(saturation)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    a = np.asarray(img).astype(float)
    t = np.array(tint, dtype=float)[None, None, :]
    return Image.fromarray(
        np.clip(a * (1 - strength) + (a * t / 255.0) * strength, 0, 255).astype(np.uint8), "RGB"
    )


def scrim(img):
    """Soft dark wash at the top, so the category chip stays legible."""
    w, h = img.size
    layer = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(layer)
    for i in range(h // 2):
        d.line((0, i, w, i), fill=int(95 * (1 - i / (h / 2)) ** 1.6))
    dark = Image.new("RGB", (w, h), (1, 18, 45))
    return Image.composite(dark, img, layer.filter(ImageFilter.GaussianBlur(4))).convert("RGB")


def build(src, name, focus, **kw):
    if not os.path.exists(src):
        print("%-30s skipped (no source: %s)" % ("public/%s.jpg" % name, src))
        return
    img = scrim(grade(cover(Image.open(src).convert("RGB"), focus), **kw))
    path = "public/%s.jpg" % name
    img.save(path, quality=86, optimize=True, progressive=True)
    print("%-30s %4d KB  %s" % (path, os.path.getsize(path) / 1024, img.size))


# The division discs are already cropped from the supplied clinical frames, so
# they are the cleanest source available in the repo.
build("public/division-clinical.jpg", "post-pigmentation", (0.5, 0.35),
      tint=(252, 248, 244), strength=0.12, brightness=1.03, contrast=1.03, saturation=0.95)

build("public/division-hair.jpg", "post-trichology", (0.5, 0.45),
      tint=(246, 249, 253), strength=0.14, brightness=1.02, contrast=1.05, saturation=0.92)

build("public/division-regenerative.jpg", "post-clinic", (0.5, 0.4),
      tint=(248, 249, 252), strength=0.16, brightness=1.03, contrast=1.02, saturation=0.88)

build("public/division-laser.jpg", "post-skincare", (0.5, 0.5),
      tint=(255, 250, 244), strength=0.12, brightness=1.02, contrast=1.04, saturation=0.96)
