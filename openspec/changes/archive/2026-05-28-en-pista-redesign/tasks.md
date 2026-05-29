# Tasks: EnPista Page Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 800–1000+ |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: Foundation + Hero | PR 2: Race History + Trophy Truck | PR 3: Co-Driver + Helmet Animation |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation + Hero | PR 1 | GSAP install, new race years data, CSS keyframes, hero with track SVG + countdown |
| 2 | Race History + Trophy Truck | PR 2 | Year tabs, accordion, gallery scroll-snap, spec table |
| 3 | Co-Driver + Helmet Animation | PR 3 | Co-driver section, GSAP ScrollTrigger helmet sequence |

---

## Phase 1: Foundation + Hero (PR 1)

- [x] 1.1 Run `pnpm add gsap` — install GSAP dependency; verify in package.json
- [x] 1.2 Add 4 missing race years to `temporadas` array in EnPista.jsx: 2023, 2021, 2020, 2018 (with all 4 races each per race data)
- [x] 1.3 Add CSS keyframes for `trackGlow` and `blink` animations to EnPista.jsx `<style>` block
- [x] 1.4 Verify `pistarpoxima.svg` path element has ID or class for `stroke-dashoffset` targeting
- [x] 1.5 Build HeroSection: render pista.svg with animated glow layer, info overlay ("58th SCORE BAJA 500", "460+ miles Ensenada", "June 3–7, 2026"), and CountdownTimer (DD:HH:MM:SS to June 3 2026 00:00:00 local)

---

## Phase 2: Race History + Trophy Truck (PR 2)

- [x] 2.1 Build RaceHistorySection: year tab buttons for 2025→2018, useState for activeYear
- [x] 2.2 Build RaceAccordion: list of races per year, each item shows name/date/position badge/time
- [x] 2.3 Implement expandedRace useState and detail panel: full race name, absolute+class position, time, notes, DNF indicator
- [x] 2.4 Build TrophyTruckSection: horizontal photo gallery from `public/images/galeria1/` with CSS scroll-snap
- [x] 2.5 Build SpecTable: CSS grid, 6 categories, alternating row backgrounds, monospace font, magenta accents

---

## Phase 3: Co-Driver + Helmet Animation (PR 3)

- [x] 3.1 Build CoDriverSection: layout with `/images/10-victory-flag.png` left, bio text right; KYLE "EL K" heading, role label, bio paragraph
- [x] 3.2 Register GSAP ScrollTrigger plugin in useEffect on mount
- [x] 3.3 Build HelmetAnimationSection: sticky container, load 26 frames (HBB00250–HBB00275.webp from public/clean/), GSAP ScrollTrigger drives translateX from off-screen left to 0 with scrub: 1

---

## Dependencies & Ordering

1. Phase 1 must complete before Phase 2 and 3 (provides foundation: GSAP + data)
2. Phase 2 and 3 are independent of each other and can run in parallel
3. Phase 3 depends on GSAP being installed (Phase 1)

---

## Acceptance Criteria Per Task

| Task | Acceptance Criteria |
|------|---------------------|
| 1.1 | `import gsap from 'gsap'` succeeds without errors |
| 1.2 | All 8 years (2025→2018) present, each with 4 races; data matches user-provided race data |
| 1.3 | `trackGlow` animates `stroke-dashoffset` 100%→0% loop 3s; `blink` toggles opacity 2s |
| 1.5 | Track SVG renders with glow loop; countdown updates every second; info overlay visible |
| 2.1 | All 8 year tabs render; clicking changes activeYear and displays correct races |
| 2.3 | Clicking a race expands detail panel; DNF races show DNF indicator prominently |
| 2.4 | Gallery scrolls horizontally with snap; 4–6 images visible |
| 2.5 | Spec table has 6 categories, alternating rows, all spec values visible |
| 3.1 | Image + bio side-by-side (desktop), name bold magenta, role below name |
| 3.2 | `gsap.registerPlugin(ScrollTrigger)` called without errors |
| 3.3 | Helmet images animate from left on scroll; final frame centered when animation ends |
