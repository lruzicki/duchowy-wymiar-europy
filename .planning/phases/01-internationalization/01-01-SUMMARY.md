---
phase: 01-internationalization
plan: 01
subsystem: ui
tags: [i18next, react-i18next, i18n, translations, localization, json]

# Dependency graph
requires: []
provides:
  - i18next instance configured with 6 languages (pl/en/de/uk/ru/ar)
  - Polish master translation file with 59 UI string keys
  - Complete translation files for all 6 languages with identical key sets
  - TypeScript-importable JSON locale modules
affects:
  - 01-02 (language detection - needs i18n instance)
  - 01-03 (component wiring - needs translation keys)
  - all future plans that display UI text

# Tech tracking
tech-stack:
  added: [i18next@25.8.13, react-i18next@16.5.4]
  patterns:
    - Flat namespaced keys (e.g. nav.about, hero.body1, map.loading)
    - Polish as master language and fallbackLng
    - Static JSON imports in i18n.ts (SSR-safe, no dynamic loading)
    - Single translation namespace per language file

key-files:
  created:
    - src/lib/i18n.ts
    - src/locales/pl.json
    - src/locales/en.json
    - src/locales/de.json
    - src/locales/uk.json
    - src/locales/ru.json
    - src/locales/ar.json
  modified:
    - package.json
    - pnpm-lock.yaml
    - tsconfig.json

key-decisions:
  - "Polish is master translation language - all other languages translated from Polish"
  - "Static JSON imports (not dynamic) in i18n.ts for SSR compatibility"
  - "No i18next-browser-languagedetector plugin - language detection deferred to Plan 02"
  - "resolveJsonModule: true added to tsconfig.json for JSON module imports"
  - "Typographic quotes replaced with guillemets in long-form body text to avoid JSON escaping issues"

patterns-established:
  - "Key naming: {component}.{element} flat namespace (nav.about, hero.title, map.loading)"
  - "Body text: multiline strings using \\n escape sequences within single JSON value"
  - "Proper nouns (founder names) kept in original Polish even in translated files"

requirements-completed: [I18N-01, I18N-02, I18N-04]

# Metrics
duration: 45min
completed: 2026-02-22
---

# Phase 1 Plan 1: i18n Foundation Summary

**react-i18next installed with 6-language support (pl/en/de/uk/ru/ar), Polish master translation (59 keys), and complete translations covering all visible UI strings**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-02-22T00:00:00Z
- **Completed:** 2026-02-22T00:45:00Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Installed react-i18next 16.5.4 and i18next 25.8.13 with pnpm
- Created `src/lib/i18n.ts` exporting initialized i18next instance with all 6 locales, Polish as default and fallback, SSR-safe configuration
- Created Polish master translation file with 59 keys covering Navigation, Hero, Footer, Contact, AboutProject, Founders, and Map components
- Created 5 translated files (en/de/uk/ru/ar) all with identical 59-key sets; Arabic contains actual right-to-left Arabic script

## Task Commits

Each task was committed atomically:

1. **Task 1: Install react-i18next and create i18n config** - `9fb8197` (feat)
2. **Task 2: Create Polish master translation file and all 5 translations** - `38d6adf` (feat)

**Plan metadata:** *(to be filled after final metadata commit)*

## Files Created/Modified
- `src/lib/i18n.ts` - i18next instance configured with all 6 locales, Polish default/fallback, SSR-safe
- `src/locales/pl.json` - Polish master translations (59 keys, 61 lines)
- `src/locales/en.json` - English translations (59 keys)
- `src/locales/de.json` - German translations (59 keys)
- `src/locales/uk.json` - Ukrainian translations (59 keys, Cyrillic script)
- `src/locales/ru.json` - Russian translations (59 keys, Cyrillic script)
- `src/locales/ar.json` - Arabic translations (59 keys, RTL Arabic script)
- `package.json` - Added i18next and react-i18next dependencies
- `tsconfig.json` - Added resolveJsonModule: true

## Decisions Made
- Polish as default and fallback language (matches project decision from STATE.md)
- Static JSON imports instead of dynamic `import()` to ensure SSR compatibility
- No language detection plugin - deferred to Plan 02 custom detectLocale utility
- `resolveJsonModule: true` added to tsconfig to enable JSON imports
- Typographic opening/closing quotes in long-form text replaced with guillemets (`«»`) to avoid JSON string termination issues caused by U+201C characters being stored as ASCII `"`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed invalid JSON caused by typographic quotes in body text**
- **Found during:** Task 2 (Create Polish master translation and all 5 translations)
- **Issue:** The `aboutProject.body` key in pl.json and de.json contained typographic right double quotation marks (`"`, U+201C) used around the book title, which were stored as ASCII `"` (U+0022), prematurely terminating the JSON string value
- **Fix:** Replaced `„Księgi..."` and `„Buches..."` notation with guillemet quotes `«...»` to avoid any ASCII double-quote character inside JSON string values
- **Files modified:** src/locales/pl.json, src/locales/de.json
- **Verification:** `node -e "require('./src/locales/pl.json')"` runs without error; all 6 files pass JSON.parse
- **Committed in:** 38d6adf (Task 2 commit)

**2. [Rule 3 - Blocking] Added resolveJsonModule to tsconfig.json**
- **Found during:** Task 1 (TypeScript compilation check)
- **Issue:** TypeScript was trying to parse JSON files as TypeScript source, producing cascading TS1005/TS1136 errors on the de.json body line
- **Fix:** Added `"resolveJsonModule": true` to tsconfig.json compilerOptions
- **Files modified:** tsconfig.json
- **Verification:** `pnpm tsc --noEmit` produces no errors on src/lib/i18n.ts or src/locales/
- **Committed in:** 9fb8197 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both fixes essential for correctness and compilation. No scope creep.

## Issues Encountered
- Pre-existing TypeScript errors in unrelated files (keystatic-base/, leaflet types, Header.tsx) — logged to deferred-items per scope boundary rule. All errors in new files resolved.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- i18n foundation complete: i18next instance ready to import, all translations available
- Plan 02 (language detection) can import `i18n` from `src/lib/i18n.ts` and call `i18n.changeLanguage()`
- Plan 03 (component wiring) can use `useTranslation()` hook to replace hardcoded strings with `t('key')` calls

---
*Phase: 01-internationalization*
*Completed: 2026-02-22*
