# Background photos

Three photos are used as section backgrounds on the home page. To replace one,
**save your photo over the existing file with the same filename** — nothing in
the code needs to change, because each is imported by name.

Save as JPEG, quality ~80, and keep each file under ~250 KB so the page stays fast.

| File | Where it appears | Size to supply | How visible |
|---|---|---|---|
| `hero-bg.jpg` | Behind the headline at the very top of the home page | 1920 × 1080 (16:9) | 20% opacity — **the most visible of the three** |
| `devices-showcase.jpg` | Behind the "devices we repair" grid | 1920 × 1080 (16:9) | 8% opacity — barely a texture |
| `repair-detail.jpg` | Behind the closing "book a repair" panel | 1920 × 1080 (16:9) | 10% opacity — barely a texture |

> `repair-detail.jpg` is currently a square (1024 × 1024) image stretched across a
> wide section, so most of it is cropped away. Supplying 16:9 will fix that.

## What to shoot

Every photo sits behind text under a dark gradient, so what matters most is that it
is **dark, uncluttered, and horizontal**. Bright or busy photos fight the text.

- **`hero-bg.jpg`** — your workbench, shot from a low angle across the surface:
  tools laid out, a device mid-repair, soldering station. Shoot it dim with one
  warm light source from the side. This is the one customers actually notice, so
  it is worth spending the most time on.
- **`devices-showcase.jpg`** — a flat-lay from directly above of the devices you
  service (phone, tablet, laptop) on a dark surface, evenly spaced.
- **`repair-detail.jpg`** — a close-up of hands working on an opened device:
  tweezers on a logic board, a screen being lifted. Fill the frame with the work.

**Practical tips:** shoot on a phone in landscape, turn the flash off, put a single
lamp to one side rather than overhead, and leave empty dark space in the middle
where the headline sits. Slightly underexposed is better than bright — the site
darkens each image heavily anyway.

## Checking your replacements

Run `npm run dev`, open the home page, and scroll through. If a photo makes the
text harder to read, either pick a darker frame or tell Claude to lower that
section's opacity.
