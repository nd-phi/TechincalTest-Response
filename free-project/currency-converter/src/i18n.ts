import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
import enTranslation from './locales/en/translation.json'
import esTranslation from './locales/es/translation.json'
import frTranslation from './locales/fr/translation.json'
import deTranslation from './locales/de/translation.json'
import jaTranslation from './locales/ja/translation.json'

// Define top 5 most popular currencies
export const TOP_5_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'] as const

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  ja: { translation: jaTranslation },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  interpolation: {
    escapeValue: false, // React already protects from xss
  },
})

export default i18n
