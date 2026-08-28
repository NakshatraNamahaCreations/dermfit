"""Split the aloe photograph into a back plate and a front cut-out.

The statement section needs the plant to sit BOTH behind and in front of the
word. The back plate is the untouched photograph; the front layer is the plant
alone on transparency, drawn over the type. Because the two are positioned
identically, the doubled plant lines up exactly and reads as one.

Separation is by greenness (g - (r+b)/2): the wall is neutral (~0.5) and the
leaves are ~50, so a soft ramp between the two gives clean antialiased edges.

    python make-aloe-layers.py  ->  public/aloe-back.jpg, public/aloe-front.png
"""
from PIL import Image, ImageFilter
import numpy as np

SRC = "public/ChatGPT Image Aug 28, 2026, 05_14_08 PM.png"
WIDTH = 1600           # output width; the source is 1536 so this is a mild upscale cap
LO, HI = 3.0, 14.0     # greenness ramp: below LO fully transparent, above HI opaque

img = Image.open(SRC).convert("RGB")
if img.width > WIDTH:
    img = img.resize((WIDTH, round(WIDTH * img.height / img.width)), Image.LANCZOS)

a = np.asarray(img).astype(np.float32)
green = a[:, :, 1] - (a[:, :, 0] + a[:, :, 2]) / 2.0
alpha = np.clip((green - LO) / (HI - LO), 0.0, 1.0)

mask = Image.fromarray((alpha * 255).astype(np.uint8), "L")
# Median kills isolated speckles (water droplets catching the light, dust on the
# wall); the slight blur then feathers the cut so edges do not look stamped.
mask = mask.filter(ImageFilter.MedianFilter(size=5))
mask = mask.filter(ImageFilter.GaussianBlur(radius=0.7))

front = img.copy()
front.putalpha(mask)
front.save("public/aloe-front.png", optimize=True)

img.save("public/aloe-back.jpg", quality=86, optimize=True, progressive=True)

import os

print("aloe-front.png %s  %d KB" % (front.size, os.path.getsize("public/aloe-front.png") / 1024))
print("aloe-back.jpg  %s  %d KB" % (img.size, os.path.getsize("public/aloe-back.jpg") / 1024))
print("plant covers %.1f%% of the frame" % (100 * (np.asarray(mask) > 127).mean()))
