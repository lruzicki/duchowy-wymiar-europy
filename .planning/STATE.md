# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-22)

**Core value:** Visitors from across Europe can discover the organization's projects on an interactive map and read about them in their native language.
**Current focus:** Phase 2 — Content & Polish

## Current Position

Phase: 2 of 3 (Content & Polish)
Plan: 3 of 5 completed in phase 2
Status: In progress
Last activity: 2026-02-22 — Plan 02-01 complete (Keystatic schema extended with images array, city/country/date, github storage; getLocations() updated; .env.example created; CMS-01, CMS-04, CMS-05 Phase 2 portion satisfied)

Progress: [████████░░] 40%

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: ~5 min
- Total execution time: ~0.65 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-internationalization | 6 | ~33 min | ~5.5 min |
| 02-content-polish | 3 | ~13 min | ~4.3 min |

**Recent Trend:**
- Last 6 plans: 01-01 (~7 min), 01-02 (~7 min), 01-03 (~5 min), 01-04 (~8 min), 01-05 (~6 min), 01-06 (~2 min)
- Phase 2 start: 02-01 (~4 min), 02-02 (~4 min)
- Trend: On track

*Updated after each plan completion*
| Phase 01-internationalization P01 | 45 | 2 tasks | 9 files |
| Phase 01-internationalization P03 | 5 | 1 task | 1 file |
| Phase 01-internationalization P04 | 8 | 2 tasks | 3 files |
| Phase 01-internationalization P05 | 6 | 2 tasks | 7 files |
| Phase 02-content-polish P01 | 7 | 3 tasks | 4 files |
| Phase 02-content-polish P02 | 4 | 2 tasks | 8 files |
| Phase 02-content-polish P03 | 5 | 2 tasks | 1 file |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Auto-detect language only, no switcher — browser locale determines language
- Polish is master translation language — all other languages translated from Polish
- Keystatic GitHub mode required — Vercel serverless cannot persist local filesystem writes
- Image carousel in pin popup — multiple images per location, matches existing dialog pattern
- Move hardcoded data to Keystatic — editors update content without touching code
- Created dedicated vitest.config.ts (node environment) — TanStack Start/nitro plugins caused Vite server hang after tests
- Pre-existing TypeScript errors in keystatic-base and figma components are out of scope for Phase 1
- [Phase 01-internationalization]: Polish master translation with 59 keys covers all UI strings; typographic quotes replaced with guillemets to avoid JSON parsing issues
- [Phase 01-internationalization Plan 03]: I18nextProvider in shellComponent (RootDocument) — SSR guard with typeof navigator, synchronous changeLanguage before render, html dir='rtl' for Arabic
- [Phase 01-internationalization Plan 04]: shadcn/ui DropdownMenu created manually using radix-ui package (CLI timeout); emoji flags for language icons (no icon library needed)
- [Phase 01-internationalization Plan 05]: Project content data (projectsData titles/descriptions) left untranslated — CMS content translation deferred per scope boundary; arrays needing t() must be inside component function, not module level
- [Phase 01-internationalization Plan 06]: Phase 1 success criteria all confirmed by human visual inspection — no code changes required at verification stage
- [Phase 02-content-polish Plan 02]: CTASection defined inline in FigmaApp.tsx (not a separate file) — single-use component, co-location keeps structure simpler; mailto:kontakt@dwe.org.pl used as plain anchor for CTA contact button
- [Phase 02-content-polish Plan 03]: import.meta.env.DEV wraps TanStackDevtools render — imports kept unconditional, tree-shaken by @tanstack/devtools-vite plugin at build time
- [Phase 02-content-polish Plan 01]: fields.array(fields.image()) confirmed working in @keystatic/core 0.5.48; item.entry requires double cast (as unknown as) for partial shape typing; coverImage removed entirely in favor of images array

### Pending Todos

None.

### Blockers/Concerns

- GitHub OAuth App not yet created (needed for DEPLOY-03 / CMS-05) — must be set up before Vercel deployment can complete
- Leaflet icon setup is duplicated in two files — worth consolidating during Phase 2 cleanup

## Session Continuity

Last session: 2026-02-22
Stopped at: Completed 02-01-PLAN.md (Keystatic schema extension — images array, city/country/date, github storage, getLocations updated, .env.example created)
Resume file: None
