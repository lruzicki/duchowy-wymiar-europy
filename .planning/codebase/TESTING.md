# Testing Patterns

**Analysis Date:** 2026-02-22

## Test Framework

**Runner:**
- Vitest 3.0.5
- Configuration: Not detected in codebase (uses default Vitest behavior)
- Entry file: Tests run via `npm run test` or `pnpm test`

**Assertion Library:**
- Testing Library (for React component testing)
  - `@testing-library/react` ^16.2.0
  - `@testing-library/dom` ^10.4.0
- Vitest built-in assertions

**Test Environment:**
- jsdom ^27.0.0 for DOM environment simulation

**Run Commands:**
```bash
pnpm test                 # Run all tests (vitest run)
pnpm test:watch          # Watch mode (not explicitly in scripts, but vitest default)
# Coverage would be: vitest run --coverage
```

## Test File Organization

**Location:**
- No test files found in `/src` directory
- Test infrastructure is installed but not yet populated with tests
- Suggested pattern: co-located tests next to source files

**Naming Convention:**
- Expected pattern (based on installed dependencies): `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`
- Example proposed structure:
  ```
  src/lib/utils.ts
  src/lib/utils.test.ts
  src/components/Header.tsx
  src/components/Header.test.tsx
  ```

**Structure:**
- Test files would be sibling files in same directory as source code
- One test file per source file

## Test Structure

**Suite Organization:**

No existing tests, but following Vitest + Testing Library convention:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Button className="custom">Custom Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom')
  })

  describe('variants', () => {
    it('renders destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-destructive')
    })
  })
})
```

**Patterns:**
- Setup: `describe()` blocks for grouping related tests
- Teardown: `afterEach()` for cleanup (e.g., unmounting components)
- Assertions: `expect()` with matcher functions

## Mocking

**Framework:** Vitest built-in mocking (`vi.mock()`, `vi.spyOn()`)

**Patterns:**

Module mocking pattern (for TanStack hooks and external libraries):
```typescript
import { vi, describe, it, expect } from 'vitest'
import { useRouter } from '@tanstack/react-router'

vi.mock('@tanstack/react-router', () => ({
  useRouter: vi.fn(),
}))

describe('Router-dependent component', () => {
  it('uses router hook', () => {
    const mockRouter = { navigate: vi.fn() }
    vi.mocked(useRouter).mockReturnValue(mockRouter)
    // test code
  })
})
```

Server function mocking (for `createServerFn`):
```typescript
import { vi } from 'vitest'
import { getLocations } from '@/lib/locations'

vi.mock('@keystatic/core/reader', () => ({
  createReader: vi.fn(() => ({
    collections: {
      locations: {
        all: vi.fn(async () => [/* mock data */])
      }
    }
  }))
}))
```

**What to Mock:**
- External API calls and server functions
- TanStack Router hooks
- Keystatic reader (for content fetching)
- Leaflet map instances and operations
- Faker-js data generation functions

**What NOT to Mock:**
- React hooks like `useState`, `useEffect`
- Component rendering logic
- Utility functions like `cn()`, `pickString()`, `normalizeImage()`
- Custom hooks that wrap primitives
- Type definitions

## Fixtures and Factories

**Test Data:**

Using Faker.js for generating realistic data:
```typescript
import { faker } from '@faker-js/faker'

// Pattern from demo-table-data.ts can be adapted:
const mockLocation = {
  slug: 'test-location',
  name: faker.location.city(),
  summary: faker.lorem.sentence(),
  coordinates: {
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
  },
  coverImage: faker.image.url(),
}

// Factory function for repeated test data:
function createMockLocation(overrides?: Partial<LocationListItem>): LocationListItem {
  return {
    slug: 'test-location',
    name: 'Test Location',
    summary: 'Test summary',
    coordinates: { lat: 52.2297, lng: 19.0122 },
    coverImage: null,
    ...overrides,
  }
}
```

**Location:**
- Create fixtures directory: `src/__fixtures__/` or `src/lib/__fixtures__/`
- Or inline mock data in test files near tests that use them

## Coverage

**Requirements:** Not enforced (no coverage configuration detected)

**View Coverage:**
```bash
pnpm vitest run --coverage
# or with specific reporter:
pnpm vitest run --coverage --reporter=text
```

**Suggested targets** (best practices for component libraries):
- Statements: 70%+
- Branches: 65%+
- Functions: 70%+
- Lines: 70%+

## Test Types

**Unit Tests:**
- Scope: Individual utility functions, type guards, transformations
- Approach: Test pure functions with various inputs
- Examples to test:
  - `cn()` utility with different class combinations
  - `pickString()` with various input types
  - `normalizeImage()` with different object shapes
  - `makeData()` with different depth parameters

**Integration Tests:**
- Scope: Components working with their dependencies
- Approach: Render components with mocked services
- Examples to test:
  - `Header` component with mocked router
  - `LocationsMapClient` with mocked location data
  - `Hero` component with mocked navigation callback
  - Form components like `Contact` with validation

**E2E Tests:**
- Framework: Not currently set up
- Suggested tools: Playwright, Cypress, Vitest UI
- Scope: Full user journeys through routes
- Would test: Navigation flows, form submissions, map interactions

## Common Patterns

**Async Testing:**
```typescript
import { describe, it, expect } from 'vitest'

describe('Server function', () => {
  it('fetches locations', async () => {
    const locations = await getLocations()
    expect(locations).toBeDefined()
    expect(locations.length).toBeGreaterThan(0)
  })

  it('handles fetch errors', async () => {
    vi.mocked(createReader).mockRejectedValue(new Error('Read failed'))
    await expect(getLocations()).rejects.toThrow('Read failed')
  })
})
```

**Error Testing:**
```typescript
describe('normalizeImage', () => {
  it('returns null for invalid input', () => {
    expect(normalizeImage(undefined)).toBeNull()
    expect(normalizeImage({})).toBeNull()
    expect(normalizeImage(123)).toBeNull()
  })

  it('extracts src from nested object', () => {
    const result = normalizeImage({
      data: { src: 'image.jpg' }
    })
    expect(result).toBe('image.jpg')
  })
})
```

**Component Rendering:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Button component', () => {
  it('calls onClick handler', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

**React Router Testing:**
```typescript
import { createRouter } from '@tanstack/react-router'
import { render } from '@testing-library/react'
import { Router } from '@tanstack/react-router'

describe('Route component', () => {
  it('renders at correct path', () => {
    const router = createRouter({
      routeTree: testRouteTree,
    })

    router.navigate({ to: '/dezyderata' })
    render(<Router router={router} />)
    expect(screen.getByText(/dezyderata/i)).toBeInTheDocument()
  })
})
```

## Test Data Management

**Keystatic Content:**
```typescript
// Mock for testing content-dependent components
const mockLocations = [
  {
    slug: 'warsaw',
    name: 'Warsaw',
    summary: 'Poland capital',
    coordinates: { lat: 52.2297, lng: 21.0122 },
    coverImage: 'warsaw.jpg',
  },
]

vi.mock('@keystatic/core/reader', () => ({
  createReader: vi.fn(() => ({
    collections: {
      locations: {
        all: vi.fn(async () => mockLocations)
      }
    }
  }))
}))
```

---

*Testing analysis: 2026-02-22*
