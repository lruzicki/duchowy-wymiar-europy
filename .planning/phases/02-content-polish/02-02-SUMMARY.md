---
phase: 02-content-polish
plan: 02
subsystem: ui
tags: [react, i18n, react-i18next, tailwindcss, shadcn-ui, hero, cta]

# Dependency graph
requires:
  - phase: 01-internationalization
    provides: "useTranslation hook, all 6 locale files, LanguageSwitcher component"
provides:
  - "Redesigned Hero with two-column layout, Badge, floating accent card, action buttons"
  - "CTASection inline component in FigmaApp with Heart icon and dark bg-primary"
  - "New i18n keys: hero.badge, hero.floatingLabel, hero.floatingValue, cta.heading, cta.body, cta.btnProjects, cta.btnContact in all 6 locales"
  - "BRAND-02 satisfied: Hero.tsx uses only local image path, no Unsplash URLs"
affects: [02-content-polish, deploy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Badge from shadcn/ui used for hero metadata labels"
    - "Inline CTASection component co-located in FigmaApp.tsx for single-use CTA"
    - "mailto: href for contact button in CTA (no router needed)"

key-files:
  created: []
  modified:
    - src/components/figma/Hero.tsx
    - src/components/figma/FigmaApp.tsx
    - src/locales/pl.json
    - src/locales/en.json
    - src/locales/de.json
    - src/locales/uk.json
    - src/locales/ru.json
    - src/locales/ar.json

key-decisions:
  - "CTASection defined inline in FigmaApp.tsx (not a separate file) — single-use component, keeps related code co-located"
  - "CTASection placed after Contact section but before Footer in renderContent() return"
  - "mailto:kontakt@dwe.org.pl used directly in CTA contact button — no router dependency"

patterns-established:
  - "Hero layout: two-column grid with lg:grid-cols-2, Badge above h1, floating card via absolute positioning"
  - "CTA pattern: bg-primary full-width section with centered icon + heading + body + two buttons"

requirements-completed: [BRAND-02]

# Metrics
duration: 4min
completed: 2026-02-22
---

# Phase 2 Plan 2: Hero Redesign and CTA Section Summary

**Two-column Hero with Badge, floating accent card, and CTASection using bg-primary — all strings wired into all 6 locales (BRAND-02 satisfied)**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-02-22T00:00:00Z
- **Completed:** 2026-02-22T00:04:00Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Added 7 new i18n keys (hero.badge, hero.floatingLabel, hero.floatingValue, cta.heading, cta.body, cta.btnProjects, cta.btnContact) to all 6 locale files with correct per-language translations
- Redesigned Hero.tsx to two-column layout with shadcn Badge above heading, floating accent card overlaying image bottom-left, two action buttons
- Added CTASection inline in FigmaApp.tsx: dark bg-primary background, Heart icon, heading, body, projects button, mailto contact button
- BRAND-02 satisfied: Hero image uses local path `/images/locations/data/zdjecie-o-fundacji.jpg`, zero unsplash.com URLs

## Task Commits

Each task was committed atomically:

1. **Task 1: Add new i18n keys to all 6 locales** - `1cc7ecb` (feat)
2. **Task 2: Redesign Hero and add CTASection** - `81843bd` (feat)

## Files Created/Modified
- `src/components/figma/Hero.tsx` - Rewritten: two-column layout, Badge, floating accent card, local image path
- `src/components/figma/FigmaApp.tsx` - Added CTASection inline component with Heart icon and dark CTA background
- `src/locales/pl.json` - Added 7 new keys (canonical Polish)
- `src/locales/en.json` - Added 7 new keys (English translations)
- `src/locales/de.json` - Added 7 new keys (German translations)
- `src/locales/uk.json` - Added 7 new keys (Ukrainian translations)
- `src/locales/ru.json` - Added 7 new keys (Russian translations)
- `src/locales/ar.json` - Added 7 new keys (Arabic translations)

## Decisions Made
- CTASection defined inline in FigmaApp.tsx rather than as a separate file — it's a single-use component and co-location keeps the file structure simpler
- CTASection placed after the Contact section (inside renderContent) but before the Footer, so it appears at the bottom of the main page flow
- `mailto:kontakt@dwe.org.pl` used as a plain `<a href>` in CTA contact button — no router dependency needed for external email links

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
- The Write tool was immediately followed by an automated linter/formatter reset that reverted both Hero.tsx and FigmaApp.tsx to their original content. Detected via system-reminder notifications, files were re-written successfully on second attempt.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Hero redesign complete — homepage first impression improved with reference two-column layout
- CTASection provides clear call-to-action at bottom of homepage
- BRAND-02 requirement satisfied
- Plan 02-03 (meta tags, DevTools gate, BRAND-01 and BRAND-03) can proceed

---
*Phase: 02-content-polish*
*Completed: 2026-02-22*
