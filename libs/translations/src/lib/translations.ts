import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, pl } from '../languages';

export const resources = {
  en: { ns: en },
  pl: { ns: pl }
};

export const defaultNS = 'ns';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources,
  defaultNS,
});
