# Merchandising Shipping Selector Banner

## Objective
Replace the home page's multi-product storefront section with one merchandising banner and a shipping-destination dialog.

## Problem and rationale
`ProductosPromo` previously displayed four product cards and linked directly to the US store. The requested experience is one unified campaign image followed by a country choice, so shoppers can select the store that serves their shipping destination.

## Scope
- Convert the supplied `public/Merchandising.png` to `public/Merchandising.webp` losslessly and use the WebP banner in place of the product grid.
- Open an accessible dialog when the banner is activated. Show the requested Spanish warning, with standard spelling and accents: “ATENCIÓN / ESTÁS A PUNTO DE INICIAR LA CARRERA PARA COMPRAR EL MERCHANDISING OFICIAL / SELECCIONA A DÓNDE QUIERES HACER EL ENVÍO”.
- Offer United States and Mexico flag choices (with accessible country names) that navigate in the same tab to `https://www.alanampudia.store` and `https://www.alanampudia.tienda`, respectively.
- Follow existing Spanish/English language-switching conventions; preserve the supplied PNG and unrelated pre-existing untracked files.
- Keep changes limited to the merchandising section, its tests/configuration, translations, and the converted banner asset. Do not change footer/store links or the `/tienda` route.

## Constraints and resolved execution mode
- Strict TDD: **on**, explicitly selected by the user before implementation.
- Test runner: **Vitest**, explicitly selected by the user; use the repository's pnpm convention.
- Existing tests use Jest and Testing Library; scope Vitest to the new merchandising test and keep the Jest runner unchanged.
- Keep the working tree uncommitted. No commit, push, or publishing without a separate explicit user request.
- Do not remove or overwrite `public/Merchandising.png`.

## Tasks
- [x] **M-1 — Configure Vitest and add focused merchandising interaction tests.** Added Vitest 5.0.5 and jsdom 30.1.3, a scoped config/script, and six focused interaction tests. `pnpm test -- --run` produced the intended assertion-level RED (6/6 failed because the feature was absent); the runner, jsdom, and transforms worked.
- [x] **M-2 — Convert the banner asset and implement the dialog flow.** Replaced the product grid with the single banner, added the accessible bilingual shipping dialog and same-tab US/Mexico links, and converted the PNG to pixel-identical lossless WebP. All six focused tests and the Vite build passed.

## Route
- Both tasks: one `gentle-ai-worker`, delegated direct and executed sequentially. The multi-file writer trigger applied across the component, translations, tests, test configuration, package metadata/lock, and generated WebP asset. No parallel writers.
- The project CodeGraph index was present and used before discovery. The parent mapped `src/components/ProductosPromo.jsx`, `src/i18n/translations.js`, `vite.config.js`, and existing Jest-based tests.

## Acceptance criteria
- The home page presents one unified merchandising image instead of the four product cards and their direct store links.
- Activating the banner opens a dismissible, keyboard-accessible dialog with the requested Spanish message and clear US/Mexico flag choices.
- The US choice points to `https://www.alanampudia.store`; the Mexico choice points to `https://www.alanampudia.tienda`.
- The WebP asset is lossless, valid, and is the asset used by the component; the original PNG remains untouched.
- Spanish and English dialog copy follows the existing language-switching convention.

## Verification
- TDD RED: M-1 `pnpm test -- --run` ran the new suite and failed at the six expected missing-feature assertions; runner and transform setup were healthy.
- TDD GREEN: `pnpm test -- --run` passed twice (writer and independent verifier), 1 test file / 6 tests.
- Build: `pnpm exec vite build` passed twice; only non-fatal pre-existing React Router `"use client"` directive warnings.
- Asset: `file public/Merchandising.webp` reported lossless WebP; both source and output are 1672×941; `magick compare -metric AE public/Merchandising.png public/Merchandising.webp null:` reported `0 (0)`, exit 0.
- Build output is ignored: `git check-ignore -v build/` matched `.gitignore` line 10.
- Independent risk-gated verification passed both the focused tests and Vite build after native assessment returned `risk: unassessable` (treated as high).
- No commit or push was made.

## Outstanding
- Native review could not start: inspect required an untracked selection, then reported managed assets outdated; the exact `gentle-ai sync --agent pi` continuation completed with “no managed sync actions needed.” A fresh inspect offered START, but START and its target-scoped status reconciliation returned `schema-incompatible`; the envelope reported `lineage_created: false` and `mutation_performed: false`. No lineage or review receipt exists. Do not replay START or invent a recovery route; resolve the native operation failure if a receipt-dependent workflow is needed.
- Implementation and functional checks are complete in the working tree. The candidate remains uncommitted unless the user separately requests a commit.

## Next step
No further feature implementation is pending. If the user needs a native review receipt or commit, first resolve the recorded authority/delivery blocker under explicit authorization.