// What the cartoon scenes see on top of the 3D globals (../3d/globals.d.ts): the cartoon look as the global CT.
// The adapter bundles src/index.ts into project/cartoon.js (bundle.ts), loaded after the 3D library.
declare const CT: typeof import('./src/index.ts');
