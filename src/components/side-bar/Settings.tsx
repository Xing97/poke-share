import Select from '@/components/Select'
import { GEN_GAMES } from '@/model/constants'
import { Generation, useGameStore } from '@/stores/game'
import { Language, useLanguageStore } from '@/stores/language'
import { Theme, useThemeStore } from '@/stores/theme'
import Link from '../Link'

export default function Settings(): JSX.Element {
  const generation = useGameStore((state) => state.generation)
  const setGeneration = useGameStore((state) => state.setGeneration)

  const game = useGameStore((state) => state.game)
  const setGame = useGameStore((state) => state.setGame)

  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  return (
    <div className="flex size-full flex-col gap-8 p-4">
      <Select
        name="generations"
        options={Object.values(Generation)}
        selected={generation}
        setSelected={setGeneration}
      />
      <Select
        name="version-groups"
        options={GEN_GAMES[generation]}
        selected={game}
        setSelected={setGame}
      />
      <Select
        name="languages"
        description="English has the most accurate information"
        options={Object.values(Language)}
        selected={language}
        setSelected={setLanguage}
      />
      <Select
        name="themes"
        options={Object.values(Theme)}
        selected={theme}
        setSelected={setTheme}
      />
      <footer className="mt-auto">
        <span className="text-slate-600 dark:text-slate-400">
          Data powered by <Link href="https://pokeapi.co/">PokéAPI</Link>
        </span>
      </footer>
    </div>
  )
}
