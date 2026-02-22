# Codebase Concerns

**Analysis Date:** 2026-02-22

## Tech Debt

**Hardcoded Project Data:**
- Issue: Projects are hardcoded in `src/components/figma/ProjectsMap.tsx` (lines 30-109) rather than being managed through Keystatic CMS. This creates duplication and manual maintenance burden.
- Files: `src/components/figma/ProjectsMap.tsx`
- Impact: Any changes to project information require code edits. Two separate data sources (hardcoded and CMS locations) mean they can diverge. Scaling to many projects becomes unmaintainable.
- Fix approach: Move project data to Keystatic collection (similar to locations). Update schema to include all project fields (title, description, date, participants, images). Remove hardcoded projectsData array and fetch from CMS instead.

**Untyped Leaflet Integration:**
- Issue: Multiple `any` type assertions in map initialization (`src/components/figma/ProjectsMap.tsx` lines 113-114, 148, 167). Dynamic Leaflet import (line 145) uses ESM import without type safety.
- Files: `src/components/figma/ProjectsMap.tsx`
- Impact: Map functionality relies on runtime behavior. Type mismatches could cause silent failures. Refactoring Leaflet usage is risky without types.
- Fix approach: Create TypeScript type definitions for dynamically imported Leaflet. Replace `any` assertions with proper types. Consider using `react-leaflet` (already available via `src/components/locations-map.client.tsx`) consistently instead of direct Leaflet usage.

**Duplicated Leaflet Configuration:**
- Issue: Leaflet marker icon setup is duplicated in two files with slight differences: `src/components/locations-map.client.tsx` (lines 12-17) and `src/components/figma/ProjectsMap.tsx` (lines 148-153).
- Files: `src/components/locations-map.client.tsx`, `src/components/figma/ProjectsMap.tsx`
- Impact: Changes to Leaflet configuration require updates in multiple places. Risk of inconsistent behavior between map components.
- Fix approach: Extract Leaflet initialization to shared utility `src/lib/leaflet-setup.ts`. Both components import and call this setup function.

**Untyped Image Normalization Logic:**
- Issue: `normalizeImage()` in `src/lib/locations.ts` (lines 37-52) handles multiple image data formats with limited type information. The unknown types reflect Keystatic's flexible schema parsing.
- Files: `src/lib/locations.ts`
- Impact: Runtime errors possible if Keystatic returns unexpected image formats. Silent null returns on malformed data. Integration brittleness if Keystatic schema changes.
- Fix approach: Strengthen Keystatic schema validation. Consider using Zod or similar for runtime validation of location data after parsing.

## Known Bugs

**Form Submission Not Wired:**
- Symptoms: Contact form in `src/components/figma/Contact.tsx` only logs data to console; no actual email delivery or database storage.
- Files: `src/components/figma/Contact.tsx`
- Trigger: User fills contact form and clicks submit
- Workaround: None - contact form is non-functional
- Impact: User messages are lost. No indication to users that form is non-functional.

**Stale Title Metadata:**
- Symptoms: Page title remains "TanStack Start Starter" instead of organization-specific title.
- Files: `src/routes/__root.tsx` (line 18)
- Trigger: Browser tab title and SEO metadata are incorrect
- Workaround: None
- Impact: Poor SEO and brand confusion

**Account Number Exposed in Code:**
- Symptoms: Bank account number (dummy) is hardcoded in component source.
- Files: `src/components/figma/Contact.tsx` (line 16)
- Trigger: Account details visible in code and potentially in browser DevTools
- Impact: If real account number is used, it would be publicly exposed in source code. Current value appears to be placeholder but sets bad precedent.

**Missing Error Handling for Map Loading:**
- Symptoms: Map in `ProjectsMap` shows loading spinner but has no timeout or error fallback.
- Files: `src/components/figma/ProjectsMap.tsx` (lines 298-305)
- Trigger: Network failure during Leaflet CDN load, browser without CORS support, or slow connection
- Workaround: User must refresh page
- Impact: User sees infinite loading spinner with no resolution path.

## Security Considerations

**Unescaped HTML in Map Popups:**
- Risk: Map popups use string concatenation with innerHTML-like templates: `src/components/figma/ProjectsMap.tsx` (lines 173-179). User-provided location names could contain HTML/script tags.
- Files: `src/components/figma/ProjectsMap.tsx`
- Current mitigation: TanStack Router and React provide some XSS protection by default, but direct Leaflet popup HTML bypasses React's sanitization.
- Recommendations: Use Leaflet's DOM manipulation APIs (createPopup with element instead of HTML string). Sanitize location.name through DOMPurify if using HTML strings.

**Development Tools in Production:**
- Risk: TanStack DevTools and React DevTools are bundled and active in all builds (lines 39-49 in `src/routes/__root.tsx`).
- Files: `src/routes/__root.tsx`
- Current mitigation: DevTools hidden behind overlay toggle, but still loaded and accessible
- Recommendations: Conditionally load DevTools only in development. Use environment variables to disable in production builds. Remove `@tanstack/react-devtools` from dependencies if not needed in production.

