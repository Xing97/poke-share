import { GAMES, GEN_GAME } from '@/model/constants'
import { type EffectText, type FlavorText, type I18nName } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'
import { type Language } from '@/stores/language'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface I18n {
  resolveName: (field: I18nName) => string
  resolveFlavorText: (field: FlavorText) => string | undefined
  resolveEffectText: (field: EffectText) => string | undefined
}

export default function useI18n(): I18n {
  const { i18n } = useTranslation()
  const language = i18n.language as Language

  const resolveName = useCallback(
    (field: I18nName) =>
      field[language] ?? field[i18n.options.fallbackLng as Language] ?? field.name,
    [i18n.options.fallbackLng, language]
  )

  const resolveEffectText = useCallback(
    (field: EffectText) => (field[language] ?? field[i18n.options.fallbackLng as Language])?.effect,
    [i18n.options.fallbackLng, language]
  )

  const generation = useGameStore((store) => store.generation)
  const game = useGameStore((store) => store.game)

  const sortedGames = useMemo(() => {
    const index = GAMES.indexOf(GEN_GAME[generation])
    return GAMES.slice(index).concat(GAMES.slice(0, index).reverse())
  }, [generation])

  const resolveFlavorText = useCallback(
    (field: FlavorText) => {
      const lang = field[language] ?? field[i18n.options.fallbackLng as Language]

      if (lang == null) return undefined

      if (lang[game] != null) return lang[game]

      const findGame = sortedGames.find((game) => lang[game] != null)

      return findGame == null ? undefined : lang[findGame]
    },
    [game, i18n.options.fallbackLng, language, sortedGames]
  )

  return {
    resolveName,
    resolveFlavorText,
    resolveEffectText,
  }
}
