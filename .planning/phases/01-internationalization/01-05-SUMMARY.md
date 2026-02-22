---
phase: 01-internationalization
plan: 05
subsystem: ui
tags: [react-i18next, useTranslation, i18n, components, translation]

# Dependency graph
requires:
  - phase: 01-internationalization
    plan: 01
    provides: "Polish locale file (pl.json) with 59 translation keys covering all UI strings"
  - phase: 01-internationalization
    plan: 03
    provides: "I18nextProvider wired into root shell, language detection active"
provides:
  - "Hero, Navigation, Footer, Contact, AboutProjectPage, FoundersPage, ProjectsMap all use useTranslation() for UI strings"
  - "All visible Polish UI strings replaced with t('key') calls"
  - "Language switching now actually changes text across all 7 page sections"
affects:
  - 02-cms-integration
  - 03-deployment

# Tech tracking
tech-stack:
  added: []
  patterns: [useTranslation hook in every component for UI strings, people array moved inside component function to access t()]

key-files:
  created: []
  modified:
    - src/components/figma/Hero.tsx
    - src/components/figma/Navigation.tsx
    - src/components/figma/Footer.tsx
    - src/components/figma/Contact.tsx
    - src/components/figma/AboutProjectPage.tsx
    - src/components/figma/FoundersPage.tsx
    - src/components/figma/ProjectsMap.tsx

key-decisions:
  - "Project content data (projectsData array titles/descriptions/dates) left untranslated — CMS content translation is explicitly deferred per CONTEXT.md scope boundary"
  - "people array in FoundersPage moved inside component function to enable t() usage"
  - "map.noDescription and map.dateUnfilled keys used for CMS-sourced locations missing description/date fields"
  - "footer.brandName key used consistently in both footer brand area and copyright line"

patterns-established:
  - "useTranslation pattern: import at top, const { t } = useTranslation() inside function body, t('namespace.key') for every visible string"
  - "Arrays that need translation (menuItems, people) must be defined inside the component function, not at module level"

requirements-completed: [I18N-02, I18N-04]

# Metrics
duration: 6min
completed: 2026-02-22
---

# Phase 1 Plan 5: Component i18n Wiring Summary

**useTranslation() wired into all 7 UI components — language switching now changes text site-wide across Hero, Navigation, Footer, Contact, AboutProjectPage, FoundersPage, and ProjectsMap**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-22T13:52:54Z
- **Completed:** 2026-02-22T13:58:54Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- All 7 figma components now call `useTranslation()` and use `t('key')` for every visible UI string
- Navigation menuItems array moved inside component function to enable reactive translation
- FoundersPage people array moved inside component function so descriptions use t() per person
- ProjectsMap UI labels (heading, subheading, loading spinner, participants, date, location, projectList, people, noDescription, dateUnfilled) all translated; hardcoded project content data preserved as out-of-scope

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire useTranslation into Hero, Navigation, Footer, Contact** - `258befb` (feat)
2. **Task 2: Wire useTranslation into AboutProjectPage, FoundersPage, ProjectsMap** - `f02f312` (feat)

## Files Created/Modified
- `src/components/figma/Hero.tsx` - Added useTranslation; all 8 strings replaced with t('hero.*') keys
- `src/components/figma/Navigation.tsx` - Added useTranslation; menuItems moved inside function using t('nav.*'); foundation text and Dokumenty button translated
- `src/components/figma/Footer.tsx` - Added useTranslation; all nav links, section headings, brand name, tagline, copyright translated
- `src/components/figma/Contact.tsx` - Added useTranslation; heading and CardTitle use t('contact.*')
- `src/components/figma/AboutProjectPage.tsx` - Added useTranslation; heading and full body text sourced via t('aboutProject.*')
- `src/components/figma/FoundersPage.tsx` - Added useTranslation; people array moved inside function; heading, subtitle, and all 5 person descriptions translated
- `src/components/figma/ProjectsMap.tsx` - Added useTranslation; 10 UI labels translated; projectsData content preserved untranslated per scope boundary

## Decisions Made
- Project content data (projectsData array — titles, descriptions, dates) left untranslated. CMS content translation is explicitly deferred per CONTEXT.md scope boundary; these are data fields not UI chrome.
- `map.noDescription` and `map.dateUnfilled` translation keys used when populating Project objects from CMS locations that lack description/date, making even those fallback strings translatable.
- `footer.brandName` used consistently in the brand display area and copyright suffix line.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing TypeScript errors in keystatic-base, leaflet CDN import, and other unrelated files confirmed out-of-scope per STATE.md. No new TypeScript errors were introduced by this plan's changes.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Full i18n pipeline complete: locale files (Plan 01) + provider (Plan 03) + component wiring (Plan 05)
- Language switching is now fully functional across all visible UI sections
- Ready for Phase 2 CMS integration — editors can update content; UI strings translate based on browser locale
- Project content data translation remains deferred until CMS is integrated (Phase 2)

---
*Phase: 01-internationalization*
*Completed: 2026-02-22*
