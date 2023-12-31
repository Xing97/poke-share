import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { parsePokemons } from '../services/input-analizer'
import { getInputFromPath, setInputInPath } from '../services/path'
import { fetchPokemon } from '../services/poke-api'
import { Game, Generation, Theme, type Pokemon } from '../types.d'

interface Store {
  generation: Generation
  game: Game
  theme: Theme
  setGeneration: (generation: Generation) => void
  setGame: (game: Game) => void
  setTheme: (theme: Theme) => void

  input: string
  pokemonTeam: Pokemon[]
  isLoading: boolean
  submit: (input: string) => void
  clearTeam: () => void
}

const inputFromPath = getInputFromPath()

export const usePokemonStore = create<Store>()(
  persist(
    (set) => ({
      generation: Generation.IX,
      game: Game.ScarletViolet,
      theme: Theme.Auto,
      setGeneration: (generation: Generation) => { set({ generation }) },
      setGame: (game: Game) => { set({ game }) },
      setTheme: (theme: Theme) => { set({ theme }) },
      input: inputFromPath,
      pokemonTeam: [],
      isLoading: inputFromPath !== '',
      submit: (input: string) => {
        set({ isLoading: true })
        set({ input })
        getTeam(input)
          .then((pokemons) => {
            set({ pokemonTeam: pokemons })
            setInputInPath(input)
          })
          .catch(console.error)
          .finally(() => { set({ isLoading: false }) })
      },
      clearTeam: () => { set({ pokemonTeam: [] }) }
    }),
    {
      name: 'settings',
      partialize: (state) => ({
        generation: state.generation,
        game: state.game,
        theme: state.theme
      })
    }
  )
)

if (inputFromPath !== '') {
  getTeam(inputFromPath)
    .then(pokemonTeam => { usePokemonStore.setState({ pokemonTeam, isLoading: false }) })
    .catch(console.error)
    .finally(() => { usePokemonStore.setState({ isLoading: false }) })
}

async function getTeam (input: string): Promise<Pokemon[]> {
  const info = parsePokemons(input)
  return await Promise.all(info.map(async (pokemon) => await fetchPokemon(pokemon)))
}
