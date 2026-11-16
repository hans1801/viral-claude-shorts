# Camera as transition

The animated shorts that perform best barely cut: the camera carries you from one idea to the next. Measured on five
references (Nov 2026, scene detection on the downloaded shorts):

| reference | length | hard cuts | average shot |
|---|---|---|---|
| MinuteEarth, "You are not genetically related to all your ancestors" (1.8 M) | 50 s | 0 | 50 s |
| TED-Ed, "Would you take the road less traveled?" | 30 s | 1 | 15 s |
| Zack D. Films, "What if humans had hummingbird hearts" (25 M, 3D) | 37 s | 3 | 9 s |
| Kurzgesagt, "The world's most average person" (3.8 M) | 70 s | 11 | 6 s |
| Kurzgesagt, "The deadliest thing in your kitchen" (5.3 M) | 67 s | 13 | 5 s |

A new scene in `scenes.json` is a new **idea** (new title), not a new **shot**. The picture keeps flowing.

## The moves they use, and how to do them here

| move | what it does | in this style |
|---|---|---|
| **Crane down** | opens wide on the place, lands on the character: the hook and the "where" in one move | glide `st.look` from high and far to eye level |
| **Follow the character** | the subject walks, the camera trucks beside it; the next idea is waiting where it stops | camera = a function of the character's position |
| **Follow the object** | something flies or falls (a ball, saffron onto a brain, a petal) and the camera rides it to the next subject | camera = a function of the object's position, looking a bit *ahead* of it (lead room) |
| **Foreground wipe** | something passes in front of the lens and fills the frame; behind it, the time, place or cast has changed | a wall/pillar/trunk 0.5 m from the lens; swap the light and the people while it covers |
| **Push in** | slow move toward the face: tension, "pay attention" | glide `pos` toward the target; `st.dof` on the eyes |
| **Snap zoom** | the punchline: 0.15 s fov jump + 7-frame shake + an effect | `fov` 38 → 30 in 0.15 s, shake flipping sign each frame |
| **Pull back to reveal** | from a detail to the big picture (the MinuteEarth move: one canvas, zoom out) | glide back and up to a **high three-quarter** view, never top-down (characters are cards: from above they flatten) |
| **Dive in** | push into something (a chest, a magnifier, a window) and come out in a world inside it | push until an object fills the frame, then swap the set (same idea as the foreground wipe) |
| **Anchor** | the same character stays on screen while labels, props and numbers change around it (Kurzgesagt) | keep the character, change cards/effects/titles per scene |

Hard cuts are still allowed, but only on big jumps (a different place with nothing to carry over) or on a beat (impact,
punchline). Aim for ≤ 1 cut every 5 s.

## How to build it: one camera rail

Write the camera as **one function of the global `t`** for the whole video, and make every scene call the same frame
function; the scenes only change the title. Scene boundaries then can't jump, because there are no boundaries in the
picture. Each glide starts exactly at the pose where the previous move ended (compute it from the same function).

```ts
const cam = (t: number) => {
  if (t < 3.5) return blend(SKY, followKid(3.5), ease(t / 3.5));   // crane down, ends exactly on the follow shot
  if (t < 7.0) return followKid(t);                                  // follow
  …
};
CT.shots(scenes.map((id) => ({ id })), init, (t) => frame(t));       // every scene draws the same continuous frame
```

- Use one sun direction for the whole rail (`st.light(…, { view })` with the same `view`), or the light swims between scenes.
- A change hidden by a wipe must **stay** changed: switch on time, not only on the camera's position (the camera may cross back).
- Keep every glide 0.6-1.3 s or longer and eased; hold nothing still (every hold creeps).
- Keep people out of the camera's path and out of the line between the camera and the subject.
- **Pick the opening shot from the first line of the script, not from habit.** Don't start every video with the same
  move. Ask what the line points at:
  - A place, or someone alone in it ("una mujer salió a bailar a la calle"): crane down from high above.
  - Something at the end of a place ("al fondo de la calle había un tanque"): eye level, looking down the street, dolly in.
  - A character in action ("todos viajaban a caballo"): low at the roadside as they pass, then follow them.
  - A detail that carries the story: start close on it and pull back.

The full example, with every move above except the dive, is `videos/camara-demo/` (21 s, zero cuts).
