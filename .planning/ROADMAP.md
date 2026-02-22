# Roadmap: Duchowy Wymiar Europy

## Overview

This is a brownfield polish-and-ship project. The core application (map, Keystatic, pages, UI) already exists. Three phases take it from its current state to a live, multilingual, content-managed site: first wire in internationalization so all six languages work, then complete the content experience (multi-image map pins, Keystatic data migration, branding cleanup), then deploy to Vercel with GitHub storage mode active.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Internationalization** - All six languages (PL, EN, DE, UK, RU, AR) render correctly from browser auto-detection
- [ ] **Phase 2: Content & Polish** - Map pins show image carousels, all data in Keystatic, site branded and clean
- [ ] **Phase 3: Deployment** - Site live on Vercel with GitHub storage mode and all environment variables set

## Phase Details

### Phase 1: Internationalization
**Goal**: Visitors in any of the six supported languages see the site in their native language automatically, and can override via a language switcher in the navigation bar
**Depends on**: Nothing (first phase)
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04
**Success Criteria** (what must be TRUE):
  1. Opening the site with a German browser locale shows all UI text in German without any manual action
  2. Opening the site with an Arabic browser locale renders text right-to-left with no layout breakage
  3. All navigation labels, section headings, and visible UI strings are translated in all six languages (no untranslated Polish strings visible to non-Polish users)
  4. A browser locale not in the supported set (e.g. French) falls back to Polish
**Plans**: 6 plans

Plans:
- [x] 01-01-PLAN.md — Install react-i18next and create all 6 translation files (PL master)
- [x] 01-02-PLAN.md — TDD: locale detection utility (base-tag matching, ru-UA exception, Polish fallback)
- [x] 01-03-PLAN.md — Wire I18nextProvider in root layout with browser locale detection and Arabic RTL
- [x] 01-04-PLAN.md — Language switcher component (shadcn/ui dropdown + emoji flags) in Navigation
- [x] 01-05-PLAN.md — Translate all UI component strings with useTranslation()
- [x] 01-06-PLAN.md — Human verify: language switching, RTL, auto-detection, fallback

### Phase 2: Content & Polish
**Goal**: The map and site content are complete, clean, and managed entirely through Keystatic; homepage is redesigned with hero two-column layout and CTA section; site branding is correct
**Depends on**: Phase 1
**Requirements**: CMS-01, CMS-02, CMS-03, CMS-04, CMS-05, BRAND-01, BRAND-02, BRAND-03
**Success Criteria** (what must be TRUE):
  1. Clicking a map pin opens a minimal popup with a link to a dedicated location page showing an image carousel with prev/next navigation
  2. No hardcoded project data exists in source code — all location entries come from Keystatic
  3. No Unsplash placeholder images are visible anywhere on the site
  4. The browser tab, meta description, and any shared link preview show "Duchowy Wymiar Europy" (not "TanStack Start Starter")
  5. TanStack DevTools panels do not appear in a production build
**Plans**: 5 plans

Plans:
- [ ] 02-01-PLAN.md — Extend Keystatic schema (images array, city, country, date) and switch to GitHub storage mode
- [x] 02-02-PLAN.md — Hero redesign (two-column, badge, floating card) and CTA section with i18n strings
- [x] 02-03-PLAN.md — Branding meta tags (title, description, OG) and DevTools dev-only gate
- [ ] 02-04-PLAN.md — Refactor ProjectsMap to CMS-only data, create /locations/[slug] pages with image carousel
- [ ] 02-05-PLAN.md — Human verify: all Phase 2 requirements confirmed visually

### Phase 3: Deployment
**Goal**: The site is publicly accessible on Vercel with Keystatic GitHub mode fully operational
**Depends on**: Phase 2
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03
**Success Criteria** (what must be TRUE):
  1. The site loads at a public Vercel URL with no console errors
  2. An editor can log into /keystatic on the live site using GitHub OAuth and save a content change that results in a Git commit on the repository
  3. All required environment variables (KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET) are documented and confirmed set in the Vercel dashboard
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Internationalization | 6/6 | Complete | 2026-02-22 |
| 2. Content & Polish | 3/5 | In progress | - |
| 3. Deployment | 0/TBD | Not started | - |
