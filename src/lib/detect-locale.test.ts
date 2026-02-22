import { describe, it, expect } from 'vitest'
import { detectLocale, SUPPORTED_LOCALES } from './detect-locale'

describe('detectLocale', () => {
  describe('base language tag matching', () => {
    it('returns de for de-AT (regional variant → base tag match)', () => {
      expect(detectLocale('de-AT, en, pl')).toBe('de')
    })

    it('returns de for plain de', () => {
      expect(detectLocale('de')).toBe('de')
    })

    it('returns en for en-US (regional variant → base tag match)', () => {
      expect(detectLocale('en-US')).toBe('en')
    })

    it('returns uk for uk-UA (regional variant → base tag match)', () => {
      expect(detectLocale('uk-UA')).toBe('uk')
    })

    it('returns ru for ru-RU', () => {
      expect(detectLocale('ru-RU')).toBe('ru')
    })

    it('returns ru for plain ru', () => {
      expect(detectLocale('ru')).toBe('ru')
    })

    it('returns ar for plain ar', () => {
      expect(detectLocale('ar')).toBe('ar')
    })

    it('returns ar for ar-SA (regional variant → base tag match)', () => {
      expect(detectLocale('ar-SA')).toBe('ar')
    })

    it('returns pl for plain pl', () => {
      expect(detectLocale('pl')).toBe('pl')
    })
  })

  describe('special exception: ru-UA → uk', () => {
    it('returns uk for ru-UA (Russian language in Ukraine region maps to Ukrainian)', () => {
      expect(detectLocale('ru-UA')).toBe('uk')
    })

    it('returns uk when ru-UA appears after unsupported locale (ja, ru-UA, de → uk)', () => {
      expect(detectLocale('ja, ru-UA, de')).toBe('uk')
    })
  })

  describe('first-match-wins', () => {
    it('returns de when de-AT is first in list', () => {
      expect(detectLocale('de-AT, en, pl')).toBe('de')
    })

    it('returns uk when uk-UA is first supported locale in list', () => {
      expect(detectLocale('uk-UA, de, en')).toBe('uk')
    })

    it('returns en when en;q=0.9 appears before de;q=0.8 (q-weights ignored, order preserved)', () => {
      expect(detectLocale('en;q=0.9, de;q=0.8')).toBe('en')
    })
  })

  describe('Polish fallback for unsupported locales', () => {
    it('returns pl for fr (unsupported locale → Polish fallback)', () => {
      expect(detectLocale('fr')).toBe('pl')
    })

    it('returns pl when all locales are unsupported (fr, ja, es → pl)', () => {
      expect(detectLocale('fr, ja, es')).toBe('pl')
    })

    it('returns pl for empty string (no locale → Polish fallback)', () => {
      expect(detectLocale('')).toBe('pl')
    })
  })

  describe('SUPPORTED_LOCALES constant', () => {
    it('contains all 6 supported locales', () => {
      expect(SUPPORTED_LOCALES).toHaveLength(6)
    })

    it('includes pl, en, de, uk, ru, ar', () => {
      expect(SUPPORTED_LOCALES).toContain('pl')
      expect(SUPPORTED_LOCALES).toContain('en')
      expect(SUPPORTED_LOCALES).toContain('de')
      expect(SUPPORTED_LOCALES).toContain('uk')
      expect(SUPPORTED_LOCALES).toContain('ru')
      expect(SUPPORTED_LOCALES).toContain('ar')
    })
  })
})
