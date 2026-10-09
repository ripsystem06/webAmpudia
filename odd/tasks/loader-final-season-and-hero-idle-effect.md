# Final Season Loader and Hero Idle Effect

## Goal
Replace the once-per-session logo intro with a black final-season announcement whose two-line heavy text reveals the confirmed video, add the existing race countdown, and make the Home hero's image-reveal cursor effect slightly larger with an idle infinity loop.

## User-approved decisions
- Loader copy is exactly two English lines: `LAST RACE` / `FINAL SEASON`.
- The background is black and the MP4 is visible through the letterforms.
- Countdown target reuses the existing `2026-11-09T00:00:00-07:00` date.
- The confirmed local video is currently named `ampudiazoom.mp4`; integrate it as `public/ampudiazom.mp4`.
- Show the loader only on the first entry of a browser session. Record the session immediately when it appears, so pressing F5 during or after playback never shows it again.
- Home hero reveal radius grows by 10% from 55 to 60.5 units.
- On desktop, the reveal follows an infinity-shaped path when there is no pointer activity, pausing for real pointer movement and resuming after a short idle delay.
- On mobile/tablet, the infinity effect runs automatically and touch/pointer interaction does not manually activate the reveal. Use coarse-pointer or tablet/narrow viewport detection.
- The loader lifetime must match the confirmed MP4 duration: 9.566 seconds.
- The initial loader frame must be solid black; the Home hero must never appear through the letters before the video starts.
- The two-line announcement and countdown must use the full viewport rather than reading as a small centered block.
- Work remains local; no commit or push is authorized.
- Split the headline and countdown into clearly separate groups with explicit spacing variables (`--intro-headline-lift` on the overlay, consumed by the headline block; `--intro-countdown-bottom` consumed by the countdown) instead of restructuring the centered/absolute composition.
- Skipping the loader is a first-class close path: a click, pointer/touch/wheel gesture, or Escape dismisses through the existing `setDismissed(true)` and reveals Home at the top. The session key stays claimed at mount, so an early skip simply means the intro does not replay this session.
- A wheel or touch gesture on the loader now also lands the visitor on the initial Home/hero: the window-level `wheel`/`touchmove` safety net is registered non-passive and calls `preventDefault()` while the loader is active, and every dismissal path resets the document scroll with `window.scrollTo(0, 0)`. Listener cleanup keeps the site scrollable once the loader is gone.

## TDD configuration
- Mode: strict TDD, explicitly selected by the user.
- Source: explicit user choice in this session.
- Exact runner: `react-scripts test --watchAll=false`.
- Required sequence: write focused failing tests and observe RED, implement the smallest change, observe GREEN, then run `npm run build` and focused browser/runtime checks.

## Tasks
- [x] LSH-1 — Moved the confirmed MP4 into `public/` and replaced `LogoIntro` with the masked two-line announcement and live countdown.
- [x] LSH-2 — Increased the Home hero reveal radius by 10% (55→60.5 units).
- [x] LSH-3 — Added desktop idle infinity motion and mobile/tablet auto-only behavior.
- [x] LSH-4 — Finished strict-TDD verification, full suite, production build, and browser checks.
- [x] LSH-5 — Replaced the stale `src/App.test.js` starter assertion and added a test-local `IntersectionObserver` stub; user authorized this bounded scope expansion.
- [x] LSH-6 — Versioned the final-season session key so the retired intro flag cannot suppress the new loader.
- [x] LSH-7 — Removed per-frame full-buffer work, eliminated random auto splatter, and sped/smoothed the infinity motion.
- [x] LSH-8 — Record the loader session immediately so F5 never replays it.
- [x] LSH-9 — Match loader lifetime to the 9.566-second MP4 and prevent the Hero poster/frame flash.
- [x] LSH-10 — Scale the two-line announcement and countdown to occupy the full viewport.
- [x] LSH-11 — Complete native review: reviewer found a CRITICAL autoplay-trap finding, fixed it within budget, validation approved, acknowledgement burned.
- [x] LSH-12 — Added explicit `--intro-headline-lift` / `--intro-countdown-bottom` spacing variables that lift the headline block and lower the countdown so the two groups read as separate, without restructuring the composition.
- [x] LSH-13 — Made a click, pointer/touch/wheel gesture, or Escape immediately dismiss the loader through the existing `setDismissed(true)` path, with an overlay-level and window-level safety net and full listener cleanup.
- [x] LSH-14 — Fixed the scroll leak: the window `wheel`/`touchmove` listeners are now non-passive and `preventDefault()` while the loader is active, and every dismissal path resets the document to the top via `window.scrollTo(0, 0)`, so a scroll gesture lands on the initial Home hero without leaving a leaked listener that would make the site unscrollable.

