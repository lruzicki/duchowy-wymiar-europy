import { createServerFn } from '@tanstack/react-start'

export type LocationListItem = {
  coverImage: string | null
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
    return pickString(slugField.value, pickString(slugField.name, pickString(slugField.slug, fallback)))
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

export const getLocations = createServerFn({ method: 'GET' }).handler(async () => {
  const [{ createReader }, { default: keystaticConfig }] = await Promise.all([
    import('@keystatic/core/reader'),
    import('../../keystatic.config'),
  ])

  const reader = createReader(process.cwd(), keystaticConfig)
  const entries = await reader.collections.locations.all()

  return entries
    .map((item) => {
      const entry = item.entry as {
        coordinates?: {
          lat?: number
          lng?: number
        }
        coverImage?: unknown
        name?: unknown
        summary?: unknown
      }

      const lat = entry.coordinates?.lat
      const lng = entry.coordinates?.lng

      if (typeof lat !== 'number' || typeof lng !== 'number') return null

      return {
        coverImage: normalizeImage(entry.coverImage),
        coordinates: { lat, lng },
        name: normalizeLocationName(entry.name, item.slug),
        slug: item.slug,
        summary: pickString(entry.summary),
      } satisfies LocationListItem
    })
    .filter((item): item is LocationListItem => item !== null)
})
