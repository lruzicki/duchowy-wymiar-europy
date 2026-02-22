# Codebase Structure

**Analysis Date:** 2026-02-22

## Directory Layout

```
duchowy-wymiar-europy/
├── src/                          # Application source code
│   ├── components/               # React components
│   │   ├── figma/               # Page layout components
│   │   ├── ui/                  # UI primitives (button, card, dialog, etc.)
│   │   ├── keystatic-admin.client.tsx
│   │   ├── locations-map.client.tsx
│   │   └── Header.tsx
│   ├── routes/                  # File-based routes (TanStack Router)
│   │   ├── __root.tsx           # Root layout
│   │   ├── index.tsx            # / - Home page
│   │   ├── dezyderata.tsx       # /dezyderata - Manifesto page
│   │   ├── timeline.tsx         # /timeline - Timeline page
│   │   ├── keystatic/           # /keystatic - Admin interface
│   │   ├── api/keystatic/       # /api/keystatic - CMS API
│   │   └── demo/table.tsx       # /demo/table - Demo table
│   ├── lib/                     # Utility functions and helpers
│   │   ├── locations.ts         # Server function for fetching locations
│   │   └── utils.ts             # cn() utility for merging CSS classes
│   ├── data/                    # Static data
│   │   └── demo-table-data.ts   # Demo table faker data
│   ├── router.tsx               # Router configuration
│   ├── routeTree.gen.ts         # Generated route tree (auto-generated)
│   └── styles.css               # Global styles
├── content/                     # CMS content (Keystatic)
│   └── locations/               # Location collection entries (YAML)
├── keystatic.config.ts          # Keystatic configuration
├── keystatic-base/              # Keystatic base dependency
├── public/                      # Static assets
│   ├── images/                  # Image files
│   └── ...
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── eslint.config.js             # ESLint rules
├── prettier.config.js           # Prettier formatting rules
└── components.json              # UI component registry (shadcn/ui)
```

## Directory Purposes

**src/:**
- Purpose: All application source code
- Contains: Components, routes, utilities, data
- Key files: `router.tsx`, `routeTree.gen.ts`

**src/components/:**
- Purpose: React component modules
- Contains: Page sections, UI primitives, admin interface
- Key files: `FigmaApp.tsx`, `keystatic-admin.client.tsx`

**src/components/figma/:**
- Purpose: Full-page layout and section components
- Contains: Hero, ProjectsMap, Contact, Footer, Navigation, Timeline, Dezyderata, etc.
- Pattern: One component per major section or page

**src/components/figma/ui/:**
- Purpose: UI primitives specific to figma design (duplicate implementations)
- Contains: badge.tsx, dialog.tsx, input.tsx, textarea.tsx
- Note: Overlaps with `src/components/ui/`; consider consolidation

**src/components/ui/:**
- Purpose: Reusable, unstyled UI component primitives
- Contains: button.tsx, card.tsx, dialog.tsx, input.tsx, badge.tsx, scroll-area.tsx, textarea.tsx
- Pattern: Radix UI-based with Tailwind styling via CVA (class-variance-authority)
- Naming: Kebab-case file names matching HTML element names

**src/routes/:**
- Purpose: File-based route definitions
- Contains: Route files matching URL paths
- Pattern: Each file is a route; `__root.tsx` is layout wrapper; `$` is catch-all parameter
- Key structure:
  - `__root.tsx` → Root layout for all pages
  - `index.tsx` → `/` home page
  - `dezyderata.tsx` → `/dezyderata` page
  - `timeline.tsx` → `/timeline` page
  - `keystatic/index.tsx` → `/keystatic/` admin interface
  - `keystatic/$.tsx` → `/keystatic/*` catch-all for admin subroutes
  - `api/keystatic/index.tsx` → `/api/keystatic/` CMS API entry
  - `api/keystatic/$.tsx` → `/api/keystatic/*` catch-all for API
  - `demo/table.tsx` → `/demo/table` demo page

**src/lib/:**
- Purpose: Shared utilities and server-side functions
- Contains: Data fetching, type definitions, helper utilities
- Key files:
  - `locations.ts`: Server function `getLocations()`, type `LocationListItem`
  - `utils.ts`: `cn()` function for Tailwind class merging

**src/data/:**
- Purpose: Static or generated data
- Contains: Demo data for table component
- Key files: `demo-table-data.ts` with faker-generated Person type

