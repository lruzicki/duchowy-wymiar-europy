import { useEffect, useState } from 'react';
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
