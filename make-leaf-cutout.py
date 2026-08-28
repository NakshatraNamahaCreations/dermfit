"""Cut foliage out of a photograph shot against a neutral wall.

The statement section slides foliage in over a plain ground, so what is needed
is the leaves on transparency, trimmed to their own bounds.

Separation is by greenness (g - (r+b)/2): the wall is neutral (~0.5) and the
leaves are ~50, so a soft ramp between the two gives clean antialiased edges.

    LEAF_SRC="photo.png" LEAF_OUT="public/leaf-left.png" python make-aloe-layers.py
"""
import os

from PIL import Image, ImageFilter
import numpy as np

# Point this at the source photograph. The generated cut-out is what ships;
# the original is not kept in the repo.
SRC = os.environ.get("LEAF_SRC", "public/leaf-source.png")
OUT = os.environ.get("LEAF_OUT", "public/leaf.png")
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

# Trim the transparent margin so the plant centres on its own bounds rather
# than on the original frame, where it sits off to one side.
bbox = mask.point(lambda v: 255 if v > 8 else 0).getbbox()
front = front.crop(bbox)
front.save(OUT, optimize=True)

print("%s %s  %d KB" % (OUT, front.size, os.path.getsize(OUT) / 1024))
print("trimmed from %s" % (img.size,))
