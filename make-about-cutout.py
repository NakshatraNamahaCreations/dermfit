"""Cut the angled photo card out of its white surround.

The supplied file draws a tilted rounded-rectangle photo on a flat white page.
This flood-fills the white from the borders only — so white *inside* the
photograph (the cream jar, the flowers, the sunlit wall) is left alone — then
trims to the card and writes a transparent PNG.

    python make-about-cutout.py   ->  public/about-portrait.png
"""
from collections import deque

from PIL import Image
import numpy as np

SRC = "public/ChatGPT Image Aug 28, 2026, 03_58_11 PM.png"
OUT = "public/about-portrait.png"
TOL = 18  # how far from pure white still counts as page background

img = Image.open(SRC).convert("RGB")
a = np.asarray(img).astype(int)
h, w = a.shape[:2]

whiteish = (np.abs(a - 255).max(axis=2) <= TOL)

# Flood fill inward from every border pixel that is white-ish.
outside = np.zeros((h, w), dtype=bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if whiteish[y, x] and not outside[y, x]:
            outside[y, x] = True
            q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if whiteish[y, x] and not outside[y, x]:
            outside[y, x] = True
            q.append((y, x))

while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not outside[ny, nx] and whiteish[ny, nx]:
            outside[ny, nx] = True
            q.append((ny, nx))

alpha = np.where(outside, 0, 255).astype(np.uint8)
rgba = np.dstack([a.astype(np.uint8), alpha])
cut = Image.fromarray(rgba, "RGBA").crop(Image.fromarray(alpha, "L").getbbox())

cut.save(OUT, optimize=True)
print(OUT, cut.size, "— removed %.1f%% as page background" % (100 * outside.mean()))
