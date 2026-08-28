"""Produce a transparent-background copy of the supplied logo.

The artwork is not redrawn or recoloured. This only turns the flat navy
backdrop (#01122D) into alpha so the logo can sit on photography, and trims
the empty margin around the artwork. Every element of the lockup is kept.

    python make-logo-transparent.py   ->  public/logo-transparent.png
"""
from PIL import Image
import numpy as np

NAVY = np.array([1, 18, 45], dtype=float)
FRAME = 12        # decorative border baked into the supplied file
T_LOW = 28.0      # <= this distance from navy is treated as pure background
T_HIGH = 88.0     # >= this is fully opaque artwork; between the two ramps

src = Image.open("public/logo.png").convert("RGB")
src = src.crop((FRAME, FRAME, src.width - FRAME, src.height - FRAME))

rgb = np.asarray(src).astype(float)
dist = np.sqrt(((rgb - NAVY) ** 2).sum(axis=2))
alpha = np.clip((dist - T_LOW) / (T_HIGH - T_LOW), 0.0, 1.0)

# Un-premultiply the partially transparent edge pixels against the navy they
# were composited over, so edges keep true gold instead of a dark fringe.
a = alpha[..., None]
safe = np.where(a > 0.004, a, 1.0)
out = (rgb - NAVY * (1.0 - a)) / safe
out = np.clip(out, 0, 255)

rgba = np.dstack([out, alpha * 255]).astype(np.uint8)
img = Image.fromarray(rgba, "RGBA")

# Trim the now-transparent margin so the artwork fills its box.
bbox = img.getbbox()
img = img.crop(bbox)
pad = round(img.width * 0.02)
canvas = Image.new("RGBA", (img.width + 2 * pad, img.height + 2 * pad), (0, 0, 0, 0))
canvas.paste(img, (pad, pad))

canvas.save("public/logo-transparent.png", optimize=True)
print("public/logo-transparent.png", canvas.size)
