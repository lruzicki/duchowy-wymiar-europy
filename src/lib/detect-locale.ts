export type SupportedLocale = 'pl' | 'en' | 'de' | 'uk' | 'ru' | 'ar'

export const SUPPORTED_LOCALES: SupportedLocale[] = [
  'pl',
  'en',
  'de',
  'uk',
  'ru',
  'ar',
]

/**
 * Maps an Accept-Language header string to the best supported locale.
 *
 * Rules:
 * 1. Supported locales: pl | en | de | uk | ru | ar
 * 2. Match on base language tag — 'de-AT' → 'de', 'uk-UA' → 'uk'
 * 3. Special exception: 'ru-UA' (Russian language, Ukraine region) → 'uk'
 * 4. First-match-wins across the browser's Accept-Language preference list
 * 5. Q-weight values (;q=0.x) are stripped; order is preserved
 * 6. Fallback for unsupported or empty input: 'pl' (Polish)
 */
export function detectLocale(acceptLanguageHeader: string): SupportedLocale {
  if (!acceptLanguageHeader.trim()) {
    return 'pl'
  }

  const tokens = acceptLanguageHeader.split(',')

  for (const raw of tokens) {
    // Strip q-weight and trim whitespace
    const token = raw.split(';')[0].trim()

    if (!token) continue

    // Special exception: ru-UA → Ukrainian
    if (token.toLowerCase() === 'ru-ua') {
      return 'uk'
    }

    // Extract base language tag (part before the first '-')
    const base = token.split('-')[0].toLowerCase() as SupportedLocale

    if ((SUPPORTED_LOCALES as string[]).includes(base)) {
      return base
    }
  }

  // No match found — fall back to Polish
  return 'pl'
}
