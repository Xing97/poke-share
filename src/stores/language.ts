import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum Language {
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  German = 'de',
  Italian = 'it',
  Korean = 'ko',
  Japanese = 'ja',
  ChineseSimplified = 'zh-Hans',
  ChineseTraditional = 'zh-Hant'
}

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist((set) => ({
    language: Language.English,
    setLanguage (language) { set({ language }) }
  }),
  { name: '__MW::locale' })
)
