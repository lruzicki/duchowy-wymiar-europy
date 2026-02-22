import { useEffect, useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { AboutProjectPage } from './AboutProjectPage';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { FoundersPage } from './FoundersPage';
import { Hero } from './Hero';
import { Navigation } from './Navigation';
import { ProjectsMap } from './ProjectsMap';
import type { LocationListItem } from '@/lib/locations';

interface FigmaAppProps {
  locations?: LocationListItem[];
}

function CTASection({ onNavigate }: { onNavigate: (section: string) => void }) {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
          <Heart className="size-6 text-white" />
        </div>
        <h2 className="text-3xl font-semibold leading-tight text-primary-foreground md:text-5xl">
          {t('cta.heading')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/70">
          {t('cta.body')}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" variant="secondary" className="gap-2" onClick={() => onNavigate('projects')}>
            {t('cta.btnProjects')}
            <ArrowRight className="size-4" />
          </Button>
          <a href="mailto:kontakt@dwe.org.pl">
            <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              {t('cta.btnContact')}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FigmaApp({ locations = [] }: FigmaAppProps) {
  const [currentPage, setCurrentPage] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    setCurrentPage(sectionId);

    if (sectionId === 'founders-page' || sectionId === 'about-project-page') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (currentPage === 'founders-page' || currentPage === 'about-project-page') {
        return;
      }

      const sections = ['hero', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetHeight, offsetTop } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentPage(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const renderContent = () => {
    if (currentPage === 'founders-page') {
      return <FoundersPage />;
    }
    if (currentPage === 'about-project-page') {
      return <AboutProjectPage />;
    }

    return (
      <>
        <section id='hero'>
          <Hero onNavigate={scrollToSection} />
        </section>
        <section id='projects'>
          <ProjectsMap locations={locations} />
        </section>
        <CTASection onNavigate={scrollToSection} />
        <section id='contact'>
          <Contact />
        </section>
      </>
    );
  };

  return (
    <div className='min-h-screen bg-white'>
      <Navigation onNavigate={scrollToSection} currentPage={currentPage} />
      {renderContent()}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
