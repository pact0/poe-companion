import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, pl } from '../languages';

export const defaultNS = 'ns' as const;
export const supportedLanguages = [{ local: "en", name: "English" }, { locale: "pl", name: "Polski" }] as const;
export type SupportedLanguages = typeof supportedLanguages;

export const resources = {
  en: { [defaultNS]: en },
  pl: { [defaultNS]: pl }
};


i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources,
  defaultNS,
});
