import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next.use(Backend).use(initReactI18next);
// .init({
//   fallbackLng: 'en',
//   lng: 'en',
//   ns: ['landing-page', 'auth', 'event', 'system', 'title'],
//   backend: {
//     loadPath: '/locales/{{lng}}/{{ns}}.json',
//   },
//   debug: true,
//   interpolation: {
//     escapeValue: false,
//   },
// });

export default i18next;
