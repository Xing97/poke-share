import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { Language } from '../types.d'

const lngMap = new Map<string, Language>()
lngMap.set('zh-HK', Language.ChineseTraditional)
lngMap.set('zh-TW', Language.ChineseTraditional)
lngMap.set('zh-CN', Language.ChineseSimplified)
lngMap.set('zh-SG', Language.ChineseSimplified)
lngMap.set('zh', Language.ChineseSimplified)

export const i18n = i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: detectLanguage(),
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}-{{ns}}.json'
    }
  })

function detectLanguage (): Language | undefined {
  const json = window.localStorage.getItem('language')
  if (json != null) {
    return JSON.parse(json) as Language
  }

  for (const l of navigator.languages) {
    const key = l.split('-')[0]
    if (Object.values(Language).includes(key as Language)) return key as Language
    if (lngMap.has(key)) return lngMap.get(key)
  }
  return undefined
}
