import { locales } from "@/assets/languages"
import { useLanguageStore } from "@/stores/language"
import i18n, { type LanguageDetectorAsyncModule } from "i18next"
import { initReactI18next } from "react-i18next"

const resources = Object.fromEntries(
  Object.entries(locales).map((entry) => [entry[0], { translation: entry[1] }])
)

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (lng) => {
    lng(useLanguageStore.getState().language)
  },
  init: () => {},
}

void i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: "en",
    resources,
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
