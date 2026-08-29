"""Generate distinct cover artwork for the journal posts.

The site only has clinical photography, and reusing it across the blog made
every card look the same. These are drawn from the brand palette instead — one
composition per subject, so each post reads as its own thing, with no stock
licensing to worry about.

    python make-post-covers.py  ->  public/post-*.jpg
"""
import math
import os

from PIL import Image, ImageDraw, ImageFilter
import numpy as np

W, H = 1600, 1000
SS = 2  # supersample, then downsample for clean edges

NAVY = (1, 18, 45)
NAVY_MID = (22, 55, 109)
GOLD_LIGHT = (244, 208, 151)
GOLD = (195, 144, 58)
GOLD_DEEP = (138, 99, 32)
CREAM = (243, 241, 234)
SAND = (239, 215, 164)
FOREST = (30, 47, 33)


def gradient(size, top, bottom, diagonal=False):
    w, h = size
    ys = np.linspace(0, 1, h)[:, None]
    xs = np.linspace(0, 1, w)[None, :]
    t = (ys * 0.75 + xs * 0.25) if diagonal else np.repeat(ys, w, axis=1)
    top_a = np.array(top, dtype=float)
    bot_a = np.array(bottom, dtype=float)
    img = top_a[None, None, :] + (bot_a - top_a)[None, None, :] * t[..., None]
    return Image.fromarray(img.astype(np.uint8), "RGB")


def blob(layer, cx, cy, r, colour, alpha):
    d = ImageDraw.Draw(layer, "RGBA")
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=colour + (alpha,))


def grain(img, amount=5):
    a = np.asarray(img).astype(float)
    noise = np.random.default_rng(7).normal(0, amount, a.shape[:2])[..., None]
    return Image.fromarray(np.clip(a + noise, 0, 255).astype(np.uint8), "RGB")


def finish(img, name):
    img = img.resize((W, H), Image.LANCZOS)
    img = grain(img)
    path = "public/%s.jpg" % name
    img.save(path, quality=88, optimize=True, progressive=True)
    print("%-28s %4d KB" % (path, os.path.getsize(path) / 1024))


# 1. Pigmentation — discrete clusters thinning out across a sunlit ground.
def pigmentation():
    base = gradient((W * SS, H * SS), (252, 246, 234), (238, 214, 168), diagonal=True)
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    rng = np.random.default_rng(19)
    for _ in range(120):
        # Density falls away to the right, so the field reads as clearing.
        t = rng.random() ** 0.55
        cx = int((0.04 + 0.92 * t) * W * SS + rng.normal(0, 40 * SS))
        cy = int(rng.uniform(0.08, 0.92) * H * SS)
        r = int(rng.uniform(14, 62) * SS * (1.15 - 0.5 * t))
        tone = GOLD if rng.random() < 0.65 else GOLD_DEEP
        blob(layer, cx, cy, r, tone, int(rng.uniform(28, 96) * (1.05 - 0.75 * t)))
    layer = layer.filter(ImageFilter.GaussianBlur(9 * SS))
    out = Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")
    finish(out, "post-pigmentation")


# 2. Trichology — strands sweeping across a deep ground toward a warm light.
def trichology():
    base = gradient((W * SS, H * SS), NAVY, (18, 44, 88), diagonal=True)

    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    for k in range(7):
        blob(
            glow,
            int(0.8 * W * SS),
            int(0.24 * H * SS),
            int((0.5 - k * 0.055) * H * SS),
            GOLD,
            18 + k * 9,
        )
    glow = glow.filter(ImageFilter.GaussianBlur(70 * SS))

    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    rng = np.random.default_rng(23)
    for _ in range(90):
        x0 = rng.uniform(-0.35, 0.95) * W * SS
        amp = rng.uniform(50, 190) * SS
        phase = rng.uniform(0, math.tau)
        drift = rng.uniform(0.25, 0.7) * W * SS
        pts = []
        for step in range(0, 81):
            t = step / 80
            x = x0 + drift * t + amp * math.sin(phase + t * 2.2)
            pts.append((x, t * H * SS))
        d.line(
            pts,
            fill=GOLD_LIGHT + (int(rng.uniform(30, 110)),),
            width=int(rng.uniform(1.0, 2.6) * SS),
        )
    layer = layer.filter(ImageFilter.GaussianBlur(0.8 * SS))

    out = Image.alpha_composite(base.convert("RGBA"), glow)
    out = Image.alpha_composite(out, layer).convert("RGB")
    finish(out, "post-trichology")


