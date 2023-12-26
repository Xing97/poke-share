import { type Pokemon } from '../types'
import PokemonInfo from './PokemonInfo'

interface Props {
  pokemons: Pokemon[]
}

export default function PokemonTeam ({ pokemons }: Props): JSX.Element {
  return (
    <div className='flex w-full max-w-3xl flex-col gap-4'>
      {pokemons.map((pokemon) => (
        <PokemonInfo key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