**No Input Validation on Contact Form:**
- Risk: Contact form accepts any input with no client-side validation. Email field not validated.
- Files: `src/components/figma/Contact.tsx`
- Current mitigation: Form doesn't actually submit anywhere (bug), so no backend attack surface yet
- Recommendations: Add client-side email validation and length checks. When form is wired to backend, add server-side validation and CSRF protection.

**External Image URLs Without Verification:**
- Risk: Project images loaded from arbitrary URLs (unsplash.com in hardcoded data). No origin verification or CORS validation.
- Files: `src/components/figma/ProjectsMap.tsx`
- Current mitigation: Unsplash is trusted third party, but pattern is replicable with untrusted sources
- Recommendations: Host images locally or use CDN with access control. Validate image URLs against whitelist.

## Performance Bottlenecks

**Leaflet Loaded Twice:**
- Problem: Maps in different views may load Leaflet separately. `ProjectsMap` uses direct dynamic import; `LocationsMapClient` uses `react-leaflet` module import.
- Files: `src/components/figma/ProjectsMap.tsx`, `src/components/locations-map.client.tsx`
- Cause: No shared Leaflet initialization strategy. Two different loading approaches.
- Improvement path: Consolidate to single map component library. Lazy-load maps below the fold to defer Leaflet CDN requests.

**Heavy Unsplash Image URLs:**
- Problem: ProjectsMap uses full-resolution Unsplash images without size optimization. Images served with query params suggest Unsplash API but no format/quality optimization.
- Files: `src/components/figma/ProjectsMap.tsx` (lines 40-107)
- Cause: Direct unsplash.com URLs without width/format parameters
- Improvement path: Add image size parameters (`&w=800&fm=webp`) to Unsplash URLs. Consider caching or serving thumbnails. Implement lazy loading for off-screen images.

**No Pagination on Large Location Lists:**
- Problem: If Keystatic grows to hundreds of locations, all are loaded in memory and rendered in map popups and sidebar.
- Files: `src/components/figma/ProjectsMap.tsx` (lines 250-284)
- Cause: All projects rendered in ScrollArea; no pagination or virtual scrolling
- Improvement path: Implement virtual scrolling with `@tanstack/react-virtual` for sidebar. Add map-based clustering for large datasets.

**Inline Styles in Map Popups:**
- Problem: Popup content uses inline style strings (lines 173-178) regenerated on every render.
- Files: `src/components/figma/ProjectsMap.tsx`
- Cause: String concatenation for popup HTML instead of reusable components
- Improvement path: Memoize popup content or use Leaflet's native popup APIs with DOM elements.

## Fragile Areas

**Map Component State Management:**
- Files: `src/components/figma/ProjectsMap.tsx`
- Why fragile: Multiple ref-based state (mapInstanceRef, markersRef) manually synchronized with React state. useEffect dependencies not exhaustive (line 204 missing mapInstanceRef dependency). Map instance cleanup has race conditions (lines 198-203).
- Safe modification: Add exhaustive dependency tracking. Use custom hook to encapsulate map lifecycle. Add timeout for map cleanup to prevent zombie maps.
- Test coverage: No tests for map initialization, marker updates, or popup interactions.

**Location Data Normalization:**
- Files: `src/lib/locations.ts`
- Why fragile: Multiple fallback chains for image extraction (lines 37-52) with undefined behavior if data shape changes. normalizeLocationName tries three different field paths (lines 26-35) but has unclear precedence.
- Safe modification: Document expected Keystatic schema explicitly. Add schema validation at read time. Consider stricter Keystatic types.
- Test coverage: No tests for normalization logic with malformed data.

**ScrollToSection Logic:**
- Files: `src/components/figma/FigmaApp.tsx`
- Why fragile: Scroll offset calculation (line 28) is hardcoded to 80px. Section IDs hardcoded as strings (lines 45, 52, 75-83). useEffect has currentPage in dependency array but handler references it (line 62), creating stale closure risk.
- Safe modification: Extract scroll offset to constant. Use enum for section IDs. Refactor scroll handler to avoid dependency on currentPage state.
- Test coverage: No tests for scroll behavior or section tracking.

## Scaling Limits

**No Database for Content:**
- Current capacity: Keystatic local file storage can handle ~1000 locations practically. File I/O becomes slow at scale.
- Limit: Beyond 100-200 locations with images, read times increase significantly. No horizontal scaling.
- Scaling path: Migrate to Keystatic with remote storage (GitHub, S3) or use traditional database (PostgreSQL + CMS). Implement caching layer.

**Map Performance with Many Markers:**
- Current capacity: Leaflet can render 1000+ markers but performance degrades.
- Limit: ~500 markers before visible lag in pan/zoom. Memory usage grows linearly.
- Scaling path: Implement marker clustering (Leaflet.MarkerCluster). Implement viewport-based rendering (show only visible markers). Use WebGL rendering for high-density maps.

