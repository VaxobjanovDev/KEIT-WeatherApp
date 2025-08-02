import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { UZ_TRANSLATION } from './uz'
import { EN_TRANSLATION } from './en'
import { RU_TRANSLATION } from './ru'
import { KOR_TRANSLATION } from './kor'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: EN_TRANSLATION,
      uz: UZ_TRANSLATION,
      ru: RU_TRANSLATION,
      ko: KOR_TRANSLATION
    },
    fallbackLng: 'uz',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
