"""Build cover art for the journal posts from the site's own photography.

Earlier versions drew abstract compositions, which read as empty placeholders.
These are photographic instead — but each post gets a different source, a
different crop and a different grade, so the row of cards does not look like the
same picture four times.

Replace any of them with a supplied photograph by dropping the file in public/
and pointing that post's `image` at it in src/data/posts.ts.

    python make-post-covers.py  ->  public/post-*.jpg
"""
import os

from PIL import Image, ImageEnhance, ImageDraw, ImageFilter
import numpy as np

W, H = 1600, 1000  # 16:10, matching the card aspect


def cover(img: Image.Image, focus=(0.5, 0.5)) -> Image.Image:
    """Crop to 16:10 around a focal point given in 0-1 coordinates."""
    src_ratio = img.width / img.height
    want = W / H
    if src_ratio > want:
        new_w = int(img.height * want)
        left = int((img.width - new_w) * focus[0])
        box = (left, 0, left + new_w, img.height)
    else:
        new_h = int(img.width / want)
        top = int((img.height - new_h) * focus[1])
        box = (0, top, img.width, top + new_h)
    return img.crop(box).resize((W, H), Image.LANCZOS)


def grade(img, tint, strength, brightness=1.0, contrast=1.0, saturation=1.0):
    """Push the image toward a tint and adjust tone, so each cover reads apart."""
    img = ImageEnhance.Color(img).enhance(saturation)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    a = np.asarray(img).astype(float)
    t = np.array(tint, dtype=float)[None, None, :]
    a = a * (1 - strength) + (a * t / 255.0) * strength
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), "RGB")


def scrim(img, corner="top"):
    """A soft dark wash so the category chip and any overlay stay legible."""
    layer = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(layer)
    for i in range(H // 2):
        v = int(90 * (1 - i / (H / 2)) ** 1.6)
        y = i if corner == "top" else H - 1 - i
        d.line((0, y, W, y), fill=v)
    dark = Image.new("RGB", (W, H), (1, 18, 45))
    return Image.composite(dark, img, layer.filter(ImageFilter.GaussianBlur(4))).convert("RGB")


def save(img, name):
    path = "public/%s.jpg" % name
    img.save(path, quality=86, optimize=True, progressive=True)
    print("%-30s %4d KB" % (path, os.path.getsize(path) / 1024))


def on_ground(src_path, ground, focus=(0.5, 0.5), scale=1.0, offset=(0.0, 0.0)):
    """Composite a transparent cut-out onto a flat ground, then crop to 16:10."""
    canvas = Image.new("RGB", (W, H), ground)
    cut = Image.open(src_path).convert("RGBA")
    target_h = int(H * scale)
    cut = cut.resize((round(cut.width * target_h / cut.height), target_h), Image.LANCZOS)
    x = int(W * focus[0] - cut.width / 2 + W * offset[0])
    y = int(H * focus[1] - cut.height / 2 + H * offset[1])
    canvas.paste(cut, (x, y), cut)
    return canvas


# 1. Pigmentation — the treatment photograph, warm and close.
save(
    scrim(
        grade(
            cover(Image.open("public/why-choose.jpg").convert("RGB"), focus=(0.72, 0.4)),
            tint=(255, 236, 210),
            strength=0.35,
            brightness=1.06,
            contrast=1.04,
            saturation=0.95,
        )
    ),
    "post-pigmentation",
)

# 2. Trichology — the cut-out portrait on navy, cropped to the head.
save(
    scrim(
        grade(
            cover(
                on_ground(
                    "public/ritual-face.png",
                    (6, 26, 58),
                    focus=(0.52, 0.62),
                    scale=1.55,
                    offset=(0.0, 0.16),
                ),
                focus=(0.5, 0.35),
            ),
            tint=(196, 214, 255),
            strength=0.28,
            brightness=0.97,
            contrast=1.08,
            saturation=0.9,
        )
    ),
    "post-trichology",
)

# 3. Clinic — the wider treatment-room frame, neutral and calm.
save(
    scrim(
        grade(
            cover(Image.open("public/hero-1.jpg").convert("RGB"), focus=(0.18, 0.5)),
            tint=(240, 240, 244),
            strength=0.3,
            brightness=1.05,
            contrast=1.02,
            saturation=0.82,
        )
    ),
    "post-clinic",
)

# 4. Skin care — foliage on cream, sunlit.
# Two overlapping sprays so the frame is filled rather than mostly empty cream.
foliage = on_ground(
    "public/leaf-left.png", (247, 241, 228), focus=(0.2, 0.62), scale=1.9, offset=(-0.06, 0.1)
)
spray = Image.open("public/leaf-right.png").convert("RGBA")
sh = int(H * 1.75)
spray = spray.resize((round(spray.width * sh / spray.height), sh), Image.LANCZOS)
foliage.paste(spray, (int(W * 0.42), int(H * 0.02)), spray)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow, "RGBA")
for k in range(8):
    r = int(H * (0.5 - k * 0.05))
    gd.ellipse(
        (int(W * 0.2) - r, int(H * 0.3) - r, int(W * 0.2) + r, int(H * 0.3) + r),
        fill=(255, 246, 224, 18 + k * 10),
    )
glow = glow.filter(ImageFilter.GaussianBlur(70))
save(
    scrim(
        grade(
            Image.alpha_composite(foliage.convert("RGBA"), glow).convert("RGB"),
            tint=(255, 244, 220),
            strength=0.3,
            brightness=1.04,
            contrast=1.03,
            saturation=0.95,
        )
    ),
    "post-skincare",
)