**Single Server Functions for Data Fetching:**
- Current capacity: `getLocations()` server function loads all data on every page load.
- Limit: No caching, no pagination, no filtering on server side.
- Scaling path: Implement server-side filtering, pagination, and caching. Consider real-time updates if locations change frequently.

## Dependencies at Risk

**Nitro Nightly:**
- Risk: Package.json specifies `"nitro": "npm:nitro-nightly@latest"` which pins to unstable nightly builds. Each pnpm install may pull different versions.
- Files: `package.json` (line 30)
- Impact: Build breaking changes, runtime errors, or security issues from nightly releases. No reproducibility without lock file guarantees.
- Migration plan: Pin to stable Nitro version: `"nitro": "^2.0.0"` (check latest stable). Document nightly usage if intentional for cutting-edge features.

**TanStack Router with Vite Plugin Complexity:**
- Risk: Multiple interdependent TanStack packages (`@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`). Version mismatches cause route generation failures.
- Files: `package.json` (lines 20, 23, 25), `vite.config.ts` (lines 3, 24)
- Impact: Plugin breaks route generation, requiring manual routeTree.gen.ts fixes. Tight coupling makes updates risky.
- Migration plan: Keep TanStack packages in sync. Test route generation after upgrades. Consider migration to Remix or Next.js if TanStack complexity becomes burden.

**Keystatic Early Stage:**
- Risk: `@keystatic/core@0.5.48` is pre-1.0 release. Breaking changes possible.
- Files: `package.json` (line 16), `keystatic.config.ts`
- Impact: Content schema migrations required for upgrades. No backwards compatibility guarantees.
- Migration plan: Pin to stable v0.5.x until 1.0 release. Plan content export strategy for emergency migration.

**Leaflet Dual Loading:**
- Risk: `react-leaflet` and direct `leaflet` imports may load Leaflet twice via CDN + npm.
- Files: `src/components/locations-map.client.tsx` (line 3), `src/components/figma/ProjectsMap.tsx` (line 145)
- Impact: Duplicate bundle sizes. Potential version mismatches between react-leaflet's bundled Leaflet and CDN version.
- Migration plan: Consolidate to react-leaflet for all maps. Remove CDN dynamic import. Or consolidate to vanilla Leaflet.

## Missing Critical Features

**No Content Moderation/Publishing Workflow:**
- Problem: Any location in Keystatic immediately appears on site. No draft/publish workflow.
- Blocks: Cannot prepare announcements without going live immediately.
- Recommendation: Add Keystatic publishing workflow (mark as draft). Implement server-side filtering for published-only content.

**No Analytics or Engagement Tracking:**
- Problem: No way to measure which projects are viewed or engaged with. Map clicks, form submissions, page visits not tracked.
- Blocks: Cannot understand user behavior or improve marketing.
- Recommendation: Add Google Analytics or Plausible. Track map interactions and contact form submissions.

**No Error Boundary or Fallback UI:**
- Problem: Any runtime error in components crashes entire page.
- Blocks: Users see blank screen on any error.
- Recommendation: Add React Error Boundary in root route. Implement fallback error page with retry option.

**No Internationalization (i18n):**
- Problem: All content hardcoded in Polish. No language switching.
- Blocks: Non-Polish speakers cannot use site.
- Recommendation: Use `next-intl` or `i18next`. Create English translations. Add language switcher.

## Test Coverage Gaps

**No Tests for Core Functionality:**
- What's not tested: Map rendering, location data fetching, scroll behavior, form interactions
- Files: `src/components/figma/ProjectsMap.tsx`, `src/lib/locations.ts`, `src/components/figma/FigmaApp.tsx`, `src/components/figma/Contact.tsx`
- Risk: Refactoring map code may silently break marker rendering. Location normalization bugs not caught. Contact form wiring never verified to work.
- Priority: High - Core business logic lacks coverage

**No Tests for Data Transformation:**
- What's not tested: normalizeImage, normalizeLocationName, location data filtering
- Files: `src/lib/locations.ts`
- Risk: Malformed Keystatic data could pass through undetected. Image URLs with unexpected formats cause silent failures.
- Priority: High - Data quality directly impacts user experience

**No Server Function Integration Tests:**
- What's not tested: getLocations server function, loader data passing to components
- Files: `src/lib/locations.ts`, `src/routes/index.tsx`
- Risk: Server-client data contract broken without warning. Keystatic path changes cause runtime errors.
- Priority: Medium - Integration layer critical for reliability

**No E2E Tests:**
- What's not tested: Complete user flows (browse map, view project details, submit contact form)
- Files: All route and component files
- Risk: Cannot verify app works end-to-end in real browser environment.
- Priority: Medium - E2E catches issues integration tests miss

**No Performance Tests:**
- What's not tested: Map load time with 100+ locations, bundle size, lighthouse scores
- Files: All files
- Risk: Performance regressions go unnoticed until production.
- Priority: Low-Medium - Performance not critical yet but important for scalability

---

*Concerns audit: 2026-02-22*
