import { createServerFn } from '@tanstack/react-start'

export type LocationListItem = {
  images: string[]
  city: string
  country: string
  date: string
  coordinates: {
    lat: number
    lng: number
  }
  name: string
  slug: string
  summary: string
}

type SlugFieldValue =
  | string
  | {
      slug?: unknown
      value?: unknown
      name?: unknown
    }

function pickString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function normalizeLocationName(value: unknown, fallback: string) {
  if (typeof value === 'string') return value

  if (value && typeof value === 'object') {
    const slugField = value as SlugFieldValue
    return pickString(
      (slugField as { value?: unknown }).value,
      pickString(
        (slugField as { name?: unknown }).name,
        pickString((slugField as { slug?: unknown }).slug, fallback)
      )
    )
  }

  return fallback
}

function normalizeImage(value: unknown) {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return null

  const candidate = value as { src?: unknown; filename?: unknown; data?: unknown }

  if (typeof candidate.src === 'string') return candidate.src
  if (typeof candidate.filename === 'string') return candidate.filename

  if (candidate.data && typeof candidate.data === 'object') {
    const maybeData = candidate.data as { src?: unknown }
    if (typeof maybeData.src === 'string') return maybeData.src
  }

  return null
}

function normalizeImagePath(path: string): string {
  return path.startsWith('public/') ? path.slice(7) : path
}

export const getLocations = createServerFn({ method: 'GET' }).handler(async () => {
  const [{ createReader }, { default: keystaticConfig }] = await Promise.all([
    import('@keystatic/core/reader'),
    import('../../keystatic.config'),
  ])

  const reader = createReader(process.cwd(), keystaticConfig)
  const entries = await reader.collections.locations.all()

  return entries
    .map((item) => {
      const entry = item.entry as unknown as {
        coordinates?: {
          lat?: number
          lng?: number
        }
        images?: unknown[]
        city?: unknown
        country?: unknown
        date?: unknown
        name?: unknown
        summary?: unknown
      }

      const lat = entry.coordinates?.lat
      const lng = entry.coordinates?.lng

      if (typeof lat !== 'number' || typeof lng !== 'number') return null

      const rawImages = Array.isArray(entry.images) ? entry.images : []
      const images = rawImages
        .map((img) => normalizeImage(img))
        .filter((s): s is string => s !== null)
        .map(normalizeImagePath)

      return {
        images,
        city: pickString(entry.city),
        country: pickString(entry.country),
        date: pickString(entry.date),
        coordinates: { lat, lng },
        name: normalizeLocationName(entry.name, item.slug),
        slug: item.slug,
        summary: pickString(entry.summary),
      } satisfies LocationListItem
    })
    .filter((item): item is LocationListItem => item !== null)
})

export const getLocationBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const [{ createReader }, { default: keystaticConfig }] = await Promise.all([
      import('@keystatic/core/reader'),
      import('../../keystatic.config'),
    ])
    const reader = createReader(process.cwd(), keystaticConfig)
    const entry = await reader.collections.locations.read(slug)
    if (!entry) return null

    const typedEntry = entry as unknown as {
      coordinates?: { lat?: number; lng?: number }
      images?: unknown[]
      city?: unknown
      country?: unknown
      date?: unknown
      name?: unknown
      summary?: unknown
    }

    const lat = typedEntry.coordinates?.lat
    const lng = typedEntry.coordinates?.lng
    if (typeof lat !== 'number' || typeof lng !== 'number') return null

    const rawImages = Array.isArray(typedEntry.images) ? typedEntry.images : []
    const images = rawImages
      .map(img => normalizeImage(img))
      .filter((s): s is string => s !== null)
      .map(normalizeImagePath)

    return {
      images,
      city: pickString(typedEntry.city),
      country: pickString(typedEntry.country),
      date: pickString(typedEntry.date),
      coordinates: { lat, lng },
      name: normalizeLocationName(typedEntry.name, slug),
      slug,
      summary: pickString(typedEntry.summary),
    } satisfies LocationListItem
  })
