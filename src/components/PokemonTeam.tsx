import PokemonInfo from '@/components/PokemonInfo'
import { usePokemonStore } from '@/stores/pokemon'

export default function PokemonTeam (): JSX.Element {
  const team = usePokemonStore((state) => state.pokemonTeam)
  return (
    <div className='flex w-full max-w-3xl flex-col gap-4'>
      {team.map((pokemon) => (
        <PokemonInfo key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
