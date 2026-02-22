import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20 pt-32">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            {t('hero.title')}
          </h1>

          <p className="mb-8 text-xl text-primary">{t('hero.tagline')}</p>

          <Card className="border-none bg-white/85 shadow-xl backdrop-blur-sm">
            <CardContent className="space-y-5 p-7 leading-relaxed text-slate-800">
              <p>{t('hero.body1')}</p>
              <p>{t('hero.body2')}</p>
              <p className="font-medium text-slate-900">{t('hero.body3')}</p>
              <p className="font-medium text-slate-900">{t('hero.body4')}</p>
              <p>{t('hero.body5')}</p>
              <p className="font-medium text-slate-900">{t('hero.body6')}</p>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <Button size="lg" onClick={() => onNavigate('projects')} className="group">
              {t('hero.btnProjects')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('contact')}>
              {t('hero.btnContact')}
            </Button>
          </div>
        </div>

        <div className="lg:pt-8">
          <Card className="overflow-hidden border-none bg-white/70 shadow-xl backdrop-blur-sm">
            <img
              src="/images/locations/data/zdjecie-o-fundacji.jpg"
              alt={t('hero.title')}
              className="h-full w-full object-cover"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
