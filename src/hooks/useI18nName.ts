import { type I18nName } from '@/model/pokemon'
import { type Language } from '@/stores/language'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export function useI18nName (): (field: I18nName) => string {
  const { i18n } = useTranslation()

  const language = i18n.language as Language

  return useCallback((field: I18nName) => field[language] ??
    field[i18n.options.fallbackLng as Language] ??
    field.name, [i18n.options.fallbackLng, language])
}