**content/:**
- Purpose: CMS content storage (Keystatic)
- Contains: YAML files for each content collection
- Key directories: `locations/` for location entries
- Format: Each entry is a YAML file with fields defined in `keystatic.config.ts`

**public/:**
- Purpose: Static assets served directly
- Contains: Images, favicons, and other static files
- Subdirectories: `images/locations/` for location cover images

## Key File Locations

**Entry Points:**

- `src/routes/__root.tsx`: HTML document root, meta tags, devtools initialization
- `src/routes/index.tsx`: Home page (main application)
- `src/router.tsx`: Router instance creation and configuration
- `package.json`: Build and dev commands, dependency declarations

**Configuration:**

- `keystatic.config.ts`: CMS collection schemas and storage backend
- `tsconfig.json`: TypeScript compiler options, path aliases (`@/*` → `src/*`)
- `vite.config.ts`: Build tool configuration, plugins, SSR setup
- `eslint.config.js`: Linting rules (TanStack config)
- `prettier.config.js`: Code formatting rules
- `components.json`: shadcn/ui component registry

**Core Logic:**

- `src/components/figma/FigmaApp.tsx`: Main app shell, section navigation, scroll handling
- `src/lib/locations.ts`: Server function to fetch and normalize location data from CMS
- `src/components/figma/ProjectsMap.tsx`: Interactive map with markers, project list, detail dialog

**Testing:**

- No test files found in current structure
- Test configuration: `vitest` available in devDependencies

## Naming Conventions

**Files:**

- Components: PascalCase (e.g., `FigmaApp.tsx`, `ProjectsMap.tsx`)
- Utilities: camelCase (e.g., `locations.ts`, `utils.ts`)
- Routes: kebab-case or PascalCase with special patterns (e.g., `dezyderata.tsx`, `__root.tsx`)
- UI components: kebab-case (e.g., `button.tsx`, `scroll-area.tsx`)
- Client components: `.client.tsx` suffix for client-side only components

**Directories:**

- camelCase or lowercase (e.g., `components`, `routes`, `lib`, `data`)
- Special prefixes: `__` for special routes (e.g., `__root.tsx`)

**Variables & Functions:**

- camelCase for functions and variables
- PascalCase for React components and types
- SCREAMING_SNAKE_CASE for constants (not extensively used)

**Types:**

- PascalCase (e.g., `LocationListItem`, `Project`, `FigmaAppProps`)

## Where to Add New Code

**New Feature (Page):**

- Primary code: Create route file in `src/routes/[path].tsx` (e.g., `src/routes/projects.tsx`)
- Components: Place page components in `src/components/[feature]/`
- Content: If needed, add collection to `keystatic.config.ts` and create `content/[collection]/` directory
- Tests: Create `src/routes/[path].test.ts` or `src/components/[feature].test.tsx`

**New Component/Module:**

- Reusable UI: `src/components/ui/[name].tsx` (use Radix UI + CVA for variants)
- Feature component: `src/components/[feature]/[name].tsx`
- Page section: `src/components/figma/[name].tsx` (if part of main page layout)

**New Utility Function:**

- Shared helpers: `src/lib/[domain].ts` (e.g., `src/lib/formatting.ts`, `src/lib/validation.ts`)
- General utilities: `src/lib/utils.ts` or create new domain file

**Server Functions:**

- Data fetching: `src/lib/[domain].ts` using `createServerFn()` from `@tanstack/react-start`
- API handlers: `src/routes/api/[path].tsx` with server handler functions

## Special Directories

**src/routeTree.gen.ts:**
- Purpose: Auto-generated route tree
- Generated: Yes (by TanStack Router plugin during build/dev)
- Committed: Yes (keep in git; auto-regenerated on changes to route files)
- Edit: Do not edit manually; regenerates on route file changes

**keystatic-base/:**
- Purpose: Keystatic base configuration/dependencies
- Generated: May be generated or installed
- Committed: Check `.gitignore` for inclusion status

**.output/:**
- Purpose: Build output directory
- Generated: Yes (created during `vite build` or `nitro build`)
- Committed: No (in .gitignore)

**.tanstack/:**
- Purpose: TanStack framework cache/metadata
- Generated: Yes (auto-generated by TanStack tooling)
- Committed: Usually no, but present in current repo

**content/:**
- Purpose: CMS content storage
- Generated: No (manually edited via admin UI or YAML files)
- Committed: Yes (content is part of repo)

---

*Structure analysis: 2026-02-22*
