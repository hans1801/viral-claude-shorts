#!/usr/bin/env node
// Bundles the cartoon look (src/index.ts) into one browser script with the global CT: node styles/2.5d_cartoon/bundle.ts <out.js>
// `three` is the page's global THREE (the same copy the 3D engine draws with); everything else, postprocessing
// included, goes inside. The adapter runs this in its own process because esbuild plugins need the async API.
import path from 'node:path';
import { build } from 'esbuild';

const out = process.argv[2];
if (!out) { console.error('usage: node styles/2.5d_cartoon/bundle.ts <out.js>'); process.exit(2); }
await build({
  entryPoints: [path.join(import.meta.dirname, 'src', 'index.ts')], bundle: true, format: 'iife', globalName: 'CT',
  target: 'es2022', minify: true, outfile: out, logLevel: 'error',
  plugins: [{ name: 'global-three', setup(b) {
    b.onResolve({ filter: /^three$/ }, () => ({ path: 'three', namespace: 'global-three' }));
    b.onLoad({ filter: /.*/, namespace: 'global-three' }, () => ({ contents: 'module.exports = globalThis.THREE;', loader: 'js' }));
  } }],
});
