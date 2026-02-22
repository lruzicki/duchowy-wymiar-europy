# Requirements: Duchowy Wymiar Europy

**Defined:** 2026-02-22
**Core Value:** Visitors from across Europe can discover the organization's projects on an interactive map and read about them in their native language.

## Validated (Existing)

- ✓ Interactive Leaflet map with location pins — existing
- ✓ Keystatic CMS admin interface at /keystatic — existing
- ✓ TanStack Start SSR framework with file-based routing — existing
- ✓ Pages: home, dezyderata, timeline, contact — existing
- ✓ UI components library (Radix UI + Tailwind) — existing

## v1 Requirements

### Internationalization

- [x] **I18N-01**: Site auto-detects browser language and displays content in the matching language (PL, EN, DE, UK, RU, AR), falling back to Polish
- [x] **I18N-02**: Polish is the master language; all 6 language strings defined in translation files
- [x] **I18N-03**: Arabic layout renders correctly with RTL text direction
- [x] **I18N-04**: All visible UI text, section headings, and navigation labels are translated in all 6 languages

### Content Management

- [ ] **CMS-01**: Keystatic `locations` collection supports an array of images per entry (replaces single coverImage field)
- [ ] **CMS-02**: Clicking a map pin opens a popup dialog with an image carousel (prev/next navigation)
- [ ] **CMS-03**: All hardcoded project data removed from source code and replaced with Keystatic-managed content
- [ ] **CMS-04**: Keystatic configured for GitHub storage mode so content edits save as Git commits
- [ ] **CMS-05**: GitHub OAuth credentials wired so Keystatic admin works on Vercel deployment

### Site Branding & Polish

- [ ] **BRAND-01**: Page `<title>`, meta description, and Open Graph tags updated to "Duchowy Wymiar Europy"
- [ ] **BRAND-02**: Placeholder Unsplash images removed; image slots managed via Keystatic (empty until filled by editors)
- [ ] **BRAND-03**: DevTools (TanStack React DevTools, Router DevTools) disabled in production builds via environment check

### Deployment

- [ ] **DEPLOY-01**: Code pushed to GitHub repository
- [ ] **DEPLOY-02**: Vercel project configured and site live at a public URL
- [ ] **DEPLOY-03**: Keystatic environment variables (KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET) documented and set in Vercel dashboard

## v2 Requirements

### Contact
- **CONTACT-01**: Contact form sends email to organization address via email service (e.g., Resend)

### Admin Security
- **ADMIN-01**: Keystatic admin protected — only authorized editors can access /keystatic

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form email delivery | Deferred to v2 |
| Mobile app | Web-first |
| Real-time features | Not needed for an informational site |
| Authentication beyond GitHub OAuth | Keystatic admin auth via GitHub OAuth is sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| I18N-01 | Phase 1 | In progress (01-02: locale detection) |
| I18N-02 | Phase 1 | Complete |
| I18N-03 | Phase 1 | In progress (01-02: locale detection) |
| I18N-04 | Phase 1 | Complete |
| CMS-01 | Phase 2 | Pending |
| CMS-02 | Phase 2 | Pending |
| CMS-03 | Phase 2 | Pending |
| CMS-04 | Phase 2 | Pending |
| CMS-05 | Phase 2 | Pending |
| BRAND-01 | Phase 2 | Pending |
| BRAND-02 | Phase 2 | Pending |
| BRAND-03 | Phase 2 | Pending |
| DEPLOY-01 | Phase 3 | Pending |
| DEPLOY-02 | Phase 3 | Pending |
| DEPLOY-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-22*
*Last updated: 2026-02-22 — 01-02 complete: detectLocale utility (I18N-01, I18N-03 in progress)*
