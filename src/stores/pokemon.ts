import { type Pokemon } from '@/model/pokemon'
import { parsePokemons } from '@/services/input-analizer'
import { getInputFromPath, setInputInPath } from '@/services/path'
import i18n from '@/setup/i18n'
import { toast } from 'sonner'
import { create } from 'zustand'

interface PokemonStore {
  title: string
  input: string
  pokemonTeam: Pokemon[]
  loading: boolean
  submit: (input: string, title: string) => void
}

export const usePokemonStore = create<PokemonStore>()(
  (set) => ({
    title: '',
    input: '',
    pokemonTeam: [],
    loading: false,
    submit (input, title) {
      set({ title, input, loading: true })
      parsePokemons(input)
        .then((team) => { set({ pokemonTeam: team }); setInputInPath(input, title) })
        .catch((e) => { toast.error(i18n.t('input.error')); console.error(e) })
        .finally(() => { set({ loading: false }) })
    }
  })
)

const { title, input } = getInputFromPath()

if (input !== '') {
  usePokemonStore.getState().submit(input, title)
}
