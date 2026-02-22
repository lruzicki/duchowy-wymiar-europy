import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export function FoundersPage() {
  const { t } = useTranslation();

  const people = [
    {
      name: 'Krzysztof Frączak',
      description: t('founders.people.krzysztof_fraczak'),
    },
    {
      name: 'Arkadiusz Rybicki',
      description: t('founders.people.arkadiusz_rybicki'),
    },
    {
      name: 'Maciej Płażyński',
      description: t('founders.people.maciej_plazynski'),
    },
    {
      name: 'Jerzy Borowczak',
      description: t('founders.people.jerzy_borowczak'),
    },
    {
      name: 'Leszek Juchniewicz',
      description: t('founders.people.leszek_juchniewicz'),
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h1 className="mb-4">{t('founders.heading')}</h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {t('founders.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {people.map((person) => (
            <Card key={person.name} className="border-slate-200/70 bg-white/90 shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-2 text-2xl font-semibold text-slate-900">{person.name}</h2>
                <p className="leading-relaxed text-slate-700">{person.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
