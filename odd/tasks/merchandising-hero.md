# Merchandising Hero: Localized Store Chooser

## Objective
Maintain the full-bleed merchandising hero and accessible localized store selector, with visible section spacing and tagged store links; apply the top fade directly to a derived image asset using real transparency.

## Problem and rationale
The user asked for the same top fade to be applied to the image itself, with a transparent background. The current `public/Merchandising.webp` had an alpha channel but every pixel was opaque. A new derivative was created with a transparent-to-opaque alpha ramp across its top; both existing source assets remain intact.

## Current scope
- Preserve the full-bleed responsive hero, bilingual copy, popup, flags, store URLs, spacing, and accessibility.
- Create `public/Merchandising-fade.webp`, preserving original dimensions, with a gradual alpha ramp from transparent at the top to fully opaque after the fade band.
- Use the derivative in the hero and remove the CSS top-fade layer so the effect is truly baked into image transparency.
- Preserve `public/Merchandising.webp` and `public/Merchandising.png` unchanged.
- Keep the underlying hero background dark so transparent pixels reveal the page/section background.
- Do not add shipping/payment/price/checkout copy or change unrelated assets.

## Constraints and resolved execution mode
- Strict TDD: **on**, previously explicitly selected by the user.
- Test runner: **Vitest**; use existing `pnpm test -- --run`.
- ImageMagick `magick` is available; original WebP is 1672×941 and all source alpha values are 1.0.
- Keep all work uncommitted; no commit, push, or publishing without separate explicit authorization.
- Preserve all unrelated pre-existing untracked files.

## Tasks
- [x] **H-1 through H-22, H-24 through H-26 — Implement and verify the hero, chooser, spacing, tagged stores, and CSS fade.** Prior CSS-fade candidate passed 18/18 focused tests and Vite build.
- [x] **H-12, H-19, H-23 — Inspect prior native review candidates.** START/status reconciliation failed `schema-incompatible`; no lineage/mutation/receipt and no retry.
- [x] **H-27 — Test the alpha-faded image source.** Added assertion that the hero uses `/Merchandising-fade.webp`. RED before asset/source edit: expected derivative URL but got `/Merchandising.webp`; 1 failed / 18 passed.
- [x] **H-28 — Generate and use the transparent image derivative.** Created new lossless 1672×941 WebP with transparent top alpha ramp over 120 source pixels and fully opaque pixels below. Component now uses the derivative; CSS top-fade overlay removed and content z-index restored to 2. Tests assert the asset source and absence of a separate CSS overlay. Focused tests passed 19/19. Original `.webp` and `.png` preserved.
- [x] **H-29 — Independently verify the image alpha, focused tests, and build.** Verified derivative is lossless 1672×941 sRGBA; center-column alpha y=0 -> 0, y=60 -> 0.506, y=119/120/lower -> 1. Original WebP/PNG hashes and sizes match pre-edit values. `pnpm test -- --run`: 19/19 passed. `pnpm exec vite build`: passed with two non-fatal React Router directive warnings; derivative copied to `build/`. Browser pixels not verified.
- [x] **H-30 — Inspect native review authority for the final alpha-asset candidate.** Resolved relevant intended-untracked selection and received a fresh START route. START and automatic target-scoped STATUS reconciliation failed `schema-incompatible`, reporting `lineage_created: false` and `mutation_performed: false`. No native receipt; no retry/recovery.

## Route
- H-27/H-28: one `gentle-ai-worker`, tests first, then derived asset + component change.
- H-29: `gentle-ai-verify`, read-only; passed.
- H-30: native inspect/start route followed exactly; selected relevant current untracked paths; controller failure was terminal and not replayed.
- Exact edit surfaces: `src/components/ProductosPromo.test.jsx`, `src/components/ProductosPromo.jsx`, and new `public/Merchandising-fade.webp`.
- Alpha implementation: a 120px vertical transparency ramp at the image top, then fully opaque pixels; ImageMagick output encoded lossless to preserve image colors.

## Acceptance criteria
- The hero uses the new derivative image with a real alpha fade at the top, exposing the dark section background through transparent pixels.
- The CSS top-fade overlay is removed; the image's alpha ramp produces the transition.
- Original `Merchandising.webp` and `Merchandising.png` remain unchanged.
- Image remains 1672×941; alpha is 0 at the top, partial within the fade band, and 1 below it.
- All focused tests and the production build pass; no unrelated files/assets change.

## Verification history
- Previous H-1 through H-26 evidence is documented in earlier sections and Engram. CSS-fade candidate passed 18/18 focused tests and Vite build; two upstream React Router `"use client"` warnings only.
- Prior native reviews H-19/H-23 failed during START and automatic STATUS reconciliation with `schema-incompatible`; no lineage/mutation/receipt and no retry.
- Initial source inspection: `public/Merchandising.webp` 1672×941 lossless WebP, source alpha range 1..1; `public/Merchandising.png` RGB PNG.
- H-27 RED: new source assertion failed because component still used `/Merchandising.webp`; 18 existing tests passed.
- H-28 GREEN: final `pnpm test -- --run` passed 19/19 after switching image source, removing CSS overlay and replacing overlay tests with derivative-source/no-overlay checks.
- Worker alpha verification: derivative is VP8L lossless WebP, `sRGBA`, 1672×941; alpha samples center column: y=0 -> 0.0, y=30 -> 0.251, y=60 -> 0.506, y=90 -> 0.757, y=119 -> 1.0, y=120/400/940 -> 1.0. RGB below the 120px fade band matched original (`RMSE 0`). Both original assets unchanged.
- H-29 independent verification: alpha ramp independently confirmed; original hashes/sizes unchanged; focused tests passed 19/19; build copied new derivative and passed with two non-fatal upstream warnings. No browser pixel rendering.
- H-30: current inspect/selection was ready; START and automatic STATUS reconciliation failed `schema-incompatible` with no lineage created and no mutation. No receipt; no replay.

## Current validation status
- H-27 through H-30: implementation, test, image alpha, and independent build verification complete.
- Native review receipt is unavailable because the facade's START and target-scoped status reconciliation failed `schema-incompatible`; do not retry without a fresh native-authorized route.
- Browser screenshot/pixel rendering remains unverified.
- Other Jest suites remain unverified; Vitest is scoped to `ProductosPromo.test.jsx`.
- No commit or push.

## Next step
No code or image changes are pending. If a native review receipt is required, obtain a fresh authorized route for the `schema-incompatible` controller failure; do not replay the failed operation.