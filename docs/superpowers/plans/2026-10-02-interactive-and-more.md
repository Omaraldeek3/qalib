# Interactive style and 12 designs per style: plan

Spec: `docs/design.md`, section "Update, later on 2026-10-02". Approved by Omar through the prototype and two answers (all eight interactions; 12 per style).

## Tasks

1. **Engine.** Types (`interactive` style; hero `zoom|layers|spotlight|trail|tilt|curtain`; about `scrub`; items `rail`), `layout.ts` image fallback for `rail`, components in `top.tsx` and `blocks.tsx`, layout CSS in `base.css`, engine in `runtime.js` (pins, views, pointer, trail, words, rails). Check: build-demos runs; a scratch design per variant renders without console errors at 1366/820/390 and with reduced motion.
2. **The style.** `categories.ts` entry (DNA written for prompts), `kits/interactive.css`, twelve designs in `designs/interactive.ts`. Check: contact sheet of covers, then each design scrolled through at desktop and phone.
3. **Prompt.** Variant descriptions in `copy.ts`, an `interactions` list in `PromptData`, an Interactions block in `build.ts`. Check: unit test that an interactive design's prompt explains its interactions in both languages.
4. **Thumbnails.** `thumbs.mjs` takes interactive covers with motion on. Check: covers show the first frame.
5. **Ship the interactive style** (commit, deploy, scan live pages), so Omar can see it early.
6. **Six more designs per existing style**, three styles at a time. Check after each batch: unit tests (fonts, contrast, slugs), demos build, contact sheet per style reviewed and fixed.
7. **Finish.** Counts in copy, README, og image; unit test for 12 per style; e2e counts; full overflow/console scan of all pages and demos; thumbnails; deploy; memory.
