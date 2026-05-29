# Tasks: Hero Liquid Ink Fixes

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 170–210 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Shader Foundation

- [x] **1.1 HERO-001 Alpha compositing** — `HeroCanvas.jsx` FRAG: replace `inBounds` block (L51–53) with `mix(vec3(1.0), base.rgb, base.a)` and same for reveal. Add `gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)` in `loadTex()` before `texImage2D`. Remove `* inBounds` from L76 outerGlow mix. Verify: transparent PNG areas render white (#FFF). ~12 lines.
- [x] **1.2 HERO-002 Silhouette glow** — `HeroCanvas.jsx` FRAG: remove edge-dist glow (L55–64). Add 12-sample alpha-neighborhood loop (4 cardinal × 2 UV offsets + 4 diagonal × 1), compute `avgAlpha/12`, `glowIntensity = (1.0 - base.a) * avgAlpha`, mix `silhouetteGlow` into `blended.rgb` on L76. Verify: glow follows subject outline; zero on transparent/deep interior; ≤16 taps. ~28 lines.

## Phase 2: Organic Brush

- [x] **2.1 HERO-003 Extract stamp() — TDD** — `HeroCanvas.jsx`: write `__tests__/HeroCanvas.brush.test.js` RED test for `stamp()` radial falloff, then extract `stamp(cx, cy, radius, strength)` from current `paint()` body writing to `dispDataRef.current` with bounds checks. Make GREEN. Verify: Jest passes; center pixel ≈255, edge ≈0. ~22 lines.
- [x] **2.2 HERO-003 Organic paint() — TDD** — Write RED test asserting `paint()` produces disjoint ink clusters (mock `Math.random()`). Rewrite `paint()` to call `stamp()` for primary circle, then `3 + Math.floor(Math.random()*5)` satellites with random offset (±2–25 px), size (0.2–0.6×r), strength (0.5–0.9×s). Make GREEN. Verify: two calls produce different patterns; boundary satellites don't crash. ~18 lines.

## Phase 3: UI Integration

- [x] **3.1 HERO-004 Gradient overlay — TDD** — Write `Hero.test.jsx` RED asserting gradient div exists. Add `<div>` to `Hero.jsx` after overlay with `position:absolute; bottom:0; height:25vh; background:linear-gradient(to bottom,transparent,var(--black)); pointer-events:none; z-index:2`. Make GREEN. Verify: smooth Hero–PerfilReveal boundary; canvas events pass through. ~10 lines.
- [x] **3.2 HERO-005 Navbar threshold — TDD** — Write `Navbar.test.jsx` RED simulating scroll at 0.6× and 0.9× innerHeight. Change `Navbar.jsx` L20 from `0.5` to `0.85`. Make GREEN. Verify: dark text (#111) at 0.6×, light (#fff) at 0.9×. ~8 lines.

## Phase 4: Verification & Cleanup

- [x] **4.1 Manual shader check** — Dev server: load page, inspect hero1 transparent areas are white (not black), magenta glow traces silhouette not rectangle. Verify: visual inspection. ~0 lines.
- [x] **4.2 Polish** — Add 1-line GLSL comments above alpha composite and silhouette glow blocks. Remove any leftover commented shader code. Verify: no console warnings. ~3 lines.
