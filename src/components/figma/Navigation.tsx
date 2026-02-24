import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentPage: string;
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('nav.about'), value: 'hero' },
    { label: t('nav.projects'), value: 'projects' },
    { label: t('nav.aboutProject'), value: 'about-project-page' },
    { label: t('nav.founders'), value: 'founders-page' },
    { label: t('nav.contact'), value: 'contact' },
  ];

  const handleNavClick = (value: string) => {
    onNavigate(value);
    setIsOpen(false);
  };

  const handleDocumentsClick = () => {
    window.open('https://onedrive.live.com/?id=YOUR_LINK', '_blank');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => handleNavClick('hero')} className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-white/95 p-1 shadow-sm ring-1 ring-slate-200/80 group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Duchowy Wymiar Europy" className="h-full w-full rounded-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm uppercase tracking-wider text-foreground/80">{t('nav.foundation')}</div>
              <div className="font-semibold text-foreground">{t('nav.foundationName')}</div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Button
                key={item.value}
                variant="ghost"
                onClick={() => handleNavClick(item.value)}
                className={`${
                  currentPage === item.value ? 'bg-primary/10 text-primary' : 'text-foreground/70'
                } hover:text-primary hover:bg-primary/5`}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={handleDocumentsClick}
              className="text-foreground/70 hover:text-primary hover:bg-primary/5 gap-2"
            >
              <FileText className="w-4 h-4" />
              {t('nav.documents')}
              <ExternalLink className="w-3 h-3" />
            </Button>
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t">
          <div className="px-4 py-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.value
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleDocumentsClick}
              className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-foreground/70 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <FileText className="w-4 h-4" />
              {t('nav.documents')}
              <ExternalLink className="w-3 h-3" />
            </button>
            <div className="px-4 py-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
