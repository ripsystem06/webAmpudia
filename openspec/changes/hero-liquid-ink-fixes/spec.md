# Delta Spec: Hero Liquid Ink Fixes

## ADDED Requirements

### HERO-001: Alpha compositing over white in fragment shader

The fragment shader MUST composite `base` and `reveal` texture samples over white using alpha: `mix(vec3(1.0), color.rgb, color.a)`. `UNPACK_PREMULTIPLY_ALPHA_WEBGL` MUST be `false` in `loadTex()`.

| AC# | Acceptance Criterion |
|-----|---------------------|
| AC1 | Transparent pixels (alpha=0) render white (#FFFFFF), not black |
| AC2 | Semi-transparent pixels blend proportionally toward white |
| AC3 | `UNPACK_PREMULTIPLY_ALPHA_WEBGL = false` is set before each `texImage2D` call |

#### Scenario: Transparent pixel renders white
- GIVEN base texture pixel RGBA=(0,0,0,0) at ink < reveal threshold
- WHEN shader computes output
- THEN `gl_FragColor.rgb = (1, 1, 1)`

#### Scenario: Opaque pixel preserved
- GIVEN base pixel RGBA=(r,g,b,1) at ink < reveal threshold
- WHEN shader computes output
- THEN `gl_FragColor.rgb = (r,g,b)` — no white mixing

#### Scenario: Straight-alpha PNG loaded correctly
- GIVEN hero1.png with straight (non-premultiplied) alpha
- WHEN `loadTex()` uploads to WebGL
- THEN `gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)` executes first

---

### HERO-002: Silhouette-aware glow

Glow MUST emanate from subject alpha silhouette, not image rectangle borders. Shader MUST sample `base.a` at 8–12 offset positions per fragment. Total texture taps per fragment MUST NOT exceed 16.

| AC# | Acceptance Criterion |
|-----|---------------------|
| AC1 | Glow visible along subject outline, not at image edges |
| AC2 | Zero glow contribution on fully transparent regions |
| AC3 | ≤ 16 texture taps per fragment (base + reveal + alpha samples) |

#### Scenario: Silhouette edge emits glow
- GIVEN fragment neighborhood has both opaque (α>0.5) and transparent (α<0.1) base pixels
- WHEN glow distance is computed from alpha-neighborhood
- THEN fragment receives magenta glow proportional to silhouette proximity

#### Scenario: Transparent region emits no glow
- GIVEN all 12 neighborhood alpha samples < 0.05
- WHEN glow computation runs
- THEN glow contribution is zero

#### Scenario: Deep opaque interior emits no glow
- GIVEN all 12 neighborhood alpha samples > 0.9
- WHEN glow distance exceeds falloff radius
- THEN glow contribution is zero (no glow on solid interior)

---

### HERO-003: Organic multi-stamp brush pattern

`paint()` MUST produce ink-splatter patterns. Each call MUST stamp a primary circle plus 3–7 satellite splatters at random offsets (2–25 px), sizes (0.2–0.6 × radius), and strengths. MUST use `Math.random()`.

| AC# | Acceptance Criterion |
|-----|---------------------|
| AC1 | Visual output resembles ink splatter/liquid blotch, not geometric circles |
| AC2 | 3–7 satellite stamps per paint call |
| AC3 | No two consecutive calls produce identical patterns (random variation) |

#### Scenario: Paint call creates organic pattern
- GIVEN `paint(0.5, 0.5, 55, 0.92)`
- WHEN function executes
- THEN displacement buffer contains irregular, non-circular ink cluster

#### Scenario: Satellite at buffer boundary
- GIVEN a satellite offset places stamp partially outside 1024×1024 buffer
- WHEN stamp applies ink
- THEN out-of-bounds pixels are skipped; no crash, no wrapping

---

### HERO-004: Hero-to-PerfilReveal gradient overlay

A gradient overlay `div` MUST be added inside Hero `<section>`: `position: absolute; bottom: 0; height: 25vh; background: linear-gradient(to bottom, transparent, var(--black))`. MUST coordinate with PerfilReveal's negative margin.

| AC# | Acceptance Criterion |
|-----|---------------------|
| AC1 | No visible hard white-to-black cut between Hero and PerfilReveal |
| AC2 | Gradient height ≈ 25vh; bottom color matches `var(--black)` (#050505) |
| AC3 | Canvas mouse/touch events still fire (overlay does not block interaction) |

#### Scenario: Boundary renders smoothly
- GIVEN viewport at Hero-PerfilReveal boundary
- WHEN both sections render
- THEN smooth color transition; no sharp white-to-black line

#### Scenario: Overlay in correct z-order
- GIVEN gradient overlay div rendered
- WHEN user moves mouse over bottom of Hero
- THEN `HeroCanvas` `onMouseMove` fires (overlay is behind canvas in z-order)

---

### HERO-005: Navbar scroll threshold at 0.85 × innerHeight

`inHero` threshold MUST change from `window.innerHeight * 0.5` to `window.innerHeight * 0.85`. Navbar MUST use dark text/logo while over white hero bg. Light text/logo only after scrolling past 85% of hero into dark sections.

| AC# | Acceptance Criterion |
|-----|---------------------|
| AC1 | `inHero = true` (dark text #111) when `scrollY < 0.85 × innerHeight` |
| AC2 | `inHero = false` (light text #fff) when `scrollY ≥ 0.85 × innerHeight` |
| AC3 | Logo filter `none` / `brightness(0) invert(1)` switches at same threshold |

#### Scenario: Mid-hero scroll position
- GIVEN 900px viewport, scrollY = 450px (50vh)
- WHEN scroll handler fires
- THEN `inHero = true`, navbar text color = `#111`

#### Scenario: Past 85% threshold
- GIVEN 900px viewport, scrollY = 780px (87vh)
- WHEN scroll handler fires
- THEN `inHero = false`, navbar text color = `#fff`

#### Scenario: Page load at top
- GIVEN page loaded, scrollY = 0
- WHEN `onScroll` effect initializes
- THEN `inHero = true`, navbar text = `#111`
