import { type Pokemon } from '@/model/pokemon'
import { parsePokemons } from '@/services/input-analizer'
import { getInputFromPath, setInputInPath } from '@/services/path'
import { create } from 'zustand'

interface PokemonStore {
  title: string
  input: string
  pokemonTeam: Pokemon[]
  loading: boolean
  error: string
  submit: (input: string, title: string) => void
}

export const usePokemonStore = create<PokemonStore>()(
  (set) => ({
    title: '',
    input: '',
    pokemonTeam: [],
    loading: false,
    error: '',
    submit (input, title) {
      set({ title, input, loading: true })
      parsePokemons(input)
        .then((team) => { set({ pokemonTeam: team }); setInputInPath(input, title) })
        .catch(() => { set({ error: 'Error' }) })
        .finally(() => { set({ loading: false }) })
    }
  })
)

const { title, input } = getInputFromPath()

if (input !== '') {
  usePokemonStore.getState().submit(input, title)
}
