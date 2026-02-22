import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { I18nextProvider } from 'react-i18next'

import appCss from '../styles.css?url'
import i18n from '@/lib/i18n'
import { detectLocale } from '@/lib/detect-locale'
import type { SupportedLocale } from '@/lib/detect-locale'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Duchowy Wymiar Europy' },
      { name: 'description', content: 'Fundacja Duchowy Wymiar Europy — Sumienie. Solidarność. Odpowiedzialność. Pomagamy ofiarom wojny na Ukrainie i więźniom politycznym od 2008 roku.' },
      { property: 'og:title', content: 'Duchowy Wymiar Europy' },
      { property: 'og:description', content: 'Fundacja Duchowy Wymiar Europy — Sumienie. Solidarność. Odpowiedzialność. Pomagamy ofiarom wojny na Ukrainie i więźniom politycznym od 2008 roku.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/images/locations/data/zdjecie-o-fundacji.jpg' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const locale: SupportedLocale =
    typeof navigator !== 'undefined'
      ? detectLocale(navigator.languages.join(', '))
      : 'pl'

  if (typeof navigator !== 'undefined') {
    i18n.changeLanguage(locale)
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
