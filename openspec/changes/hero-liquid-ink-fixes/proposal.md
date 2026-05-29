# Proposal: Hero Liquid Ink Fixes

## Intent

Fix five visual bugs in the hero section's WebGL ink-reveal effect: black bleed through transparent PNG areas, basic circular brush stroke, glow bound to image rectangle instead of subject silhouette, hard white-to-black cut between Hero and PerfilReveal sections, and invisible navbar text on white hero background between 50–100vh scroll.

## Scope

### In Scope
- Alpha-composite base/reveal PNGs over white in the fragment shader, fixing black bleed on transparent pixels
- Set `UNPACK_PREMULTIPLY_ALPHA_WEBGL = false` explicitly in `loadTex()` for straight-alpha PNGs
- Replace circular distance brush with multi-stamp organic splatter (primary circle + 3–7 satellite stamps)
- Replace UV-edge glow with alpha-neighborhood silhouette-based glow (< 16 taps)
- Add gradient overlay (white → `var(--black)` at ~25vh height) at bottom of Hero section
- Change Navbar scroll threshold: `0.5` → `0.85` × innerHeight for correct hero/dark mode switching

### Out of Scope
- Scroll-based ink auto-reveal changes (existing `autoPaint` logic stays)
- PerfilReveal animation timing adjustments beyond the gradient transition

## Capabilities

### New Capabilities
None — all changes are visual bugfixes to existing components.

### Modified Capabilities
None — no spec-level contract changes. These are presentation-layer fixes only.

## Approach

**Shader-first** (Problems 1, 3): Composite `base.rgb` and `reveal.rgb` over white using `mix(vec3(1.0), color.rgb, color.a)`. Replace the current `inBounds`-based compositing at lines 51–53. Add alpha-neighborhood sampling (~12-direction spread) for glow distance from subject silhouette, replacing the current UV-edge distance at lines 56–63.

**Brush upgrade** (Problem 2): In `paint()`, after the primary circle stamp, add a loop of 3–7 satellite stamps at random offsets (2–25px), sizes (0.2–0.6× primary radius), with Gaussian falloff. Random seed per frame to avoid deterministic patterns.

**Transition overlay** (Problem 4): Add a `<div>` inside Hero `<section>` — `position: absolute; bottom: 0; height: 25vh; background: linear-gradient(to bottom, transparent, var(--black))`. Place after the existing overlay div (line 28).

**Navbar threshold** (Problem 5): Change `window.innerHeight * 0.5` to `window.innerHeight * 0.85` in Navbar line 20.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/HeroCanvas.jsx` | Modified | Fragment shader (alpha compositing + silhouette glow), `paint()` (multi-stamp brush), `loadTex()` (premultiplied alpha flag) |
| `src/components/Hero.jsx` | Modified | Add gradient overlay div at section bottom |
| `src/components/Navbar.jsx` | Modified | Scroll threshold `0.5 → 0.85` |
| `src/components/PerfilReveal.jsx` | None | No changes needed |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Extra texture samples degrade mobile GPU perf | Low | Hard cap at 12-direction glow samples; test on mid-range Android |
| Straight-alpha assumption incorrect for PNG encoding | Low | Explicit `UNPACK_PREMULTIPLY_ALPHA_WEBGL = false` in `loadTex()` |
| Multi-stamp CPU overhead measurable per frame | Low | 3–8 sub-stamps on 1024×1024 buffer ≈ negligible; bail to 3 stamps if frame time spikes |
| Gradient overlay visible behind transparent HeroCanvas edges | Low | Place overlay BELOW canvas in z-order; overlay is CSS gradient, canvas sits on top |

## Rollback Plan

Revert the commit on `v2/perfil-reveal`. Each fix is self-contained in the shader string, `paint()` function, or a single JSX div — no cross-cutting logic changes. Partial rollback possible per-problem.

## Dependencies

None — self-contained frontend fixes.

## Success Criteria

- [ ] Transparent PNG areas render as white (not black) with no visible edge artifacts
- [ ] Brush stroke shows organic ink-splatter pattern (not perfect circles)
- [ ] Glow emanates from subject silhouette, not image rectangle borders
- [ ] Smooth visual transition from hero white to PerfilReveal black — no hard cut
- [ ] Navbar text readable at all scroll positions over hero
- [ ] Visual tests: gradient overlay, silhouette glow, and brush pattern render correctly
