# Build-Time Latest YouTube Video

## Goal
The site must always embed the channel's newest YouTube video, resolved during the build, with no API key and no runtime request. The user explicitly chose the build-time RSS approach.

## User-approved decisions
- Resolve the newest video at build time from the public RSS feed `https://www.youtube.com/feeds/videos.xml?channel_id=UCWmDHQ0EY-cpjcrrcxM5Dzg` instead of the YouTube Data API.
- No API key: the RSS feed is public, requires no credentials, and returns the same 15 newest entries with the first `<entry>` being the newest video.
- Chain the fetch explicitly inside the `build` script; do **not** add a `prebuild` script because pnpm does not run `pre`/`post` lifecycle scripts by default and Vercel runs `pnpm build`.
- Keep the committed fallback data file so a fresh clone and an offline build still render a valid video.
- The currently visible video may not change as a result of this work; the seed must reproduce today's hardcoded `4s_CE5xVTbk`.
- The build must never fail because of network, DNS, or YouTube markup changes.
- `undefined` opts into the build-time latest video, an explicit `null`/`''` keeps the placeholder, and any explicit non-empty `videoId` still wins.

## TDD configuration
- Mode: strict TDD, explicitly requested by the user in this session.
- Source: explicit user choice in this session.
- Exact runner: `CI=true ./node_modules/.bin/react-scripts test --watchAll=false`.
- Required sequence: write focused failing tests and observe RED, implement the smallest change, observe GREEN, then hand off the build-network path to the parent.
- `VideoSocialsBlock` needs a test-local `IntersectionObserver` stub, mirroring the one already used by `src/App.test.js` for the Footer.

## Tasks
- [x] YLV-1 — Added the standalone ESM build script `scripts/fetch-latest-video.mjs` that fetches the RSS feed with a timeout, extracts the first `<yt:videoId>`/`<title>`/`<published>`, validates the id, writes `src/data/latestYoutubeVideo.json`, and always exits `0` while preserving the existing file on any failure.
- [x] YLV-2 — Committed the fallback data file seeded with the currently visible video (`4s_CE5xVTbk`).
- [x] YLV-3 — Added the dependency-free app accessor `src/lib/latestYoutubeVideo.js` exporting the latest id and an 11-character validator.
- [x] YLV-4 — Made `VideoSocialsBlock` resolve an `undefined` prop through the accessor while keeping the explicit-prop and placeholder behavior.
- [x] YLV-5 — Removed the hardcoded `videoId="4s_CE5xVTbk"` prop from `Home.jsx`, `EnPista.jsx`, and `FueraDePista.jsx`.
- [x] YLV-6 — Chained the fetch into the `build` script without adding a `prebuild` script; `start` and `preview` are unchanged.
- [x] YLV-7 — Completed the strict-TDD focused RED/GREEN for the accessor and the component (see Verification evidence).

## Allowed implementation scope
- `scripts/fetch-latest-video.mjs`
- `src/data/latestYoutubeVideo.json`
- `src/lib/latestYoutubeVideo.js`
- `src/lib/latestYoutubeVideo.test.js`
- `src/components/VideoSocialsBlock.jsx`
- `src/components/VideoSocialsBlock.test.jsx`
- `src/pages/Home.jsx`
- `src/pages/EnPista.jsx`
- `src/pages/FueraDePista.jsx`
- `package.json`
- `odd/tasks/youtube-latest-video-at-build.md`

## Constraints and non-goals
- No third-party dependencies: the script uses only Node built-ins and the existing toolchain.
- The script must never write logs or temporary files outside the repository; `/tmp` is off limits.
- Do not change unrelated page copy or the placeholder design.
- Do not modify `src/App.test.js`, `src/components/HeroCanvas.*`, `src/components/LogoIntro.*`, `public/ampudiazom.mp4`, or anything under `.playwright-mcp/`.
- The parent verifies the build-network path and the full suite; this task must not run the full suite or `npm run build`.
- No commit, stage, push, or review tooling.

## Verification evidence
- Focused strict-TDD RED: `CI=true ./node_modules/.bin/react-scripts test --watchAll=false --runTestsByPath src/lib/latestYoutubeVideo.test.js src/components/VideoSocialsBlock.test.jsx` → 2 suites failed to run, 0 tests. Both failed with `Cannot find module './latestYoutubeVideo'` / `Cannot find module '../lib/latestYoutubeVideo'`, i.e. the accessor and its fallback did not exist yet.
- Focused strict-TDD GREEN: the same command after implementation → 2 suites passed, 2 total; 8 tests passed, 8 total.
- Accessor contract covered: accepts real 11-character ids such as `4s_CE5xVTbk` and `_-abcdefghi`; rejects `short`, `toolongvideoid`, the empty string, a malformed 11-character value (`4s CE5xVTb!`), `null`, `undefined`, and a number; `getLatestYoutubeVideoId()` returns the committed `4s_CE5xVTbk`.
- Component contract covered: an explicit `videoId` prop wins; an `undefined` prop falls back to the accessor's latest id and renders the iframe at `/embed/<id>`; `videoId={null}` and `videoId=""` render the placeholder (`Video coming soon`) with no iframe.
- Script run for this task (parent-verified build path): `node scripts/fetch-latest-video.mjs` → exit `0`, logged `wrote 4s_CE5xVTbk to src/data/latestYoutubeVideo.json`. Resulting committed data file:

```json
{
  "videoId": "4s_CE5xVTbk",
  "title": "Alan Ampudia | Official 2026 Baja 400 Recap",
  "published": "2026-10-08T00:00:07+00:00",
  "fetchedAt": "2026-10-09T20:06:19.190Z"
}
```

- `package.json` scripts after the change: `start` = `vite`, `build` = `node scripts/fetch-latest-video.mjs && vite build`, `preview` = `vite preview`; no `prebuild`.
- Not run here by design: full Jest suite and `npm run build` (parent-owned).

## Delivery notes
- Rollback boundary: delete `scripts/fetch-latest-video.mjs`, `src/lib/latestYoutubeVideo.js`, `src/data/latestYoutubeVideo.json`, and their tests; restore the hardcoded `videoId="4s_CE5xVTbk"` prop on the three pages; revert the `build` script to `vite build`.
- The data file is written by the build script and must remain committed so offline/fresh-clone builds still render a valid video.
- No commit or push is authorized; all changes remain local for the parent.
