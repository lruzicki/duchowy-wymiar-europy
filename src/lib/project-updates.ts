import { createServerFn } from '@tanstack/react-start'

import type { SupportedLocale } from '@/lib/detect-locale'

type RichTextNode = Record<string, unknown>
type RichTextDocument = Array<RichTextNode>

type LocalizedText = Record<SupportedLocale, string>
type LocalizedDocument = Record<SupportedLocale, RichTextDocument>

export type ProjectUpdateSection = {
  key: string
  title: LocalizedText
  content: LocalizedDocument
}

export type ProjectUpdatePage = {
  updatedAt: string
  title: LocalizedText
  lead: LocalizedText
  coverImage: string
  sections: Array<ProjectUpdateSection>
}

const LOCALES: Array<SupportedLocale> = ['pl', 'en', 'de', 'uk', 'ru', 'ar']

function normalizeImagePath(path: string): string {
  return path.startsWith('public/') ? path.slice(7) : path
}

function pickImage(value: unknown): string {
  if (typeof value === 'string') return normalizeImagePath(value)
  if (!value || typeof value !== 'object') return ''

  const image = value as { src?: unknown; filename?: unknown }
  if (typeof image.src === 'string') return normalizeImagePath(image.src)
  if (typeof image.filename === 'string') return normalizeImagePath(image.filename)
  return ''
}

function pickText(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function pickDocument(value: unknown): RichTextDocument {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is RichTextNode => !!item && typeof item === 'object')
}

function normalizeLocalizedText(value: unknown): LocalizedText {
  const source = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  return {
    pl: pickText(source.pl),
    en: pickText(source.en),
    de: pickText(source.de),
    uk: pickText(source.uk),
    ru: pickText(source.ru),
    ar: pickText(source.ar),
  }
}

function normalizeLocalizedDocument(value: unknown): LocalizedDocument {
  const source = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  return {
    pl: pickDocument(source.pl),
    en: pickDocument(source.en),
    de: pickDocument(source.de),
    uk: pickDocument(source.uk),
    ru: pickDocument(source.ru),
    ar: pickDocument(source.ar),
  }
}

function withLocaleFallback(values: LocalizedText, locale: SupportedLocale): string {
  return values[locale] || values.pl || values.en || values.de || values.uk || values.ru || values.ar || ''
}

function withLocaleDocumentFallback(
  values: LocalizedDocument,
  locale: SupportedLocale
): RichTextDocument {
  if (values[locale].length > 0) return values[locale]
  for (const lang of LOCALES) {
    if (values[lang].length > 0) return values[lang]
  }
  return []
}

export const getProjectUpdate = createServerFn({ method: 'GET' }).handler(async () => {
  const [{ createReader }, { default: keystaticConfig }] = await Promise.all([
    import('@keystatic/core/reader'),
    import('../../keystatic.config'),
  ])

  const reader = createReader(process.cwd(), keystaticConfig)
  let entry: null | {
    updatedAt?: unknown
    title?: unknown
    lead?: unknown
    coverImage?: unknown
    sections?: Array<unknown>
  } = null

  try {
    entry = (await reader.singletons.aktualnosci.read({
      resolveLinkedFiles: true,
    })) as typeof entry
  } catch (error) {
    console.error('Failed to read singleton "aktualnosci"', error)
    return null
  }

  if (!entry) {
    return null
  }

  const rawSections = Array.isArray(entry.sections) ? entry.sections : []

  return {
    updatedAt: pickText(entry.updatedAt),
    title: normalizeLocalizedText(entry.title),
    lead: normalizeLocalizedText(entry.lead),
    coverImage: pickImage(entry.coverImage),
    sections: rawSections.map((rawSection, index) => {
      const section =
        rawSection && typeof rawSection === 'object'
          ? (rawSection as { key?: unknown; title?: unknown; content?: unknown })
          : {}

      const keyValue =
        section.key && typeof section.key === 'object'
          ? (section.key as { slug?: unknown }).slug
          : section.key

      return {
        key: pickText(keyValue) || `sekcja-${index + 1}`,
        title: normalizeLocalizedText(section.title),
        content: normalizeLocalizedDocument(section.content),
      } satisfies ProjectUpdateSection
    }),
  } satisfies ProjectUpdatePage
})

export function selectLocalizedText(value: LocalizedText, locale: SupportedLocale): string {
  return withLocaleFallback(value, locale)
}

export function selectLocalizedDocument(
  value: LocalizedDocument,
  locale: SupportedLocale
): RichTextDocument {
  return withLocaleDocumentFallback(value, locale)
}
