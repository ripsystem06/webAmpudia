# Design: Hero Liquid Ink Fixes

## Technical Approach

Five independent visual fixes scoped to `HeroCanvas.jsx`, `Hero.jsx`, and `Navbar.jsx`. All are presentation-layer changes with no spec impact. The shader modifications (alpha compositing, silhouette glow) are pure GLSL replacements within the existing `FRAG` string. The brush upgrade refactors `paint()` into `stamp()` + new `paint()` with satellite stamps. The transition overlay is a single CSS `<div>` added to Hero. The navbar change is a one-line constant swap.

## Architecture Decisions

| Decision | Option | Tradeoff | Choice |
|----------|--------|----------|--------|
| Alpha compositing | `mix(vec3(1.0), color.rgb, color.a)` per-pixel | Simpler than inBounds; handles transparent & out-of-bounds uniformly; relies on `CLAMP_TO_EDGE` returning alpha=0 at edges | Per-pixel alpha composite |
| `UNPACK_PREMULTIPLY_ALPHA_WEBGL` | Explicit `false` in `loadTex()` | Safety: ensures straight-alpha interpretation regardless of browser defaults | Explicit `false` |
| Glow sampling direction count | 12 samples (4 cardinal × 2 dist + 4 diagonal × 1 dist) | Balances GPU cost with visual quality; <16 taps stays within mobile budget | 12-sample neighborhood |
| Glow distances | Near 0.008, far 0.02 UV | Near captures tight silhouette edge; far catches broader soft spread | Two-distance |
| Satellite stamp count | `3 + Math.random()*5` (3–7) | Avoids deterministic patterns; sub-pixel stamping at 1024² negligible CPU | Random 3–7 |
| Gradient overlay height | 20vh | Per explicit instruction; matches existing PerfilReveal overlap margin | 20vh |
| Navbar threshold | 0.85 × innerHeight | Users see dark text through ~85% of hero white; switches near bottom where gradient starts | 0.85 |

## Data Flow

```
Mouse/Touch ──→ handleMove(normX, normY) ──→ paint() ──→ stamp() × N
                                                              │
autoPaint (60fps) ──→ paint(cx, cy, 75, 0.6) ────────────────┤
                                                              ▼
                                                    dispDataRef (Uint8Array 1024²)
                                                              │
                                                    texSubImage2D upload
                                                              ▼
                                              FRAG shader ──→ u_disp (ink mask)
                                                    │
                                              base.a sampled at 12 offsets
                                                    │
                                              silhouetteGlow computed
                                                    │
                                              gl_FragColor
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/HeroCanvas.jsx` | Modify | FRAG: replace inBounds check with per-pixel alpha composite (line 51-53). Replace edge-dist glow (lines 55-64) with 12-sample silhouette glow. Remove `inBounds` multiplier from line 76. Add `UNPACK_PREMULTIPLY_ALPHA_WEBGL=false` in `loadTex()`. Refactor `paint()` → `stamp()` internal + new `paint()` with 3–7 satellite stamps. |
| `src/components/Hero.jsx` | Modify | Add gradient overlay `<div>` after existing overlay (z-index: 2, bottom: 0, height: 20vh, `linear-gradient(to bottom, transparent, var(--black))`, pointer-events: none). |
| `src/components/Navbar.jsx` | Modify | Line 20: `0.5` → `0.85`. |

## Shader Change Detail

**Remove (lines 50-53):**
```glsl
float inBounds = step(0.0, texUV.x) * step(texUV.x, 1.0) * step(0.0, texUV.y) * step(texUV.y, 1.0);
base.rgb   = mix(vec3(1.0), base.rgb,   inBounds);
reveal.rgb = mix(vec3(1.0), reveal.rgb, inBounds);
```

**Replace with:**
```glsl
base.rgb   = mix(vec3(1.0), base.rgb,   base.a);
reveal.rgb = mix(vec3(1.0), reveal.rgb, reveal.a);
```

**Remove (lines 55-64)** — edge-dist glow block entirely.

**Add silhouette glow block** (after alpha composite, before `mixFactor`):
```glsl
float accumAlpha = 0.0;
for (int i = 0; i < 4; i++) {
    float angle = float(i) * 1.5707963;
    vec2 dir = vec2(cos(angle), sin(angle));
    accumAlpha += texture2D(u_base, texUV + dir * 0.008).a;
    accumAlpha += texture2D(u_base, texUV + dir * 0.02).a;
    float dAngle = angle + 0.785398;
    vec2 dDir = vec2(cos(dAngle), sin(dAngle));
    accumAlpha += texture2D(u_base, texUV + dDir * 0.02).a;
}
float avgAlpha = accumAlpha / 12.0;
float glowIntensity = (1.0 - base.a) * avgAlpha;
vec3 silhouetteGlow = mix(vec3(1.0), vec3(0.91, 0.12, 0.38), glowIntensity * 0.55);
```

**Replace line 76:**
```glsl
blended.rgb = mix(blended.rgb, silhouetteGlow, glowIntensity * 0.45);
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `stamp()` pixel math correctness | Jest unit test on exported `stamp` — provide known Uint8Array, call stamp, verify pixel channel values at center/edge |
| Unit | `paint()` satellite count | Test that `paint()` writes to disjoint pixel regions (primary center + satellite offsets) — proves multi-stamp |
| Component | Navbar threshold | Render `<Navbar />`, simulate scroll to 0.6×innerHeight (should stay inHero=true), scroll to 0.9×innerHeight (inHero=false) |
| Component | Hero gradient overlay rendered | Shallow render `<Hero />`, assert gradient div with expected styles exists |
| Visual | Shader alpha/glow correctness | Manual: load in browser, verify no black bleed on transparent PNG areas, magenta glow follows silhouette not rectangle |

> **Note**: Shader output is not unit-testable with Jest. Visual verification (manual browser check) is required for alpha compositing and glow correctness. The brush function (`stamp`/`paint`) operates on a plain Uint8Array — this IS testable with standard Jest assertions.

## Open Questions

- [ ] Confirm both `hero1.png` and `hero2.png` use straight (non-premultiplied) alpha — verify with `identify -verbose hero1.png | grep Alpha` (ImageMagick)
- [ ] Test `paint()`/`stamp()` performance on mid-range Android device — 3–7 sub-stamps per frame × 60fps = 180–420 circular stamp operations

## Rollback

Each fix is self-contained: revert the FRAG string block, revert `paint()` split, remove the gradient div, revert threshold constant. Partial rollback possible per deliverable.
