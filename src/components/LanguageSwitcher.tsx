/**
 * LanguageSwitcher — dropdown component for manual language override.
 *
 * Displays the currently active language as a flag emoji + code abbreviation.
 * Clicking opens a dropdown with all 6 supported languages.
 * Selecting a language calls i18n.changeLanguage(), which triggers a re-render
 * of all components using useTranslation().
 *
 * Supported locales: pl, en, de, uk, ru, ar
 * Flag icons: emoji characters (render natively in all modern browsers)
 * Active language: highlighted with bg-primary/10 text-primary in the dropdown
 */
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { SupportedLocale } from '@/lib/detect-locale'

/** Language option descriptor — code, display label, and emoji flag. */
type LanguageOption = {
  code: SupportedLocale
  label: string
  flag: string
}

const LANGUAGES: LanguageOption[] = [
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'uk', label: 'UK', flag: '🇺🇦' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'ar', label: 'AR', flag: '🇸🇦' },
]

/**
 * Renders a shadcn/ui DropdownMenu that lets the user manually switch the
 * active language.  The trigger button shows the current language flag and code.
 * Each menu item calls `i18n.changeLanguage(code)` on click.
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-foreground/70 hover:text-primary hover:bg-primary/5"
        >
          <span aria-hidden="true">{currentLang.flag}</span>
          <span>{currentLang.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={
              lang.code === i18n.language
                ? 'bg-primary/10 text-primary font-medium'
                : ''
            }
          >
            <span className="mr-2" aria-hidden="true">
              {lang.flag}
            </span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
