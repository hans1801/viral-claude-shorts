# Cartoon (2.5D): install

**Framework:** the 3D style's engine ([HyperFrames](https://github.com/heygen-com/hyperframes) 0.8.166 + [Three.js](https://threejs.org) 0.169.0 + [GSAP](https://gsap.com) 3.15.0 for the titles) plus [postprocessing](https://github.com/pmndrs/postprocessing) 6.36.4 for the image chain:
- ink
- lens blur
- bloom
- tone map
- grade

Everything is rendered frame by frame in headless Chrome, on the GPU when there is one. The look comes from the MIT [claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) bridge short (`LICENSE-bridge`).

## Requirements
The same as 3D (`styles/3d/INSTALL.md`): Node.js 22.18 or later, ffmpeg, and Python 3.10 to 3.14 for transcription. The `styles/3d` folder must be there (it always is: the engine, library and adapter come from it), but its `node_modules` don't have to be.

## Steps
From the project root (the core), if you haven't done it for another style:
```bash
python3 -m venv .venv && .venv/bin/pip install faster-whisper
```
```bash
npm install
```
And the style:
```bash
cd styles/2.5d_cartoon && npm install
```
```bash
npx hyperframes --version
```
It should answer `0.8.166`.

`bundle.ts` packs `src/` (the look) into `project/cartoon.js` with the global `CT`, and it reads `three` from the page's global `THREE`, the same copy the engine draws with. Nothing is downloaded from the internet while rendering.

## Check that it works
```bash
node core/storyboard.ts videos/cartoon-demo
```
```bash
node core/preview.ts videos/cartoon-demo
```
It opens http://localhost:3004 (or the next free port, and it says so).

## Common problems
- **`could not bundle the cartoon look`:** `styles/2.5d_cartoon/node_modules` is missing. Run `npm install` in `styles/2.5d_cartoon`.
- **Very slow render:** without a usable GPU, Chrome draws the 3D in software, and this style draws every frame twice (colour and ink). The line at the end of the render says `hardware gpu` when it used one.