# 3. Clinic — a written plan: ruled lines on a paper-toned ground.
def clinic():
    base = gradient((W * SS, H * SS), CREAM, (228, 230, 236))
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    x0, y0 = int(0.17 * W * SS), int(0.13 * H * SS)
    x1, y1 = int(0.83 * W * SS), int(0.95 * H * SS)
    d.rounded_rectangle((x0, y0, x1, y1), radius=int(0.03 * W * SS), fill=(255, 255, 255, 235))
    d.rounded_rectangle(
        (x0, y0, x1, y1), radius=int(0.03 * W * SS), outline=NAVY + (28,), width=int(2 * SS)
    )
    pad = int(0.055 * W * SS)
    d.line((x0 + pad, y0 + pad * 1.15, x0 + pad + int(0.16 * W * SS), y0 + pad * 1.15),
           fill=GOLD + (220,), width=int(6 * SS))
    widths = [0.52, 0.44, 0.48, 0.30, 0.46, 0.38, 0.42, 0.24]
    for i, frac in enumerate(widths):
        y = y0 + pad * 2.1 + i * int(0.082 * H * SS)
        d.rounded_rectangle(
            (x0 + pad, y, x0 + pad + int(frac * W * SS), y + int(11 * SS)),
            radius=int(6 * SS),
            fill=NAVY + (34 if i % 3 else 58,),
        )
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow, "RGBA").rounded_rectangle(
        (x0 + 10 * SS, y0 + 18 * SS, x1 + 10 * SS, y1 + 18 * SS),
        radius=int(0.03 * W * SS),
        fill=NAVY + (40,),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(26 * SS))
    out = Image.alpha_composite(base.convert("RGBA"), shadow)
    out = Image.alpha_composite(out, layer).convert("RGB")
    finish(out, "post-clinic")


# 4. Skin care — low sun on a wall with frond shadow falling across it.
def skincare():
    base = gradient((W * SS, H * SS), (253, 248, 238), (238, 213, 168), diagonal=True)

    # Built from stacked discs rather than one blurred circle, which produced a
    # visible ring where the blur met the edge.
    sun = Image.new("RGBA", base.size, (0, 0, 0, 0))
    for k in range(9):
        blob(
            sun,
            int(0.74 * W * SS),
            int(0.3 * H * SS),
            int((0.46 - k * 0.045) * H * SS),
            (255, 246, 220),
            22 + k * 12,
        )
    sun = sun.filter(ImageFilter.GaussianBlur(48 * SS))

    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(shadow, "RGBA")
    rng = np.random.default_rng(31)
    # Fronds enter from the left and stop short of the light, so the sun stays open.
    for i in range(6):
        ang = math.radians(6 + i * 11)
        cx, cy = -0.05 * W * SS, (0.04 + i * 0.14) * H * SS
        length = rng.uniform(0.36, 0.52) * W * SS
        ex, ey = cx + length * math.cos(ang), cy + length * math.sin(ang)
        d.line((cx, cy, ex, ey), fill=FOREST + (34,), width=int(7 * SS))
        for k in range(1, 15):
            t = k / 15
            px, py = cx + (ex - cx) * t, cy + (ey - cy) * t
            leaf = (52 - 34 * t) * SS
            for side in (-1, 1):
                d.ellipse(
                    (
                        px - leaf * 0.5,
                        py + side * leaf * 0.25 - leaf * 0.34,
                        px + leaf * 1.5,
                        py + side * leaf * 0.25 + leaf * 0.34,
                    ),
                    fill=FOREST + (30,),
                )
    shadow = shadow.filter(ImageFilter.GaussianBlur(13 * SS))

    out = Image.alpha_composite(base.convert("RGBA"), sun)
    out = Image.alpha_composite(out, shadow).convert("RGB")
    finish(out, "post-skincare")


pigmentation()
trichology()
clinic()
skincare()
