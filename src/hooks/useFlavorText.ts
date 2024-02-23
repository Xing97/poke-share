import { type FlavorText } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'
import { type Language } from '@/stores/language'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export default function useFlavorText (): (field: FlavorText) => string {
  const game = useGameStore(store => store.game)
  const { i18n } = useTranslation()

  const language = i18n.language as Language

  return useCallback((field: FlavorText) => {
    return field[language]?.[game] ?? field[i18n.options.fallbackLng as Language]?.[game] ?? '???'
  }, [game, i18n.options.fallbackLng, language])
}
