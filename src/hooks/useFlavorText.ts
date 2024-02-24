import { GAMES, GEN_GAME } from '@/model/constants'
import { type FlavorText } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'
import { type Language } from '@/stores/language'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function useFlavorText (): (field: FlavorText) => string | undefined {
  const generation = useGameStore(store => store.generation)
  const game = useGameStore(store => store.game)
  const { i18n } = useTranslation()

  const language = i18n.language as Language

  const sortedGames = useMemo(() => {
    const index = GAMES.indexOf(GEN_GAME[generation])
    return GAMES.slice(index).concat(GAMES.slice(0, index).reverse())
  }, [generation])

  return useCallback((field: FlavorText) => {
    const lang = field[language] ?? field[i18n.options.fallbackLng as Language]

    if (lang == null) return undefined

    if (lang[game] != null) return lang[game]

    const findGame = sortedGames.find(game => lang[game] != null)

    return findGame == null ? undefined : lang[findGame]
  }, [game, i18n.options.fallbackLng, language, sortedGames])
}
