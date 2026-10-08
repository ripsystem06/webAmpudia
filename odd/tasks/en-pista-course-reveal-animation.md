# En Pista Course Reveal Animation

## Objective
Polish the `/en-pista` hero with a circular route marker, a slimmer light trail, and the white blurred BAJA1000 logo projected as a static horizontal floor shadow at the course-map bottom.

## Scope and constraints
- Implementation: `src/pages/EnPista.jsx`; localized copy: `src/i18n/translations.js`.
- Preserve authored `public/pistabaja1000.svg` bytes.
- Preserve English “A NEW COURSE. A NEW CHALLENGE.” and Spanish “UNA NUEVA PISTA. UN NUEVO DESAFÍO.”
- Keep 20% responsive enlargement, 10vh top padding, a 12-second shared rotation clock, reverse travel around one closed contour, subtle trail, and reduced-motion handling.
- Latest user decision: no A; restore the circular marker that follows the route. Reduce both trail layers and glow blur by 50%. The existing BAJA1000 logo is the shadow: white, blurred, 10% opacity, static and projected horizontally at the bottom, centered and matching the map width.
- User authorized final commits and push to `main`; preview screenshots and browser logs are excluded from delivery.

## Task checklist
- [x] ECR-1 — Refine the route marker/trail and BAJA1000 floor-shadow placement; verify the local candidate.
  - User reports the circle is visible in Brave; use Brave as the visual baseline rather than tuning specifically for Firefox.
  - Reduced the enlarged marker dimensions by 50%: outer `r=40→20`, white core `r=20→10`, stroke `6→3`; route-following and reduced-motion behavior are preserved.
  - Kept trail widths 9/3, glow blur2, and the aligned static logo shadow unchanged. Independent build passed.

## Implementation
- Map uses a 45-degree tilted plane and Z rotation. Final marker is outer `r=20`, white core `r=10`/stroke3, with the trail thinner by 50%.
- BAJA1000 PNG is a black silhouette on transparent pixels (1479×922) and is tracked. Render it as white via CSS filter, blur it, opacity 0.1, and static floor projection (`perspective` + `rotateX`) anchored at the bottom of the map stage.
- Removed old course silhouette projection and gray floor light. The static BAJA1000 logo is the only shadow: `perspective(900px) rotateX(72deg)`, anchored at stage bottom, white filter, blur4px, opacity0.1. Latest requested refinement lowers it and confirms centered course-width alignment.
- Hero padding uses equivalent longhands to avoid a React shorthand conflict on responsive resize.

## Verification evidence
- Half-size-circle independent verifier `npm run build`: PASS, exit 0, Vite 7.3.3, 64 modules, 2.41s; only benign React Router `use client` warnings. Map SVG hash unchanged and build output copied it byte-for-byte.
- `public/BAJA100.png` and the newly added authored `public/pistabaja1000.svg` are tracked; SVG SHA-256 is `d227a70eba6eb0a9895ae34267c95a6cff6f3abd57c0caa9080a035754f4b32e`.
- Previous parent Chromium screenshot `.playwright-mcp/page-2026-10-08T22-18-05-962Z.png` showed the enlarged marker before this 50% reduction. No Brave or Firefox browser was launched for the final reduced-size candidate; user reports Brave is the target baseline.
- Parent measured logo width372 = stage310×1.2 and centered X alignment; transform/opacity/filter/rect were identical over700ms while stage rotation changed. The verifier independently confirmed source CSS and screenshot contents.
- Final size was source/build verified; actual Brave rendering after reduction and Firefox rendering were not independently tested. User has requested Brave as the visual baseline.
- Local preview: `http://localhost:3001/en-pista`.
- User aesthetic acceptance of blur/position remains a preview decision, not a claim proved by the build.

## Review and routing
- Delegated bounded implementation and follow-up to `gentle-ai-worker`; independent build/source verification to `gentle-ai-verify`; parent inspected browser behavior.
- Earlier A-orientation correction lineage `review-dc2c333da10bc27a` was approved and acknowledged; its approval does not cover later changes.
- Native review lineage `review-b2628a4f4c9930fb` for the final half-size candidate was approved and acknowledged; only informational suggestions/warnings were reported.
- Build and source checks pass; native review approved and acknowledged. Actual final Brave rendering remains for the user to confirm; Firefox is not the chosen baseline. The course SVG is now tracked in the delivery.

## Delivery follow-up
- Work-unit commits on `feat/en-pista-course-and-video-update`: `1caf31a` (`feat(en-pista): add circular course trace and aligned logo shadow`) and `9178cc4` (`fix(social): update embedded YouTube video`).
- The first commit includes the authored `public/pistabaja1000.svg` required by the mask and this task document; the second updates all three YouTube embed callsites.
- Root PNGs and `.playwright-mcp/` browser artifacts were intentionally excluded.
- Target branch: `main`; the feature branch will be fast-forwarded to it before the requested push.
- Rollback boundary: ECR commit changes `src/pages/EnPista.jsx`, `src/i18n/translations.js`, and `public/pistabaja1000.svg`; video commit changes only the three `VideoSocialsBlock` videoId props.
