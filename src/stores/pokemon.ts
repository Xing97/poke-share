import { type Pokemon } from '@/model/pokemon'
import { parsePokemons } from '@/services/input-analizer'
import { getInputFromPath, setInputInPath } from '@/services/path'
import i18n from '@/setup/i18n'
import { Sidebar, useSidebarStore } from '@/stores/sidebar'
import { toast } from 'sonner'
import { create } from 'zustand'
import { useHistoryStore } from './history'

interface PokemonStore {
  title: string
  input: string
  pokemonTeam: Pokemon[]
  loading: boolean
  setInput: (input: string) => void
  submit: (input: string, title: string, addHistory?: boolean) => void
}

export const usePokemonStore = create<PokemonStore>()(
  (set) => ({
    title: '',
    input: '',
    pokemonTeam: [],
    loading: false,
    setInput (input: string) { set({ input }) },
    submit (input, title, addHistory = false) {
      set({ title, input, loading: true })
      parsePokemons(input)
        .then((team) => {
          set({ pokemonTeam: team })
          setInputInPath(input, title)
          if (window.matchMedia('(max-width: 768px)').matches) {
            useSidebarStore.getState().setSidebar(Sidebar.Pokemon)
          }
          if (addHistory) {
            useHistoryStore.getState().add(input, title)
          }
        })
        .catch((e) => { toast.error(i18n.t('input.error')); console.error(e) })
        .finally(() => { set({ loading: false }) })
    }
  })
)

const { title, input } = getInputFromPath()

if (input !== '') {
  usePokemonStore.getState().submit(input, title, true)
}
