import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import PokemonInput from './components/PokemonInput'
import PokemonTeam from './components/PokemonTeam'
import { type Pokemon } from './types'

export default function App (): JSX.Element {
  const [pokeList, setPokeList] = useState<Pokemon[]>()

  return (
    <div className='flex h-screen w-screen flex-col bg-gray-900 text-slate-100'>
      <Header onClick={(): void => { setPokeList(undefined) }} />
      <main className='flex w-full flex-col items-center gap-6 self-center overflow-y-auto p-6'>
        {pokeList === undefined
          ? <PokemonInput setPokemons={setPokeList} />
          : <PokemonTeam pokemons={pokeList} />}
      </main>
    </div>
  )
}
