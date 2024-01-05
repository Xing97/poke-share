import { type Pokemon } from '@/model/pokemon'
import { parsePokemons } from '@/services/input-analizer'
import { getInputFromPath, setInputInPath } from '@/services/path'
import { create } from 'zustand'

interface PokemonStore {
  input: string
  pokemonTeam: Pokemon[]
  loading: boolean
  error: string
  submit: (input: string) => void
}

export const usePokemonStore = create<PokemonStore>()(
  (set) => ({
    input: '',
    pokemonTeam: [],
    loading: false,
    error: '',
    submit (input) {
      set({ loading: true })
      set({ input })
      parsePokemons(input)
        .then((team) => { set({ pokemonTeam: team }); setInputInPath(input) })
        .catch(() => { set({ error: 'Error' }) })
        .finally(() => { set({ loading: false }) })
    }
  })
)

const inputFromPath = getInputFromPath()

if (inputFromPath !== '') {
  usePokemonStore.getState().submit(inputFromPath)
}
