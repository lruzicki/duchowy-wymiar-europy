# Duchowy Wymiar Europy

## What This Is

A multilingual NGO website for the "Spiritual Dimension of Europe" organization, built with TanStack Start, React, Keystatic CMS, and deployed on Vercel. The site features an interactive map of project locations/pins, organizational content pages (dezyderata, timeline, contact), and a content management admin powered by Keystatic in GitHub mode so editors can update content without code changes.

## Core Value

Visitors from across Europe can discover the organization's projects on an interactive map and read about them in their native language — Polish, English, German, Ukrainian, Russian, or Arabic.

## Requirements

### Validated

- ✓ Interactive map with location pins — existing
- ✓ Keystatic CMS admin interface at /keystatic — existing
- ✓ TanStack Start SSR framework — existing
- ✓ Pages: home, dezyderata, timeline, contact — existing
- ✓ Codebase mapped — 2026-02-22

### Active

- [ ] Auto-detect browser language and display site in one of: Polish, English, German, Ukrainian, Russian, Arabic (fall back to English)
- [ ] Polish is the master translation language; all other languages translated from Polish
- [ ] Keystatic locations collection supports multiple images per pin (image array)
- [ ] Clicking a map pin opens a popup/dialog with an image carousel/gallery
- [ ] All hardcoded project data removed and moved to Keystatic CMS
- [ ] Page title and meta updated to "Duchowy Wymiar Europy"
- [ ] Placeholder Unsplash images removed; images managed via Keystatic
- [ ] Keystatic configured for GitHub storage mode (edits saved as Git commits)
- [ ] GitHub repository set up and code pushed
- [ ] Vercel deployment configured and live
- [ ] Site fully functional with no console errors, no placeholder content visible to users
- [ ] DevTools disabled in production builds

### Out of Scope

- Contact form email delivery — deferred to future milestone
- Language switcher UI control — auto-detect only
- Authentication/login for admin — Keystatic auth handled via GitHub OAuth
- Mobile app — web-first
- Comments, bookmarks, social features — not this org's use case

## Context

This is a brownfield project — the core application structure, routing, map, and Keystatic integration are already built. The work is: polish, internationalization, Keystatic multi-image support, content cleanup, and deployment.

**Existing codebase state (from codebase map):**
- Hardcoded project data in `src/components/figma/ProjectsMap.tsx` (30+ entries)
- Placeholder Unsplash images throughout
- Page title still "TanStack Start Starter" in `src/routes/__root.tsx`
- Keystatic `locations` collection supports only one `coverImage` field
- No i18n library installed
- No GitHub Actions or deployment config
- DevTools bundled in all builds (needs environment guard)
- Leaflet icon setup duplicated in two files

**Keystatic GitHub mode requirements:**
- GitHub OAuth App (KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET)
- KEYSTATIC_SECRET environment variable
- Vercel environment variables configured

## Constraints

- **Tech stack**: TanStack Start + Keystatic — must stay with existing framework
- **Storage**: Keystatic GitHub mode for Vercel compatibility (serverless filesystem doesn't persist)
- **Languages**: Polish, English, German, Ukrainian, Russian, Arabic — RTL support needed for Arabic
- **Content ownership**: All real project content entered by organization via Keystatic admin after deployment

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Auto-detect language, no switcher | Simpler UX, user's browser already knows their language | — Pending |
| Polish as master translation language | Existing site text is in Polish | — Pending |
| Keystatic GitHub mode | Vercel serverless doesn't persist local filesystem writes | — Pending |
| Image carousel in pin popup | Multiple images per location, carouse matches existing dialog pattern | — Pending |
| Move hardcoded data to Keystatic | Eliminates need to touch code for content changes | — Pending |

---
*Last updated: 2026-02-22 after initialization*
