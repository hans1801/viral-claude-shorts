# Setup prompt: cartoon (2.5D)

The only thing you install yourself is Claude Code. Open Claude Code in any folder (your Desktop, for example), paste this prompt once and Claude does the rest: it installs the programs, downloads the project, makes you a basic cartoon animation (no voice) as a test and opens it in a preview in your browser. When the preview plays, everything is ready, and Claude ends with a summary: what it installed, how to open your animation again and how to get familiar with the project.

---

```text
I want to set up the cartoon (2.5D) style of the project https://github.com/hans1801/viral-claude-shorts on my computer (it turns the audio of a script into an animated short). I'm a beginner: do everything yourself and explain each step in one plain line, no jargon.

1. Check which system I'm on (macOS, Windows or Linux).
2. Check for Git, Node.js 22.18 or later, ffmpeg and Python 3.10 to 3.14 (3.12 is the safest; newer ones, like 3.15, can't install the transcription yet). Install whatever is missing (or update Node if it's older):
   - macOS: with Homebrew (`brew install git node ffmpeg python@3.12`). If Homebrew isn't there, its installer asks for the Mac's password and you can't type it: give me the exact command to paste into the Terminal app, warn me that the password doesn't show while I type it, and wait until I say "done". Then install the rest yourself.
   - Windows: with `winget install` (Git.Git, OpenJS.NodeJS.LTS, Gyan.FFmpeg, Python.Python.3.12).
   - Linux: with the package manager; if it asks for a password (sudo), give me the command and wait.
   Then check the versions again. If something you just installed doesn't show up, look for it in its install path before asking me to restart anything.
3. If this folder isn't the project already, download it here with `git clone https://github.com/hans1801/viral-claude-shorts.git` and work inside `viral-claude-shorts`. If I already have the project, run `git pull` so the cartoon style is there.
4. Install the dependencies without bumping versions (they're pinned on purpose):
   - transcription: a `.venv` environment at the root with `faster-whisper`, made with a Python from 3.10 to 3.14: `python3 -m venv .venv` if `python3 --version` is in that range, otherwise `python3.12 -m venv .venv` (on Windows `py -3.12 -m venv .venv`); then its `pip install faster-whisper`;
   - TypeScript checks: `npm install` at the root;
   - style: `npm install` inside `styles/2.5d_cartoon`, and check that `npx hyperframes --version` says 0.8.166.
5. Make me a basic cartoon animation with no voice (about 6 seconds) to test that everything works. First read `styles/2.5d_cartoon/USAGE.md` and look at the example in `videos/cartoon-demo/` (`scenes.json`, `world-cartoon.ts` and `visuals-cartoon.ts`). Then, in `videos/hello-cartoon/`:
   - write `scenes.json` with style `2.5d_cartoon`, fps 30 and `"duration": 6`, and 2 scenes with short Spanish titles (for example "¡Todo listo!"). There is no voice, so instead of word indices every scene after the first gives its start in seconds with `"t0"`, and every key its moment with `"t"`;
   - write `world-cartoon.ts` (a small set: a street or a square with `CT.house`, `CT.tree` and `CT.ground`) and `visuals-cartoon.ts` with `CT.shots`: cheerful and simple, inside the safe zone (x 80–1000, y 160–1600), with one or two characters (for example a kid who walks in and waves by day, then laughs at golden hour);
   - validate it with `node core/scenes.ts videos/hello-cartoon` and `npm run typecheck`, fixing it until there are no errors;
   - make the storyboard with `node core/storyboard.ts videos/hello-cartoon`, look at `videos/hello-cartoon/storyboard.png` yourself, fix whatever looks wrong and show it to me.
6. Open the preview with `node core/preview.ts videos/hello-cartoon`. It tries http://localhost:3004 first; if another program is using that port, it opens on the next free one and prints a note. Use the link it prints, and if it isn't 3004, tell me in one line why.
7. If something fails, fix it without changing the style's technique and tell me what you changed.
8. **Always** finish with this summary, even if something failed or you had to stop halfway (then start it with what's missing and the exact step to finish it). Write it in my language, for someone who has never programmed: short lines, no jargon, and every command in its own block so I can copy it.
   - **What got done:** each program (installed now or already there, one line each, with what it's for in a few words) and the full path of the project folder.
   - **Your test animation:** the link the preview printed (normally http://localhost:3004). There I press play and drag the timeline to move through it. It stays open in the background even if I close this chat, and it always shows the last video built (with my videos I'll hear their audio there too). To close it, and to open it again another day, give me these two commands, and tell me they're run from inside the project folder (the `cd` to get there first, with the full path):
     `node core/preview.ts videos/hello-cartoon --stop` and `node core/preview.ts videos/hello-cartoon`.
   - **Get familiar (5 minutes):**
     - watch the examples in the preview, one command each (the preview switches to that video): `node core/preview.ts videos/cartoon-demo` (the cartoon example: a painted street by day and at golden hour);
     - open `videos/cartoon-demo/storyboard.png`: that's the storyboard, one picture per scene, that I get with each video so I can ask for changes by panel number;
     - the folder that matters is `videos/`: each video lives in its own folder (`videos/<topic>/`), my audio goes in and `final.mp4` comes out. I don't need to touch anything else;
     - Claude makes each video in one go, without stopping to ask: it designs what gets drawn (objects, places and camera moves), checks it and gives me `final.mp4`, the preview link and the storyboard. Then I ask for changes if I want them.
   - **Next step:** have the script's audio ready (recorded or generated), open a NEW chat in Claude Code in the project folder, drag the audio in and say what I want, mentioning the style (for example "anima este audio en 2.5D, la idea es…"); the project already tells Claude the whole process. That chat will find the preview already open (or open it again if it's closed).
   - **If something breaks later:** open a chat in the project folder and say what I see, or paste this same setup prompt again: it only installs what's missing.
```
