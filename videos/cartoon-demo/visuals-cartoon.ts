// A quick test of the cartoon (2.5D) style, with no voice: both scenes use the street built in world-cartoon.ts.
CT.shots([
  { id: 'street', fn(t: number, u: number, s: Scene) {
    const st = HC.st!, wave = s.keys?.find((k) => k.id === 'wave')?.t ?? 2.2;
    const walking = t < wave - 0.3, x = -1.9 + (Math.min(t, wave - 0.3) - s.t0) * 1.0;   // crosses the street, then stops
    st.light('day', { view: [0.35, -1] });
    st.look([1.6 + u * 0.4, 1.7, 6.5 - u * 0.6], [0.2, 1.0, -4], 40, 3);
    st.person({ id: 1, who: CT.KID, at: [x, 0, -4], walk: walking ? [1, 0] : undefined,
      side: { mode: 'march', phase: CT.walkPhase(t, 1.2), expr: 'smile' },
      front: { mode: 'stand', expr: t > wave ? 'grin' : 'smile', wave: t > wave ? 0.5 + 0.5 * Math.sin((t - wave) * 9) : undefined } });
    st.person({ id: 2, who: CT.townsfolk(1), at: [-1.5, 0, -7], front: { mode: 'stand', expr: t > wave + 0.2 ? 'smile_closed' : 'neutral', look: 1 } });
    st.person({ id: 3, who: CT.PARENT, at: [2.2, 0, -11], front: { mode: 'stand', expr: 'neutral', look: -1 } });
  } },
  { id: 'sunset', fn(t: number, u: number, s: Scene) {
    const st = HC.st!, pop = s.keys?.find((k) => k.id === 'pop')?.t ?? 5;
    st.light('golden', { view: [0.2, -1], az: 10, el: 8 });
    st.look([1.3, 1.25, 3.0 - u * 0.4], [0.2, 0.95, -2.6], 34, -4);   // kid between y 600 and 1500, with a slow push-in
    st.dof(13, [0.2, 1.6, -2.6]);
    st.person({ id: 1, who: CT.KID, at: [0.2, 0, -2.6], front: { mode: 'stand', expr: t > pop ? 'laugh' : 'grin', headTilt: t > pop ? 4 : 0 } });
    st.person({ id: 2, who: CT.townsfolk(1), at: [-1.6, 0, -6.5], front: { mode: 'stand', expr: 'smile_closed' } });
    if (t > pop) st.effect('burst', [0.75, 1.75, -2.4], 0.8, CT.clamp01((t - pop) / 0.5));
  } },
], hcInit, (t, u, shot, s) => shot.fn(t, u, s));
