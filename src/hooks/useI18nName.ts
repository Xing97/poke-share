import { useTranslation } from 'react-i18next'
import { type I18nName, type Language } from '../types'

export function useI18nName (): (field: I18nName) => string {
  const { i18n } = useTranslation()

  const language = i18n.language as Language

  return (field: I18nName) => field[language] ??
    field[i18n.options.fallbackLng as Language] ??
    field.name
}
