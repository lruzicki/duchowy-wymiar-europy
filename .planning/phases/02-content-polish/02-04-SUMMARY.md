---
phase: 02-content-polish
plan: 04
subsystem: ui
tags: [tanstack-router, leaflet, keystatic, react-i18next, image-carousel]

# Dependency graph
requires:
  - phase: 02-content-polish/02-01
    provides: getLocations() server function and Keystatic schema with images/city/country/date
  - phase: 02-content-polish/02-02
    provides: CTA section and locale file structure established
provides:
  - getLocationBySlug server function for individual location lookup
  - /locations/$slug TanStack Router route with image carousel
  - Refactored ProjectsMap using CMS data exclusively (no hardcoded arrays)
  - 5 new i18n keys in all 6 locale files (map.seeMore, map.noLocations, location.backToMap, location.noImages, location.notFound)
affects: [03-deployment, future-content-editing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - TanStack Router dynamic route using locations.$slug.tsx file naming convention
    - getLocationBySlug uses inputValidator (not validator) — correct API for @tanstack/react-start@1.160.0
    - Leaflet popup with plain HTML anchor for /locations/[slug] navigation
    - normalizeImagePath helper strips public/ prefix from Keystatic image paths

key-files:
  created:
    - src/routes/locations.$slug.tsx
  modified:
    - src/lib/locations.ts
    - src/components/figma/ProjectsMap.tsx
    - src/routeTree.gen.ts
    - src/locales/pl.json
    - src/locales/en.json
    - src/locales/de.json
    - src/locales/uk.json
    - src/locales/ru.json
    - src/locales/ar.json

key-decisions:
  - "inputValidator not validator — @tanstack/react-start@1.160.0 uses .inputValidator() API for typed server function inputs"
  - "routeTree.gen.ts updated manually — dev server auto-regenerates it on first start; manual update ensures TypeScript compiles clean immediately"
  - "normalizeImagePath added to both getLocations and getLocationBySlug for consistency — strips public/ prefix from Keystatic image paths"
  - "HTML entity &#8594; used for arrow in Leaflet popup (HTML string context, not JSX)"

patterns-established:
  - "TanStack dynamic routes: file named locations.$slug.tsx creates /locations/:slug route"
  - "Server function with input: createServerFn({ method: 'GET' }).inputValidator(fn).handler(fn) pattern"
  - "Leaflet popup links: plain HTML anchor in template literal, navigates to /locations/[slug]"

requirements-completed: [CMS-02, CMS-03, BRAND-02]

# Metrics
duration: 8min
completed: 2026-02-22
---

# Phase 02 Plan 04: CMS-Driven Map with Location Detail Pages Summary

**Hardcoded projectsData array removed, Leaflet popup links to /locations/[slug] detail pages with image carousel, all 6 locale files extended with 5 new map/location keys**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-22T19:25:55Z
- **Completed:** 2026-02-22T19:34:39Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Removed 6-entry hardcoded projectsData array and all Unsplash URLs from ProjectsMap.tsx — map now exclusively uses CMS data from getLocations()
- Created /locations/$slug TanStack Router route with image carousel (prev/next buttons, counter badge) and back-to-map link
- Added getLocationBySlug server function to locations.ts with correct inputValidator API and normalizeImagePath helper
- Extended all 6 locale files (pl, en, de, uk, ru, ar) with 5 new translation keys

## Task Commits

Each task was committed atomically:

1. **Task 1: Add getLocationBySlug and refactor ProjectsMap to CMS-only** - `448cc10` (feat)
2. **Task 2: Create /locations/[slug] route with image carousel** - `e4dc4dc` (feat)
3. **Task 3: Add map and location i18n keys to all 6 locale files** - `0e83634` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/lib/locations.ts` - Added getLocationBySlug server function and normalizeImagePath helper; applied path normalization to getLocations too
- `src/components/figma/ProjectsMap.tsx` - Removed hardcoded projectsData, Dialog, and all Unsplash URLs; Leaflet popup with "See more" link; sidebar cards navigate to /locations/[slug]
- `src/routes/locations.$slug.tsx` - New TanStack Router dynamic route: image carousel, location metadata badges, back-to-map link, LocationNotFound errorComponent
- `src/routeTree.gen.ts` - Added /locations/$slug route entry (normally auto-generated; manually updated for immediate TypeScript correctness)
- `src/locales/pl.json` - Added map.seeMore, map.noLocations, location.backToMap, location.noImages, location.notFound
- `src/locales/en.json` - Added 5 new keys (English translations)
- `src/locales/de.json` - Added 5 new keys (German translations)
- `src/locales/uk.json` - Added 5 new keys (Ukrainian translations)
- `src/locales/ru.json` - Added 5 new keys (Russian translations)
- `src/locales/ar.json` - Added 5 new keys (Arabic translations)

## Decisions Made
- **inputValidator not validator**: The installed version of @tanstack/react-start is 1.160.0 (resolved higher than 1.132.0 in package.json). The correct API is `.inputValidator()` not `.validator()` — adjusted accordingly (Rule 1 auto-fix during Task 1).
- **Manual routeTree.gen.ts update**: The route tree is normally auto-generated by the Vite plugin at dev-server start. Updated manually so TypeScript compiles clean without requiring a server start first.
- **normalizeImagePath in both functions**: Applied the public/ prefix stripping consistently in both getLocations and getLocationBySlug for parity.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used inputValidator instead of validator for server function**
- **Found during:** Task 1 (TypeScript check after writing getLocationBySlug)
- **Issue:** Plan's code example used `.validator()` but the installed @tanstack/react-start@1.160.0 exposes `.inputValidator()` — `.validator()` does not exist on `ServerFnBuilder`
- **Fix:** Changed `.validator((slug: string) => slug)` to `.inputValidator((slug: string) => slug)` and `{ data: slug }` parameter type confirmed correct
- **Files modified:** src/lib/locations.ts
- **Verification:** `pnpm tsc --noEmit` passes with no errors on src/lib/locations.ts
- **Committed in:** 448cc10 (Task 1 commit)

**2. [Rule 1 - Bug] Added double cast (as unknown as) for Keystatic entry in getLocationBySlug**
- **Found during:** Task 1 (TypeScript check)
- **Issue:** `reader.collections.locations.read()` returns a typed entry that can't be directly cast to partial shape — needs `as unknown as` double cast (same pattern already used in getLocations)
- **Fix:** Changed `entry as {` to `entry as unknown as {`
- **Files modified:** src/lib/locations.ts
- **Verification:** TypeScript error on line 127 resolved
- **Committed in:** 448cc10 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 - Bug)
**Impact on plan:** Both auto-fixes essential for TypeScript correctness. No scope creep. Code semantically identical to plan's intent.

## Issues Encountered
- routeTree.gen.ts requires dev server to auto-regenerate — manually updating it in the same commit ensures TypeScript compiles clean during CI/code review without needing to spin up the dev server first. The auto-generation will overwrite the manual update on next dev server start, which is expected behavior.

## Next Phase Readiness
- CMS-02 (image carousel on location pages), CMS-03 (hardcoded data removed), BRAND-02 (no Unsplash URLs) all satisfied
- /locations/$slug route functional and wired to Keystatic CMS via getLocationBySlug
- All 6 locale files have the new keys; location pages fully i18n-translated
- Phase 2 plan 05 (if any) can build on the location detail page foundation

---
*Phase: 02-content-polish*
*Completed: 2026-02-22*
