import { useContext } from 'react'
import './App.css'
import Header from './components/Header'
import PokemonInput from './components/PokemonInput'
import PokemonTeam from './components/PokemonTeam'
import Settings from './components/Settings'
import { AppContext } from './context/app'

export default function App (): JSX.Element {
  const { team, isLoading, showSettings } = useContext(AppContext)

  return (
    <div className='flex h-screen w-screen flex-col bg-gray-900 text-slate-100'>
      <Header />
      <main className='flex w-full flex-col items-center gap-6 self-center overflow-y-auto p-6'>
        {showSettings && <Settings />}
        {team.length === 0 && !isLoading
          ? <PokemonInput />
          : <PokemonTeam pokemons={team} />}
      </main>
    </div>
  )
}
