"""Reframe the supplied logo for on-screen use.

The artwork itself is never redrawn or recoloured - this only chooses which
part of the existing file to show, and trims the dead navy space around it.
public/logo.png stays a byte-identical copy of the original.
"""
from PIL import Image
import numpy as np

NAVY = (1, 18, 45)

src = Image.open("public/logo.png").convert("RGB")
# The file has a ~12px decorative frame (white on two edges, light line on the
# others). Drop it so it never bleeds into a crop.
src = src.crop((12, 12, src.width - 12, src.height - 12))

a = np.asarray(src).astype(int)
art = (np.abs(a - np.array(NAVY)).sum(2) > 60) & ~(a > 240).all(2)


def bbox(y0, y1):
    ys, xs = np.nonzero(art[y0:y1])
    return int(xs.min()), y0 + int(ys.min()), int(xs.max()), y0 + int(ys.max())


emblem = bbox(300, 2290)      # DF monogram, two profiles, caduceus
lockup = bbox(300, 3600)      # the above plus all four text lines
print("emblem", emblem)
print("lockup", lockup)


def square(box, pad_ratio, out, size):
    x0, y0, x1, y1 = box
    side = max(x1 - x0, y1 - y0)
    side += 2 * int(side * pad_ratio)
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    canvas = Image.new("RGB", (side, side), NAVY)
    canvas.paste(src.crop((cx - side // 2, cy - side // 2,
                           cx - side // 2 + side, cy - side // 2 + side)), (0, 0))
    canvas.resize((size, size), Image.LANCZOS).save(out, optimize=True)
    print(out, "%dpx source -> %dpx" % (side, size))


# Header + favicon: the emblem alone, so it stays legible at 44-56px.
square(emblem, 0.06, "public/logo-mark.png", 384)
square(emblem, 0.02, "src/app/icon.png", 96)
square(emblem, 0.02, "src/app/apple-icon.png", 180)

# Footer: the whole lockup, with the empty navy below the text trimmed off.
x0, y0, x1, y1 = lockup
pad = int((x1 - x0) * 0.05)
w, h = x1 - x0 + 2 * pad, y1 - y0 + 2 * pad
canvas = Image.new("RGB", (w, h), NAVY)
canvas.paste(src.crop((x0 - pad, y0 - pad, x1 + pad, y1 + pad)), (0, 0))
canvas.resize((800, round(800 * h / w)), Image.LANCZOS).save(
    "public/logo-full.png", optimize=True)
print("public/logo-full.png", (w, h), "->", (800, round(800 * h / w)))
