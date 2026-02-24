import { useTranslation } from 'react-i18next';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-10 w-10 overflow-hidden rounded-lg bg-white p-1">
                <img src="/logo.png" alt="Duchowy Wymiar Europy" className="h-full w-full object-contain" />
              </div>
              <div className="font-medium">{t('footer.brandName')}</div>
            </div>
            <p className="text-sm text-slate-400">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="mb-4 text-white">{t('footer.navigation')}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('hero')} className="transition-colors hover:text-white">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="transition-colors hover:text-white">
                  {t('nav.projects')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-project-page')} className="transition-colors hover:text-white">
                  {t('nav.aboutProject')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('founders-page')} className="transition-colors hover:text-white">
                  {t('nav.founders')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="transition-colors hover:text-white">
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">{t('footer.contact')}</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>{t('footer.contactLine1')}</p>
              <p>{t('footer.contactLine2')}</p>
              <p>{t('footer.contactLine3')}</p>
              <p>{t('footer.contactLine4')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-sm text-slate-400">
          © {currentYear} {t('footer.brandName')}. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
