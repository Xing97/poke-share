import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { Language } from './types.d'

const lngMap = new Map<string, Language>()
lngMap.set('zh-HK', Language.ChineseTraditional)
lngMap.set('zh-TW', Language.ChineseTraditional)
lngMap.set('zh-CN', Language.ChineseSimplified)
lngMap.set('zh-SG', Language.ChineseSimplified)
lngMap.set('zh', Language.ChineseSimplified)

await i18n
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

export default i18n

function detectLanguage (): Language {
  const json = window.localStorage.getItem('language')
  if (json != null) {
    return JSON.parse(json) as Language
  }

  for (const l of navigator.languages) {
    const key = l.split('-')[0] as Language
    if (Object.values(Language).includes(key)) return key

    const lang = lngMap.get(l)
    if (lang !== undefined) return lang
  }
  return Language.English
}
