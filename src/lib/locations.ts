import { createServerFn } from '@tanstack/react-start'
import { access } from 'node:fs/promises'
import { join } from 'node:path'
import type { SupportedLocale } from '@/lib/detect-locale'

type LocalizedText = Record<SupportedLocale, string>
const LOCALES: Array<SupportedLocale> = ['pl', 'en', 'de', 'uk', 'ru', 'ar']

export type LocationListItem = {
  images: string[]
  city: LocalizedText
  country: LocalizedText
  date: LocalizedText
  coordinates: {
    lat: number
    lng: number
  }
  name: LocalizedText
  slug: string
  summary: LocalizedText
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

function normalizeLocalizedText(value: unknown, fallback = ''): LocalizedText {
  if (typeof value === 'string') {
    return {
      pl: value || fallback,
      en: '',
      de: '',
      uk: '',
      ru: '',
      ar: '',
    }
  }

  const source =
    value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  return {
    pl: pickString(source.pl, fallback),
    en: pickString(source.en),
    de: pickString(source.de),
    uk: pickString(source.uk),
    ru: pickString(source.ru),
    ar: pickString(source.ar),
  }
}

function withLocaleFallback(
  values: LocalizedText,
  locale: SupportedLocale,
): string {
  if (values[locale]) return values[locale]
  for (const lang of LOCALES) {
    if (values[lang]) return values[lang]
  }
  return ''
}

export function selectLocationLocalizedText(
  values: LocalizedText,
  locale: SupportedLocale,
): string {
  return withLocaleFallback(values, locale)
}

function normalizeLocationName(value: unknown, fallback: string) {
  if (typeof value === 'string') return value

  if (value && typeof value === 'object') {
    const slugField = value as SlugFieldValue
    return pickString(
      (slugField as { value?: unknown }).value,
      pickString(
        (slugField as { name?: unknown }).name,
        pickString((slugField as { slug?: unknown }).slug, fallback),
      ),
    )
  }

  return fallback
}

function normalizeImage(value: unknown) {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return null

  const candidate = value as {
    src?: unknown
    filename?: unknown
    data?: unknown
  }

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

async function hasLocalContentDirectory() {
  try {
    await access(join(process.cwd(), 'content', 'locations'))
    return true
  } catch {
    return false
  }
}

async function createLocationsReader() {
  const { default: keystaticConfig } = await import('../../keystatic.config')

  if (await hasLocalContentDirectory()) {
    const { createReader } = await import('@keystatic/core/reader')
    return createReader(process.cwd(), keystaticConfig)
  }

  const { createGitHubReader } = await import('@keystatic/core/reader/github')
  const owner = process.env.KEYSTATIC_GITHUB_REPO_OWNER ?? 'lruzicki'
  const name = process.env.KEYSTATIC_GITHUB_REPO_NAME ?? 'duchowy-wymiar-europy'
  const token = process.env.KEYSTATIC_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN
  const ref =
    process.env.KEYSTATIC_GITHUB_REF ?? process.env.VERCEL_GIT_COMMIT_REF

  return createGitHubReader(keystaticConfig, {
    repo: `${owner}/${name}`,
    token,
    ref,
  })
}

export const getLocations = createServerFn({ method: 'GET' }).handler(
  async () => {
    const reader = await createLocationsReader()
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
          title?: unknown
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

        const fallbackName = normalizeLocationName(entry.name, item.slug)

        return {
          images,
          city: normalizeLocalizedText(entry.city),
          country: normalizeLocalizedText(entry.country),
          date: normalizeLocalizedText(entry.date),
          coordinates: { lat, lng },
          name: normalizeLocalizedText(entry.title, fallbackName),
          slug: item.slug,
          summary: normalizeLocalizedText(entry.summary),
        } satisfies LocationListItem
      })
      .filter((item): item is LocationListItem => item !== null)
  },
)

export const getLocationBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const reader = await createLocationsReader()
    const entry = await reader.collections.locations.read(slug)
    if (!entry) return null

    const typedEntry = entry as unknown as {
      coordinates?: { lat?: number; lng?: number }
      images?: unknown[]
      city?: unknown
      country?: unknown
      date?: unknown
      name?: unknown
      title?: unknown
      summary?: unknown
    }

    const lat = typedEntry.coordinates?.lat
    const lng = typedEntry.coordinates?.lng
    if (typeof lat !== 'number' || typeof lng !== 'number') return null

    const rawImages = Array.isArray(typedEntry.images) ? typedEntry.images : []
    const images = rawImages
      .map((img) => normalizeImage(img))
      .filter((s): s is string => s !== null)
      .map(normalizeImagePath)

    const fallbackName = normalizeLocationName(typedEntry.name, slug)

    return {
      images,
      city: normalizeLocalizedText(typedEntry.city),
      country: normalizeLocalizedText(typedEntry.country),
      date: normalizeLocalizedText(typedEntry.date),
      coordinates: { lat, lng },
      name: normalizeLocalizedText(typedEntry.title, fallbackName),
      slug,
      summary: normalizeLocalizedText(typedEntry.summary),
    } satisfies LocationListItem
  })