## Allowed implementation scope
- `src/components/LogoIntro.jsx`
- `src/components/LogoIntro.test.jsx`
- `src/components/HeroCanvas.jsx`
- `src/components/HeroCanvas.test.jsx`
- `src/App.test.js` (user-authorized repair of the unrelated stale full-suite test only)
- Move `ampudiazoom.mp4` to `public/ampudiazom.mp4`.

## Constraints and non-goals
- Preserve the app's existing Home-only HeroCanvas usage and LogoIntro's one-session presentation behavior. A new loader version may use a versioned session key so users who saw the retired intro still see the new announcement once.
- Keep the video muted, inline, and autoplay-compatible. Do not loop it; the loader and video each run once per browser session.
- Do not change unrelated page copy, HeroCanvas shader behavior, or other media.
- Do not delete local preview artifacts or commit/push.

## Verification evidence
- Initial strict-TDD focused RED/GREEN covered the loader, radius, idle gating, and figure-eight geometry. User feedback then drove a second RED: 11 failed / 16 passed for the legacy session key and animation cadence contracts. Corrected focused GREEN: 2 suites / 28 tests.
- Final independent full suite: `CI=true ./node_modules/.bin/react-scripts test --watchAll=false` → PASS, 3 suites / 29 tests.
- Final `npm run build` → PASS (Vite 7.3.3, 64 modules, 2.59s); `build/ampudiazom.mp4` remains included.
- The versioned key is `final-season-intro-v1-played`; tests prove `logo-intro-played` alone does not hide the new loader, the versioned key does, and the legacy key is never written.
- Hero auto motion now completes a cycle in ~3.49s, updates the mask every 33ms (~30.3 FPS), uses deterministic clean stamps, and skips full-buffer decay/upload on intervening display frames.
- Parent Chromium screenshot `.playwright-mcp/final-season-loader-initial.png` shows the two-line video-filled text and countdown on black; video resolves to `/ampudiazom.mp4` and advances.
- At 390×844, corrected screenshots `.playwright-mcp/home-hero-smooth-fix-a.png` and `home-hero-smooth-fix-b.png` taken 900ms apart show substantial, continuous auto-path movement. Viewport width selects auto-only mode even though the headless context reports a fine pointer.
- Desktop viewport was 1280×900; a synthetic `mousemove` was dispatched and a screenshot captured immediately and after 2.3s. Pure unit tests verify the 2s idle gate; the independent verifier notes these are not equivalent to a real physical mouse gesture.
- Loader refinement TDD: focused RED 13 failed / 9 passed, then GREEN 22/22; mobile layout RED 3 failed / 22 passed, then GREEN 25/25. Final full suite after timer-test cleanup: 3 suites / 43 tests PASS with no Jest timer warnings.
- Loader runtime: `INTRO_DURATION_MS=9566`; session flag is read synchronously and written on first mount; video has no poster or loop and only reveals after `playing`; `ended` closes and `error` fails open.
- Browser screenshot `.playwright-mcp/final-season-loader-fullscreen-desktop.png` at 1280×900 shows the video-filled two-line announcement and large countdown across the viewport. `.playwright-mcp/final-season-loader-fullscreen-mobile-v2.png` at 390×844 confirms the enlarged mobile composition with `scrollWidth === innerWidth === 390`. `.playwright-mcp/home-after-f5-no-loader.png` plus runtime state confirm F5 immediately renders Home with no loader while the session key remains set.
- Final `npm run build` after all loader refinements: PASS, Vite 7.3.3, 64 modules, 3.12s.
- Native review `review-709f7f7c6c3d85b3` (lens `review-reliability`) found one candidate-caused CRITICAL finding R3-001: the close fallback was armed only after `playing`, so blocked autoplay with no `error` could trap users behind the black overlay. Correction added `MEDIA_START_TIMEOUT_MS = 5000` fail-open startup watchdog (38/40 diff lines), cancelling itself once playback starts and leaving the 9566ms playback fallback authoritative. Targeted `review-validator` validation approved the corrected candidate; acknowledgement burned authority. Final suite after correction: 3 suites / 44 tests PASS; build PASS (3.09s).
- Advisory, non-blocking finding R3-002 (informational) at `src/components/HeroCanvas.jsx:424-437`; it opened no correction and must be handled as separate later work.
- The first native review lineage was abandoned with zero captured lens results after the user reported the loader visibility and hero performance defects. The corrected pre-refinement candidate was approved; the latest loader refinements require a fresh target review.
- No commit/push was authorized; all changes remain local.
- Loader refinement TDD for the two new tasks: focused RED `9 failed / 26 passed` (35 total) on `src/components/LogoIntro.test.jsx`, then GREEN `35 passed / 35 total`. RED failures were the separation-property test (missing `--intro-headline-lift` / `--intro-countdown-bottom`) and the eight skip-interaction tests (click, wheel, touch, window wheel/touchmove, Escape, early-skip session semantics, and listener cleanup all absent). jsdom drops `var()` from the `bottom` longhand, so the countdown offset is consumed by a real `.intro-countdown { bottom: var(--intro-countdown-bottom) }` rule (asserted via injected CSS) while the lift stays inline and testable.
- Separation contract: `--intro-headline-lift: clamp(2rem, 7vh, 5.5rem)` lifts the headline block via `translateY(calc(-1 * var(--intro-headline-lift)))`; `--intro-countdown-bottom: clamp(2.5rem, 14vh, 8rem)` lowers the countdown ceiling past the previous 5rem. Full-viewport, space-between countdown, desktop type sizes, and the mobile 600px overrides are unchanged.
- Scroll-leak fix strict-TDD RED/GREEN on `src/components/LogoIntro.test.jsx` (LSH-14). RED: `3 failed / 37 passed, 40 total` via `CI=true ./node_modules/.bin/react-scripts test --watchAll=false --runTestsByPath src/components/LogoIntro.test.jsx`; the failures were "prevents a wheel gesture from scrolling the document behind the loader" and "prevents a touchmove gesture from scrolling the document behind the loader" (`Expected: true, Received: false` on `event.defaultPrevented`) plus "resets the document scroll to the top when the loader dismisses" (`window.scrollTo` not called). GREEN on the same command: `40 passed / 40 total`, with the previous 35 tests intact and 5 new scroll-containment tests added. "stops preventing scroll once the loader is dismissed" and "removes the listener on unmount so the page scrolls normally afterwards" are the regression guards proving no non-passive listener leaks past dismissal/unmount; jsdom cannot really scroll, so the `window.scrollTo` spy is the honest contract. The four pre-existing close paths (`onEnded`, `onError`, the 5000ms startup watchdog, and the 9566ms playback fallback), click/Escape skip, session-key semantics, spacing contract, and desktop/mobile composition are unchanged.

## Delivery notes
- User explicitly authorized a bounded fix to the pre-existing App smoke test after the full suite failure was discovered; production Footer behavior remains out of scope.
- Rollback boundary: revert the loader and hero-effect code/tests, the App test-only fix, and move `public/ampudiazom.mp4` back to `ampudiazoom.mp4`.
- Gentle AI model routing now includes `review-refuter`; without it the provider refuter could not launch.
- No commit or push requested.
