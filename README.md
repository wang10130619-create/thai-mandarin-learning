# Thai Mandarin — Chinese for Thai Beginners

An independent, static-deployable React + Vite website rebuilt from the supplied `thai-mandarin-week1` source project.

## Improvements in this rebuild

- Retains the existing Thai-language beginner course, 12-week curriculum, phrase library, tone quiz, self-introduction, microphone recording, print-to-PDF, and browser-local progress tracking.
- Removes runtime dependence on Manus storage assets and the Manus runtime/debug plugins.
- Replaces missing Manus-hosted images with self-contained CSS/emoji illustrations.
- Replaces unavailable Manus-hosted audio files with browser Speech Synthesis for Mandarin pronunciation. Actual available voice and sound quality depend on the user's browser/operating system; a Chinese voice is selected when installed.
- Adds play buttons for each lesson audio example and for reading a phrase category aloud.
- Removes an external analytics script that depended on unset environment placeholders.
- Keeps the visual direction and Thai learner-facing interface.

## Requirements

- Node.js 20 or newer recommended.
- npm.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (normally `http://localhost:3000`).

## Build for deployment

```bash
npm run check
npm run build
npm run preview
```

The static production site is generated in `dist/`. Deploy the contents of `dist/` to any static host that supports SPA fallback, such as Netlify, Vercel, Cloudflare Pages, or GitHub Pages (configure the base path appropriately for GitHub Pages).

## Notes

- This ZIP contains source code, not a completed online deployment. No hosting account has been connected and no public deployment has been performed.
- Speech playback uses the Web Speech API and requires a browser/OS with Chinese text-to-speech support. If no Mandarin voice is installed, playback availability may vary.
- Learning progress is stored in the current browser using `localStorage`; it is not synced across devices.
- Microphone practice requires browser permission and usually HTTPS or localhost.

## Dialogue learning improvements

The dialogue area now includes a scenario illustration card for each course week, with a short Thai description of the situation, per-line Chinese speech buttons, and a play-all control that reads the dialogue line by line. Speech uses the browser's built-in Mandarin speech synthesis (`zh-CN` where available); voice availability and voice quality depend on the learner's device/browser. No audio is uploaded or stored by this feature.

### Local verification

- Install dependencies with `npm install` (or use the repository's pnpm lockfile with pnpm).
- Run `npm run build` to generate the static site in `dist/`.
- Cloudflare Pages build settings for this repository: build command `npm run build`, output directory `dist`, root directory `/`.
