import { useBoolean } from 'usehooks-ts'
import './App.css'
import Header from './components/Header'
import PokemonInput from './components/PokemonInput'
import PokemonTeam from './components/PokemonTeam'
import Settings from './components/Settings'
import { LoadingIcon } from './components/icons/LoadingIcon'
import { usePokemonStore } from './store/pokemon-store'

export default function App (): JSX.Element {
  const isLoading = usePokemonStore((state) => state.isLoading)
  const pokemonTeam = usePokemonStore((state) => state.pokemonTeam)
  const { value: showSettings, toggle: toggleSettings } = useBoolean(false)

  return (
    <div className='flex h-screen w-screen flex-col bg-gray-900 text-slate-100'>
      <Header toggleSettings={toggleSettings} />
      <main className='flex w-full grow flex-col items-center gap-6 self-center overflow-y-auto p-6'>
        {showSettings && <Settings />}
        {isLoading
          ? <LoadingIcon className='m-auto h-20 w-20 animate-spin' />
          : pokemonTeam.length === 0
            ? <PokemonInput />
            : <PokemonTeam pokemons={pokemonTeam} />}
      </main>
    </div>
  )
}
