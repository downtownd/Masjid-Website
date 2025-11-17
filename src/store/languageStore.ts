import { create } from 'zustand'
import { Language } from '../types'
import { translations } from '../i18n/translations'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  initLanguage: () => void
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: 'en',

  setLanguage: (lang: Language) => {
    localStorage.setItem('masjid-language', lang)
    document.documentElement.dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr'
    set({ language: lang })
  },

  t: (key: string) => {
    const { language } = get()
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  },

  initLanguage: () => {
    const savedLang = localStorage.getItem('masjid-language') as Language
    if (savedLang && ['en', 'ar', 'ur', 'so'].includes(savedLang)) {
      get().setLanguage(savedLang)
    }
  },
}))
