---
phase: 01-internationalization
plan: 03
subsystem: ui
tags: [i18next, react-i18next, i18n, locale-detection, tanstack-start, ssr]

# Dependency graph
requires:
  - phase: 01-01
    provides: i18next instance (src/lib/i18n.ts) and translation files
  - phase: 01-02
    provides: detectLocale() function and SupportedLocale type
provides:
  - I18nextProvider wrapping the entire app component tree
  - Locale detection from navigator.languages in root layout
  - RTL support via html dir='rtl' for Arabic, 'ltr' for all others
  - html lang attribute reflecting detected locale
affects:
  - all plans that use useTranslation() in components
  - 01-04 (Header i18n)
  - 01-05 and subsequent plans using t() calls

# Tech tracking
tech-stack:
  added: []
  patterns:
    - SSR-guarded locale detection (typeof navigator !== 'undefined' check)
    - I18nextProvider at shell-component level wrapping entire app
    - Synchronous i18n.changeLanguage() call on client before render

key-files:
  created: []
  modified:
    - src/routes/__root.tsx

key-decisions:
  - "I18nextProvider placed in shellComponent (RootDocument), not in a route component, so it wraps the entire app tree including all routes"
  - "Locale detection guarded with typeof navigator check to prevent SSR errors — server defaults to Polish"
  - "Synchronous i18n.changeLanguage() call (no useEffect) to ensure locale is set before first render"

patterns-established:
  - "SSR guard pattern: typeof navigator !== 'undefined' before any browser API access in root layout"
  - "Shell-level provider wrapping: I18nextProvider in RootDocument to ensure universal provider availability"

requirements-completed: [I18N-01, I18N-03]

# Metrics
duration: 5min
completed: 2026-02-22
---

# Phase 1 Plan 3: i18n Root Provider Wiring Summary

**I18nextProvider and navigator.languages-based locale detection wired into TanStack Start __root.tsx, with SSR guard, html lang/dir attributes, and Arabic RTL support**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-02-22T17:17:21Z
- **Completed:** 2026-02-22T17:22:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Modified `src/routes/__root.tsx` to import and use I18nextProvider, i18n instance, and detectLocale
- Added SSR-safe locale detection from navigator.languages with Polish fallback for server-side rendering
- Set html lang and dir attributes dynamically — Arabic browsers get dir='rtl', all others get dir='ltr'
- Wrapped children in I18nextProvider so all useTranslation() hooks in child components work correctly

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire I18nextProvider and locale detection in root layout** - `b3d322a` (feat)

**Plan metadata:** *(to be filled after final metadata commit)*

## Files Created/Modified
- `src/routes/__root.tsx` - Added I18nextProvider wrapper, locale detection from navigator.languages, SSR guard, html lang/dir attributes

## Decisions Made
- Implementation already present in __root.tsx before this plan executed (carried over from project codebase). Verified it meets all must_haves from the plan spec and committed.
- SSR guard uses synchronous pattern (not useEffect + useState) because TanStack Start shellComponent runs synchronously — useEffect would cause hydration mismatch.
- I18nextProvider placed in RootDocument (shellComponent) rather than in a route component to ensure the provider is available to all routes including the root-level layout.

## Deviations from Plan

None - plan executed exactly as written. The implementation in __root.tsx matches the plan spec:
- I18nextProvider wrapping children confirmed
- detectLocale used with navigator.languages.join(', ')
- SSR guard (typeof navigator !== 'undefined') present
- html lang={locale} and dir={locale === 'ar' ? 'rtl' : 'ltr'} present
- i18n.changeLanguage(locale) called on client
- All existing TanStackDevtools and Scripts elements preserved

## Issues Encountered

- Pre-existing TypeScript errors in unrelated files (keystatic-base, figma components, leaflet types) — confirmed out of scope per scope boundary rule. No TypeScript errors in src/routes/__root.tsx or any i18n-related files.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- I18nextProvider is active in app tree — all child components can call useTranslation() safely
- Locale detection works from navigator.languages — browser language preference is honored
- Arabic RTL support is in place at the document level
- Plans 01-04 and beyond can freely use t() calls and useTranslation() hooks

---
*Phase: 01-internationalization*
*Completed: 2026-02-22*

## Self-Check: PASSED

- FOUND: src/routes/__root.tsx
- FOUND: .planning/phases/01-internationalization/01-03-SUMMARY.md
- FOUND commit: b3d322a (feat: Wire I18nextProvider and locale detection in root layout)
