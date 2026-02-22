import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export function AboutProjectPage() {
  const { t } = useTranslation();
  const content = t('aboutProject.body');
  const paragraphs = content.split('\n\n');

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h1 className="mb-4">{t('aboutProject.heading')}</h1>
        </div>

        <Card className="border-slate-200/70 bg-white/90 shadow-sm">
          <CardContent className="space-y-6 p-6 leading-relaxed text-slate-700 sm:p-8">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
