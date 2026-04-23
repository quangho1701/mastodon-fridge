# Fridge image assets

Drop the files below into this folder, then uncomment the matching
`require()` lines in [`../../data/fridgeSeed.ts`](../../data/fridgeSeed.ts)
(search for `fridgeAssets`).

Until you do, `PhotoCard` and `Polaroid` render a neutral placeholder
block (and avatar badges fall back to colored initials).

| Filename | Purpose | Suggested size @2x |
| --- | --- | --- |
| `girls-polaroid.jpg` | Top-shelf polaroid (no avatar) | 248 × 208 |
| `dog-photo.jpg` | Row A — left | 286 × 224 |
| `landscape-photo.jpg` | Row A — right | 284 × 224 |
| `glasses-selfie.jpg` | Overlapping selfie (portrait) | 180 × 244 |
| `croissants-photo.jpg` | Row C | 344 × 224 |
| `cliff-selfie.jpg` | Row D — right | 440 × 268 |
| `avatar-alex.png` | Dog photo avatar | 56 × 56 (circular, transparent) |
| `avatar-jordan.png` | Landscape avatar | 56 × 56 |
| `avatar-sam.png` | Glasses-selfie avatar | 56 × 56 |
| `avatar-riley.png` | Croissants avatar | 56 × 56 |
| `avatar-taylor.png` | Cliff-selfie avatar | 56 × 56 |

Notes:
- JPEG for photos, PNG for avatars (so they can be round/transparent).
- Expo bundles every file in this directory — avoid leaving half-finished
  .psd / .ai files here unless you want them shipped.
