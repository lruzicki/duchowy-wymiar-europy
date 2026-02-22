import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20 pt-32">
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit border border-border text-xs font-medium tracking-wide text-muted-foreground">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="text-lg font-medium tracking-wide text-primary/80 md:text-xl">
              {t('hero.tagline')}
            </p>
            {/* Body paragraphs */}
            <div className="max-w-lg space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>{t('hero.body1')}</p>
              <p>{t('hero.body2')}</p>
              <p className="font-medium text-slate-900">{t('hero.body3')}</p>
              <p className="font-medium text-slate-900">{t('hero.body4')}</p>
              <p>{t('hero.body5')}</p>
              <p className="font-medium text-slate-900">{t('hero.body6')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" onClick={() => onNavigate('projects')} className="gap-2">
                {t('hero.btnProjects')}
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('contact')}>
                {t('hero.btnContact')}
              </Button>
            </div>
          </div>

          {/* Image column */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-foreground/5">
              <img
                src="/images/locations/data/zdjecie-o-fundacji.jpg"
                alt={t('hero.title')}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-4 rounded-xl border border-border bg-card p-4 shadow-lg md:-left-8">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t('hero.floatingLabel')}
              </p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {t('hero.floatingValue')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
