import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import pl from '../locales/pl.json';
import en from '../locales/en.json';
import de from '../locales/de.json';
import uk from '../locales/uk.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';

i18next.use(initReactI18next).init({
  resources: {
    pl: { translation: pl },
    en: { translation: en },
    de: { translation: de },
    uk: { translation: uk },
    ru: { translation: ru },
    ar: { translation: ar },
  },
  lng: 'pl',
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
