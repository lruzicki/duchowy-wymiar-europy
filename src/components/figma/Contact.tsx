import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Contact() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4">{t('contact.heading')}</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('contact.cardTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-lg text-slate-700">
            <p>Strona Konto i kontakt</p>
            <p>Europejskie Centrum Solidarności</p>
            <p>pI. Solidarności 1,</p>
            <p>80-863 Gdańsk</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
