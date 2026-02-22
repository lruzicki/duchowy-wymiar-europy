# Technology Stack

**Analysis Date:** 2026-02-22

## Languages

**Primary:**
- TypeScript 5.7.2 - Full codebase including components, routes, and utilities

**Secondary:**
- JavaScript (config files)

## Runtime

**Environment:**
- Node.js (no specific version pinned in `.nvmrc` or `.node-version`)

**Package Manager:**
- pnpm (lockfile: `pnpm-lock.yaml` present)
- Module type: ES modules (`"type": "module"` in `package.json`)

## Frameworks

**Core:**
- React 19.2.0 - UI framework
- TanStack Start 1.132.0 - Full-stack framework (SSR + routing)
- TanStack React Router 1.132.0 - File-based routing
- Nitro (nightly build) - Server runtime layer

**UI & Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- Radix UI 1.4.3 - Headless component library
- Tailwind Merge 3.0.2 - Tailwind utility merge utility
- Class Variance Authority 0.7.1 - Component variant management
- clsx 2.1.1 - Conditional classname utility

**Mapping & Geospatial:**
- Leaflet 1.9.4 - Interactive map library
- React Leaflet 5.0.0 - React wrapper for Leaflet

**Icons:**
- Lucide React 0.561.0 - Icon library

**Data & Utilities:**
- TanStack React Table 8.21.2 - Headless table library
- TanStack Match Sorter Utils 8.19.4 - Sorting/filtering utilities
- @faker-js/faker 10.0.0 - Fake data generation

**Content Management:**
- Keystatic 0.5.48 - Headless CMS with local file storage

**Animation:**
- tw-animate-css 1.3.6 - CSS animation utilities

**Testing:**
- Vitest 3.0.5 - Test runner
- @testing-library/react 16.2.0 - React component testing utilities
- @testing-library/dom 10.4.0 - DOM testing utilities
- jsdom 27.0.0 - DOM environment for testing

**Build/Dev:**
- Vite 7.1.7 - Build tool and dev server
- @vitejs/plugin-react 5.0.4 - React plugin for Vite
- @tailwindcss/vite 4.1.18 - Tailwind CSS Vite plugin
- vite-tsconfig-paths 5.1.4 - Path alias resolution plugin

**Development Tools:**
- TanStack Router Plugin 1.132.0 - Automatic route code generation
- TanStack React DevTools 0.7.0 - React devtools integration
- TanStack React Router DevTools 1.132.0 - Router devtools
- TanStack DevTools Vite 0.3.11 - Vite plugin for devtools

**Code Quality:**
- ESLint (via @tanstack/eslint-config 0.3.0) - Linting
- Prettier 3.5.3 - Code formatting
- TypeScript 5.7.2 - Type checking

## Key Dependencies

**Critical:**
- @keystatic/core 0.5.48 - Content management and API handling; manages content collection with local file storage
- @tanstack/react-start 1.132.0 - Full-stack framework enabling SSR and server functions
- @tanstack/react-router 1.132.0 - Routing infrastructure with file-based routing
- react-leaflet 5.0.0 - Map rendering functionality via Leaflet integration

**Infrastructure:**
- nitro (nightly) - Server-side runtime providing HTTP handling and deployment flexibility
- vite 7.1.7 - Module bundling and dev server
- vitest 3.0.5 - Test execution environment

## Configuration

**Environment:**
- No `.env` file detected in repository
- Configuration managed through Keystatic for content
- Local-only storage (no external service dependencies configured)

**Build:**
- `vite.config.ts` - Vite configuration with plugins:
  - TanStack Router plugin for automatic route generation
  - Tailwind CSS Vite plugin
  - TypeScript path resolution
  - React plugin
  - DevTools plugin
- `tsconfig.json` - Targets ES2022, React JSX, strict mode enabled
- `prettier.config.js` - Formatting: no semicolons, single quotes, trailing commas

## Platform Requirements

**Development:**
- Node.js (version not pinned)
- pnpm package manager
- Modern browser for dev server

**Production:**
- Node.js runtime for server functions
- Standard web server or serverless platform compatible with Nitro
- File system access for Keystatic content (local file storage)

---

*Stack analysis: 2026-02-22*
