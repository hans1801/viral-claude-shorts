// Cartoon (2.5D): the 3D style's adapter and engine (styles/3d/adapter.ts make3D) with its own folder, port 3004 and
// video files (world-cartoon.ts, visuals-cartoon.ts), plus project/cartoon.js: the cartoon look as the global CT.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { make3D } from '../3d/adapter.ts';

const HERE = import.meta.dirname;
export default make3D({
  here: HERE, port: '3004', engine: 'HyperFrames + Three.js + postprocessing (cartoon)', label: '2.5D cartoon',
  world: 'world-cartoon.ts', visuals: 'visuals-cartoon.ts',
  extra(proj) {
    const r = spawnSync(process.execPath, [path.join(HERE, 'bundle.ts'), path.join(proj, 'cartoon.js')], { cwd: HERE, encoding: 'utf8' });
    if (r.status !== 0) throw new Error('could not bundle the cartoon look (src/):\n' + r.stdout + r.stderr);
    return ['cartoon.js'];
  },
});
