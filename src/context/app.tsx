import { createContext, useEffect, useState } from 'react'
import { parsePokemons } from '../services/input-analizer'
import { getInputFromPath, setInputInPath } from '../services/path'
import { fetchPokemon } from '../services/poke-api'
import { type Pokemon } from '../types'

export interface AppContextType {
  team: Pokemon[]
  input: string
  submit: (input: string) => void
  clearTeam: () => void
  isLoading: boolean
  showSettings: boolean
  toggleSettings: () => void
}

export const AppContext = createContext<AppContextType>({
  team: [],
  input: '',
  submit: (): void => {},
  clearTeam: (): void => {},
  isLoading: false,
  showSettings: false,
  toggleSettings: (): void => {}
})

interface Props {
  children: React.ReactNode
}

async function getTeam (input: string): Promise<Pokemon[]> {
  const info = parsePokemons(input)
  return await Promise.all(info.map(async (pokemon) => await fetchPokemon(pokemon)))
}

export function AppProvider ({ children }: Props): JSX.Element {
  const [input, setInput] = useState<string>('')
  const [team, setTeam] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const toggleSettings = (): void => {
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    const inputFromPath = getInputFromPath()

    if (inputFromPath !== '') {
      setInput(inputFromPath)
      getTeam(inputFromPath)
        .then((pokemons) => {
          setTeam(pokemons)
        })
        .catch(console.error)
        .finally(() => { setIsLoading(false) })
    } else {
      setIsLoading(false)
    }
  }, [])

  const submit = (input: string): void => {
    setInput(input)
    getTeam(input)
      .then((pokemons) => {
        setTeam(pokemons)
        setInputInPath(input)
      })
      .catch(console.error)
  }

  const clearTeam = (): void => {
    setTeam([])
  }

  return (
    <AppContext.Provider value={{
      team,
      input,
      submit,
      clearTeam,
      isLoading,
      showSettings,
      toggleSettings
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
