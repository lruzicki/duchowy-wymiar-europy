# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-22)

**Core value:** Visitors from across Europe can discover the organization's projects on an interactive map and read about them in their native language.
**Current focus:** Phase 1 — Internationalization

## Current Position

Phase: 1 of 3 (Internationalization)
Plan: 3 completed in current phase
Status: In progress
Last activity: 2026-02-22 — Plan 01-03 complete (i18n root provider wiring)

Progress: [██░░░░░░░░] 15%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: ~6 min
- Total execution time: ~0.28 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-internationalization | 3 | ~19 min | ~6 min |

**Recent Trend:**
- Last 5 plans: 01-01 (~7 min), 01-02 (~7 min), 01-03 (~5 min)
- Trend: On track

*Updated after each plan completion*
| Phase 01-internationalization P01 | 45 | 2 tasks | 9 files |
| Phase 01-internationalization P03 | 5 | 1 task | 1 file |

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

### Pending Todos

None.

### Blockers/Concerns

- GitHub OAuth App not yet created (needed for DEPLOY-03 / CMS-05) — must be set up before Vercel deployment can complete
- Leaflet icon setup is duplicated in two files — worth consolidating during Phase 2 cleanup

## Session Continuity

Last session: 2026-02-22
Stopped at: Completed 01-03-PLAN.md (i18n root provider wiring — I18nextProvider + locale detection)
Resume file: None
