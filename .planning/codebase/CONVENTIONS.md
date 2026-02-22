# Coding Conventions

**Analysis Date:** 2026-02-22

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Header.tsx`, `Button.tsx`, `LocationsMapClient.tsx`)
- Utilities/helpers: camelCase (e.g., `utils.ts`, `locations.ts`)
- UI components: lowercase with hyphens (e.g., `button.tsx`, `card.tsx`, `badge.tsx`)
- Client-only components: suffix with `.client` (e.g., `keystatic-admin.client.tsx`, `locations-map.client.tsx`)
- Route files: follow file-based routing convention with segments (e.g., `__root.tsx`, `index.tsx`)

**Functions:**
- PascalCase for React components: `export default function Header()`, `export function Hero()`
- camelCase for utility functions: `pickString()`, `normalizeImage()`, `normalizeLocationName()`, `makeData()`
- Server functions created via TanStack: `export const getLocations = createServerFn()`
- Helper/internal functions: camelCase with descriptive names

**Variables:**
- camelCase for all variables: `isOpen`, `activeLocation`, `defaultCenter`, `navItems`
- const for immutable data structures: `const defaultCenter: [number, number] = [52.2297, 19.0122]`
- Type variables in ternary expressions use shorthand: `v` instead of verbose names (see `setState((v) => !v)`)

**Types:**
- PascalCase for type names: `LocationListItem`, `Person`, `HeroProps`, `LocationsMapClientProps`
- Suffix interface props with `Props`: `type HeroProps`, `type LocationsMapClientProps`
- Union types for status fields use lowercase strings: `'relationship' | 'complicated' | 'single'`

## Code Style

**Formatting:**
- Tool: Prettier 3.5.3
- Configuration location: `prettier.config.js`
- Key settings:
  - `semi: false` - No semicolons
  - `singleQuote: true` - Single quotes for strings
  - `trailingComma: "all"` - Trailing commas in all multiline structures

**Linting:**
- Tool: ESLint with TanStack config
- Configuration location: `eslint.config.js`
- Extends: `@tanstack/eslint-config` (shares rules across TanStack projects)
- TypeScript strict mode enabled in `tsconfig.json`:
  - `strict: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`

## Import Organization

**Order:**
1. External library imports (React, third-party packages)
2. Internal imports (components, lib, data)
3. Type imports using `import type` syntax
4. CSS imports (always last): `import 'leaflet/dist/leaflet.css'`

**Path Aliases:**
- `@/*` maps to `./src/*` in `tsconfig.json`
- Usage: `import { cn } from '@/lib/utils'`, `import type { LocationListItem } from '@/lib/locations'`
- Used consistently across all files for internal imports

**Example pattern from `Header.tsx`:**
```typescript
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
```

## Error Handling

**Type Guards:**
- Use `typeof` checks for runtime validation: `typeof value === 'string'`, `typeof value === 'object'`
- Filter arrays with type predicates: `filter((item): item is LocationListItem => item !== null)`
- Null coalescing with fallback values in utility functions

**Safe Property Access:**
- Optional chaining for nested objects: `entry.coordinates?.lat`, `candidate.src`
- Nullish coalescing for defaults: `value ?? fallback`
- Defensive checks before type casting: `const candidate = value as { src?: unknown }`

**Validation Pattern:**
Functions validate input data and return null for invalid cases, then filter them out:
```typescript
// From locations.ts
return entries
  .map((item) => {
    // ... normalize and validate
    if (typeof lat !== 'number' || typeof lng !== 'number') return null
    return { /* valid object */ } satisfies LocationListItem
  })
  .filter((item): item is LocationListItem => item !== null)
```

## Logging

**Framework:** Console API (no logging library detected)

**Patterns:**
- No structured logging observed in codebase
- Use `console.log()`, `console.error()`, `console.warn()` as needed (not prevalent in current code)
- TanStack DevTools integrated for debugging: `<TanStackDevtools />` in root route

## Comments

**When to Comment:**
- Comments are rare in the codebase, preferring clear, self-documenting code
- Inline HTML comments for visual sections: `{/* Background Pattern */}`, `{/* Header */}`
- Documentation comments explain non-obvious workarounds

**JSDoc/TSDoc:**
- Not heavily used in the codebase
- Type annotations serve as primary documentation
- Inline type comments for complex types: `const item = value as SlugFieldValue`

## Function Design

**Size:** Small, focused functions following single responsibility principle
- Example: `pickString()`, `normalizeImage()`, `normalizeLocationName()` each handle one normalization task

**Parameters:**
- Use object parameters for components to avoid prop drilling
- Example: `function Hero({ onNavigate }: HeroProps)`
- Server functions use typed objects: `createServerFn({ method: 'GET' }).handler(async () => {})`

**Return Values:**
- Functions return typed results (`satisfies Type`)
- React components return JSX or React.ReactNode
- Utility functions return specific types (string, number, null, custom types)
- Example: `normalizeImage()` returns `string | null`

## Module Design

**Exports:**
- Default exports for component files: `export default function Header()`
- Named exports for utilities and types: `export const getLocations`, `export type LocationListItem`
- Mix of default and named in UI component files: `export { Button, buttonVariants }`

**Barrel Files:**
- Not explicitly observed, but modular structure suggests potential for barrel exports in `ui/` directories
- UI components grouped by feature: `ui/button.tsx`, `ui/card.tsx`, `ui/dialog.tsx`

**Re-exports:**
- Radix UI components re-exported through shadow UI components: `import { Slot } from "radix-ui"`
- Utility functions imported and used consistently: `import { cn } from "@/lib/utils"`

## Component Patterns

**React Components:**
- Functional components with hooks (useState, useEffect, useMap from react-leaflet)
- Props passed as typed object parameters
- No class components observed
- Event handlers use arrow functions: `onClick={() => setIsOpen((v) => !v)}`

**Variants and Styling:**
- Class-variance-authority (CVA) for component variants: `const buttonVariants = cva(...)`
- Tailwind CSS for styling with class merging via `cn()` utility
- Data attributes for component state tracking: `data-slot="button"`, `data-variant={variant}`

## Conditional Rendering

**Pattern:**
- Ternary operators for inline conditions: `isOpen ? <X /> : <Menu />`
- Logical AND for optional content: `isOpen && (<div>content</div>)`
- Nested ternaries for complex conditions (in map composition):
```typescript
const center = activeLocation
  ? ([...coordinates] as [number, number])
  : locations.length > 0
    ? ([locations[0].coordinates...])
    : defaultCenter
```

## Type Usage

**satisfies keyword:**
- Used for type assertion without narrowing: `return { ... } satisfies LocationListItem`
- Validates object matches type while preserving literal types

**Generics:**
- React generic props: `React.ComponentProps<"button">`
- Array generics: `Array<LocationListItem>`
- Function generics: `faker.helpers.shuffle<Person['status']>()`

---

*Convention analysis: 2026-02-22*
