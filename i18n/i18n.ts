import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translations from './locales/locales'

const i18nConfig = {
  resources: translations,  // resources são as nossas traduções
  fallbackLng: 'pt-BR',     // fallbackLng é o idioma padrão caso o browser não consiga detectar sozinho
  defaultNS: 'translations' // defaultNS é o namespace padrão, podemos usar 'translations'
}

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(i18nConfig);

export default i18n;