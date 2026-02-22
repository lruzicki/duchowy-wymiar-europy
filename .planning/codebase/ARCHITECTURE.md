# Architecture

**Analysis Date:** 2026-02-22

## Pattern Overview

**Overall:** Full-stack React SSR application with file-based routing and headless CMS integration.

**Key Characteristics:**
- Server-side rendering using TanStack Start framework
- File-based routing convention with automatic code generation
- Component-driven UI with Tailwind CSS styling
- Content management via Keystatic headless CMS
- Modular component architecture with UI primitives layer

## Layers

**Presentation Layer (Client):**
- Purpose: React components and UI rendering
- Location: `src/components/`, `src/routes/`
- Contains: React components, page routes, UI primitives
- Depends on: Lib utilities, data fetching functions
- Used by: Router, browser rendering

**Routing Layer:**
- Purpose: URL handling and page navigation
- Location: `src/router.tsx`, `src/routes/`, `src/routeTree.gen.ts`
- Contains: Route definitions, loader functions, navigation state
- Depends on: Presentation components, data layer
- Used by: Root application shell

**Data/Server Layer:**
- Purpose: Content fetching and server-side operations
- Location: `src/lib/locations.ts`, API routes
- Contains: Server functions, Keystatic reader, data transformations
- Depends on: Keystatic configuration, content files
- Used by: Routes via loaders

**Content Layer:**
- Purpose: Structured content storage and management
- Location: `content/`, `keystatic.config.ts`
- Contains: YAML/Markdoc location entries, CMS configuration
- Depends on: Keystatic framework
- Used by: Data layer, admin interface

**UI Primitives Layer:**
- Purpose: Reusable unstyled component components
- Location: `src/components/ui/`
- Contains: Button, Card, Dialog, Input, Badge, ScrollArea, etc.
- Depends on: Radix UI, class-variance-authority, Tailwind CSS
- Used by: All page components and layouts

**Admin Layer:**
- Purpose: Content management interface
- Location: `src/routes/keystatic/`, `src/components/keystatic-admin.client.tsx`
- Contains: Keystatic UI wrapper, admin routes
- Depends on: Keystatic framework
- Used by: Content editors

## Data Flow

**Page Load (Index Route):**

1. Router matches request to `/` route in `src/routes/index.tsx`
2. Route loader calls `getLocations()` server function from `src/lib/locations.ts`
3. Server function reads Keystatic collection from `content/locations/*`
4. Data is normalized and typed as `LocationListItem[]`
5. Loader data passed to `IndexPage` component
6. Component renders `FigmaApp` with location data
7. FigmaApp renders full page UI with all sections

**Navigation Within App:**

1. User clicks navigation button or section link in `FigmaApp` (e.g., `onNavigate()` callback)
2. Scroll position is calculated for target section or page change is triggered
3. For regular sections (hero, projects, contact): smooth scroll to element ID
4. For full-page views (dezyderata, timeline): full page load via route change
5. Router updates URL and renders new component

**Content Update:**

1. Admin visits `/keystatic/` route
2. Route uses lazy-loaded Keystatic admin component
3. Admin edits location entries in CMS UI
4. Changes saved to `content/locations/*.yaml`
5. On next page visit, `getLocations()` reads updated files
6. New content appears on map and project listings

**Map Interaction:**

1. User clicks project marker on Leaflet map in `ProjectsMap`
2. Marker click handler updates React state: `setSelectedProject(project)`
3. Dialog opens showing project details from state
4. Leaflet map flies to coordinates via `mapInstanceRef.current.flyTo()`
5. Image gallery allows navigation with prev/next buttons

## Key Abstractions

**LocationListItem:**
- Purpose: Normalized location data type
- Examples: `src/lib/locations.ts` (type definition and normalization)
- Pattern: Type-safe data structure with normalization functions for handling schema variations

**FigmaApp:**
- Purpose: Root application shell managing page state and navigation
- Examples: `src/components/figma/FigmaApp.tsx`
- Pattern: Container component with scroll and page state management

**Server Functions (createServerFn):**
- Purpose: Async server-side operations callable from client
- Examples: `getLocations()` in `src/lib/locations.ts`
- Pattern: Typed RPC-like functions using TanStack Start's server function API

**UI Component Variants:**
- Purpose: Flexible styled component primitives
- Examples: Button with variants (default, destructive, outline, ghost, link)
- Pattern: CVA (class-variance-authority) for variant-based styling

## Entry Points

**Web Application Root:**
- Location: `src/routes/__root.tsx`
- Triggers: Initial page request to any URL
- Responsibilities: HTML structure, head meta tags, dev tools setup, script injection

**Index Page:**
- Location: `src/routes/index.tsx`
- Triggers: GET `/`
- Responsibilities: Load locations from CMS, render main application shell (FigmaApp)

**Keystatic Admin:**
- Location: `src/routes/keystatic/` with `src/components/keystatic-admin.client.tsx`
- Triggers: GET `/keystatic/` or `/keystatic/*`
- Responsibilities: Render CMS interface for content editing

**API Routes:**
- Location: `src/routes/api/keystatic/index.tsx` and `src/routes/api/keystatic/$.tsx`
- Triggers: Requests to `/api/keystatic/` and `/api/keystatic/*`
- Responsibilities: Proxy all Keystatic API requests to CMS handler

**Utility Routes:**
- Location: `src/routes/dezyderata.tsx`, `src/routes/timeline.tsx`, `src/routes/demo/table.tsx`
- Triggers: GET `/dezyderata`, `/timeline`, `/demo/table`
- Responsibilities: Render static pages (Dezyderata manifesto, timeline, demo table)

## Error Handling

**Strategy:** Silent fallback and null coalescing.

**Patterns:**
- Keystatic reader returns all entries; component filters out invalid entries with `.filter((item): item is LocationListItem => item !== null)`
- Location data normalization uses `pickString()` helper with fallback values
- Missing image returns `null` and gallery gracefully skips empty images
- Map loading shows spinner until library loads; component handles missing data by using embedded fallback data
- Lazy-loaded components use `Suspense` with fallback UI

## Cross-Cutting Concerns

**Logging:** No centralized logging framework detected. Debug output available via TanStack React Devtools.

**Validation:** Type-based validation using TypeScript. Runtime normalization happens in `src/lib/locations.ts` with type guards.

**Authentication:** Not implemented. Keystatic admin is unprotected at `/keystatic/`. CMS API at `/api/keystatic/` is also unprotected.

**Styling:** Tailwind CSS v4 with theme customization. All components use utility classes and variant-based styling via CVA.

**Icons:** Lucide React for SVG icons (lucide-react package). Icons integrated inline in components with sizing via data attributes.

---

*Architecture analysis: 2026-02-22*
