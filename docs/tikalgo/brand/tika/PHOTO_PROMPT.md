# Tika — photorealistic avatar: image-generation prompt

The vector avatar (`tika-avatar*.svg`) is the in-app icon. This file is the brief for a
**photorealistic** portrait of Tika, made with an image model (Nano Banana / Gemini Image,
GPT-Image, Midjourney v7, Flux 1.1 Pro Ultra, Imagen 4).

**Reference images to attach** (improves logo and color accuracy):
- `../png/icon-512.png`: the tikalgo monogram, white "ti", green k, orange dot.
- `png/tika-avatar-512.png`: pose, outfit and colors.

## Main prompt (English: works best with every model)
```
Ultra-photorealistic professional corporate portrait photograph of a young European woman,
about 27 years old, working as an AI customer-support specialist for a premium fintech trading
platform called TIKALGO. Real human, photographed with a full-frame camera, 85mm lens, f/2.0,
shallow depth of field, eye-level, front-facing, centered, head and upper torso, looking directly
into the camera.

Face: fair natural skin with visible pores and subtle real skin texture, natural soft makeup,
beautiful natural blue eyes with realistic catchlights, realistic eyebrows and eyelashes,
natural pink lips, a subtle warm confident smile, friendly, intelligent and trustworthy
expression, natural facial proportions, slightly asymmetric like a real person, no heavy
retouching.

Hair: blonde, shoulder-length, soft natural waves, realistic individual strands and flyaways.

Clothing: elegant tailored black business blazer with notched lapels, crisp white dress shirt,
a bright vivid green silk necktie (#3DDC2F), and a small premium polished-gold lapel pin of the
lowercase monogram "tik" (the k shaped like the Greek letter ν) on the left chest over the heart.

Headset: premium modern professional call-center headset with bright green (#3DDC2F) headband and
ear cups, a thin black microphone boom, and a small bright orange (#FF7A1A) foam windscreen near
her mouth. It must look like a real physical product.

Environment: modern premium fintech trading office at dusk, dark elegant background, softly
blurred monitors showing green and red candlestick market charts, a subtle blurred glowing
"tikalgo" sign on the wall, faint green and gold accent lights, bokeh.

Lighting: soft natural key light from a large window or softbox at 45°, gentle fill, subtle rim
light on the hair, realistic skin highlights and soft shadows, cinematic but believable,
physically accurate.

Style: high-end commercial corporate photography, 4K, extremely detailed face and hair,
natural color grading, editorial quality.
```

## Negative prompt (for models that support it: Flux, SDXL, Leonardo)
```
cartoon, illustration, anime, 3d render, CGI, doll, plastic skin, airbrushed, over-retouched,
wax skin, uncanny, oversized eyes, distorted hands, extra fingers, deformed teeth, cross-eyed,
heavy makeup, text artifacts, misspelled logo, watermark, low resolution, blurry face
```

## Model settings
| Model | Settings |
|---|---|
| Midjourney v7 | `--ar 1:1 --style raw --stylize 100 --q 2`; add `--cref <tika png url>` for consistency |
| Flux 1.1 Pro Ultra | raw mode on, aspect 1:1, guidance ≈ 3 |
| Nano Banana / Gemini Image | attach both references; then say "keep the same woman" for edits |
| GPT-Image | quality high, size 1024×1024; attach references |
| Imagen 4 | aspect 1:1, person generation allowed |

Generate 4–8 candidates. Pick the one with the most natural skin and eyes and the cleanest
headset. Gold logos often come out misspelled. If that happens, inpaint only the pin area, or
leave the pin plain and add the vector `tik` lettering in post (see below).

## Variants for the app states (edit the chosen image; keep the same person)
- **Listening:** "same woman, same pose, slightly tilted head, attentive expression".
- **Speaking:** "same woman, mouth slightly open mid-sentence, natural".
- **Thinking:** "same woman, eyes glancing slightly up-right, thoughtful".

## Post-processing into the brand frame
Put the final image(s) in `tika/photo/` as `tika-photo.png` (≥ 1024 px, square). Then:
1. Crop to a centered square with the face at about 38% from the top.
2. Mask it into the brand rounded square (corner radius 20%).
3. Export 512/256/128/64 px.
4. Build the listening (green ring) and speaking (orange ring) frames, matching the SVG states.
5. Optionally overlay the exact vector 3D-gold `tik` lettering on the lapel.

Use the photo version in the chat panel and voice UI at 96 px and larger. Below 64 px, keep the
vector avatar, because a photo turns to mush at that size.
