# External Integrations

**Analysis Date:** 2026-02-22

## APIs & External Services

**Map Tiles:**
- OpenStreetMap - Maps displayed via tile layer
  - URL: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
  - No authentication required
  - Used in: `src/components/locations-map.client.tsx` and `src/components/figma/ProjectsMap.tsx`

**Leaflet Asset CDN:**
- Unpkg CDN - Marker icons loaded from Leaflet distribution
  - URLs: Marker icon assets from `https://unpkg.com/leaflet@1.9.4/dist/images/`
  - Used for: Map marker icons (retina, standard, shadow)

## Data Storage

**Content Management:**
- Keystatic with Local File Storage
  - Type: File-based CMS
  - Storage location: `content/` directory (relative to project root)
  - Collections: `locations` collection at `content/locations/*`
  - Data format: Markdoc for content, structured fields for metadata
  - Configuration: `keystatic.config.ts`
  - No external database or cloud storage

**Asset Storage:**
- Local filesystem only
  - Cover images stored in: `public/images/locations/`
  - Configured in: `keystatic.config.ts` via `coverImage: fields.image()`

**File Access:**
- Server-side file reading via Keystatic reader
  - Implementation: `src/lib/locations.ts` uses `@keystatic/core/reader`
  - Method: `createReader(process.cwd(), keystaticConfig)` reads from disk

## Authentication & Identity

**Auth Provider:**
- None detected
- No authentication/authorization layer implemented
- All content is publicly accessible
- Admin access to Keystatic at `/keystatic` is not authenticated (public by default)

## Monitoring & Observability

**Error Tracking:**
- Not configured
- No external error tracking service detected
- No Sentry or similar integration

**Logs:**
- Standard console output only
- No structured logging or external log aggregation

## CI/CD & Deployment

**Hosting:**
- Not detected in codebase
- Potential targets: Any Node.js host compatible with Nitro
  - Vercel
  - Netlify
  - Self-hosted Node.js server
  - Docker/Container platforms

**CI Pipeline:**
- Not configured in repository
- No GitHub Actions, GitLab CI, or similar detected

## Environment Configuration

**Required env vars:**
- None detected
- All configuration is static or file-based
- No API keys or secrets referenced in code

**Secrets location:**
- Not applicable - no external service integrations requiring secrets

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

## Content API

**Keystatic Admin Interface:**
- Endpoint: `/api/keystatic/*`
- Method: Generic API route handler from `@keystatic/core/api/generic`
- Handlers: GET and POST
- Implementation: `src/routes/api/keystatic/index.tsx` and `src/routes/api/keystatic/$.tsx`
- Purpose: Provides admin UI and API for content management

**Server Functions:**
- Location data fetched via TanStack React Start server function
- Function: `getLocations()` in `src/lib/locations.ts`
- Method: GET via `createServerFn()` from @tanstack/react-start
- Returns: Array of `LocationListItem` objects with coordinates, name, slug, summary, coverImage

## Data Flow

**Content Retrieval:**
1. Route loader calls `getLocations()` server function (`src/routes/index.tsx`)
2. Server function reads Keystatic collection using `createReader()`
3. Reads from `content/locations/*` collection
4. Normalizes and validates location data
5. Returns structured location array to client
6. Client renders locations on Leaflet map via `LocationsMapClient` component

---

*Integration audit: 2026-02-22*
