import { createFileRoute } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DocumentRenderer } from '@keystatic/core/renderer'
import type { SupportedLocale } from '@/lib/detect-locale'

import { Footer } from '@/components/figma/Footer'
import { Navigation } from '@/components/figma/Navigation'
import {
  getProjectUpdate,
  selectLocalizedDocument,
  selectLocalizedText,
} from '@/lib/project-updates'

export const Route = createFileRoute('/aktualnosci')({
  loader: async () => {
    const update = await getProjectUpdate()
    return { update }
  },
  component: ProjectUpdatesPage,
})

function navigateToMainSection(section: string) {
  if (section === 'hero' || section === 'projects' || section === 'contact') {
    window.location.href = `/#${section}`
    return
  }

  if (section === 'about-project-page' || section === 'founders-page') {
    window.location.href = `/?page=${section}`
    return
  }

  window.location.href = '/'
}

function asSupportedLocale(language: string): SupportedLocale {
  const base = language.toLowerCase().split('-')[0] as SupportedLocale
  const supported: Array<SupportedLocale> = ['pl', 'en', 'de', 'uk', 'ru', 'ar']
  return supported.includes(base) ? base : 'pl'
}

function ProjectUpdatesPage() {
  const { t, i18n } = useTranslation()
  const { update } = Route.useLoaderData()
  const locale = asSupportedLocale(i18n.resolvedLanguage ?? i18n.language)

  const content = useMemo(() => {
    if (!update) {
      return {
        title: t('news.fallback.title'),
        lead: t('news.fallback.lead'),
        updatedAt: '',
        coverImage: '',
        sections: [
          {
            key: 'co-juz-zrobilismy',
            title: t('news.fallback.sections.done.title'),
            content: [],
          },
          {
            key: 'co-dalej',
            title: t('news.fallback.sections.next.title'),
            content: [],
          },
          {
            key: 'jak-pomoc',
            title: t('news.fallback.sections.help.title'),
            content: [],
          },
        ],
      }
    }

    return {
      title: selectLocalizedText(update.title, locale),
      lead: selectLocalizedText(update.lead, locale),
      updatedAt: update.updatedAt,
      coverImage: update.coverImage,
      sections: update.sections.map((section) => ({
        key: section.key,
        title: selectLocalizedText(section.title, locale),
        content: selectLocalizedDocument(section.content, locale),
      })),
    }
  }, [locale, t, update])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation
        onNavigate={navigateToMainSection}
        currentPage="aktualnosci"
      />
      <main className="pt-24 flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-18">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-600">
                  {t('news.badge')}
                </p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                  {content.title || t('news.fallback.title')}
                </h1>
                {content.lead ? (
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
                    {content.lead}
                  </p>
                ) : null}
                {content.updatedAt ? (
                  <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {t('news.updatedAt')}: {content.updatedAt}
                  </p>
                ) : null}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                {content.coverImage ? (
                  <img
                    src={content.coverImage}
                    alt={content.title || t('news.fallback.title')}
                    className="h-full max-h-[420px] w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center bg-slate-100 px-8 text-center text-sm text-slate-500">
                    {t('news.fallback.coverPlaceholder')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl space-y-5 px-4 sm:px-6 lg:px-8">
            {content.sections.map((section) => (
              <article
                key={section.key}
                className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8"
              >
                <h2 className="text-2xl font-semibold text-slate-900">
                  {section.title || t('news.fallback.sectionTitle')}
                </h2>
                {section.content.length ? (
                  <div className="prose prose-slate mt-4 max-w-none prose-a:text-blue-700 hover:prose-a:text-blue-800">
                    <DocumentRenderer
                      document={
                        section.content as Parameters<
                          typeof DocumentRenderer
                        >[0]['document']
                      }
                    />
                  </div>
                ) : (
                  <p className="mt-4 text-slate-600">
                    {t('news.fallback.emptySection')}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer onNavigate={navigateToMainSection} />
    </div>
  )
}
