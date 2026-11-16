// The world of the cartoon test: one painted street (houses, trees, cobbled road) and its people, built once.
const HC: { st?: ReturnType<typeof CT.stage> } = {};
const hcInit = (w: World) => {
  const st = HC.st = CT.stage(w, { light: 'day' });
  CT.ground(st, { kind: 'grass', size: 300, tile: 8 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(6, 120).rotateX(-Math.PI / 2), CT.mat('hc-road', { map: CT.paint.rep(CT.paint.cobbleHD(), 2, 40) }));
  road.position.y = 0.01; road.receiveShadow = true; st.add(road);
  const b = CT.batch();
  // houses on both sides of the street, fronts facing it
  [-24, -14, -4, 6, 16].forEach((z, i) => {
    CT.house(b, -9, z, { yaw: Math.PI / 2, w: 8, d: 7, h: [7, 8.4, 9.8][i % 3], style: i });
    CT.house(b, 8.5, z + 4, { yaw: -Math.PI / 2, w: 8, d: 7, h: [8.4, 7, 9.8][i % 3], style: i + 2 });
  });
  for (let i = 0; i < 6; i++) CT.tree(b, (i % 2 ? 4.2 : -4.4), -20 + i * 7, { kind: i % 3 === 2 ? 'cone' : 'round', h: 5 + (i % 3), seed: i + 1 });
  CT.build(b, st);
  return st;
};
// test shots (core/world.ts): the street by day and at golden hour, with the kid in each pose
CT.shots([
  { id: 'test-street', light: 'day' as const },
  { id: 'test-golden', light: 'golden' as const },
], hcInit, (t, u, shot) => {
  const st = HC.st!;
  st.light(shot.light, { view: [0.35, -1] });
  st.look([1.6, 1.7, 6.5 - u], [0.2, 1.0, -4], 40, 3);
  st.person({ id: 1, who: CT.KID, at: [0.2, 0, -4], front: { mode: 'stand', expr: u < 0.5 ? 'smile' : 'laugh', wave: u > 0.5 ? 0.6 : undefined } });
  st.person({ id: 3, who: CT.PARENT, at: [2.2, 0, -11], front: { mode: 'stand', expr: 'neutral', look: -1 } });
});
