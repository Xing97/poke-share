import { useTranslation } from 'react-i18next'
import { type Pokemon } from '../types'
import PokemonAbility from './pokemon/PokemonAbility'
import PokemonHeader from './pokemon/PokemonHeader'
import PokemonImage from './pokemon/PokemonImage'
import PokemonMoves from './pokemon/PokemonMoves'
import PokemonNature from './pokemon/PokemonNature'
import PokemonStats from './pokemon/PokemonStats'
import PokemonType from './pokemon/PokemonType'

interface Props {
  pokemon: Pokemon
}

export default function PokemonInfo ({ pokemon }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className='flex w-auto flex-col gap-5 rounded-2xl border border-slate-500 bg-slate-700 p-5'>
      <PokemonHeader pokemon={pokemon} />
      <div className='flex gap-10'>
        <div className='flex flex-col gap-4'>
          <PokemonImage pokemon={pokemon} />
          <div className='flex gap-2 self-center'>
            {pokemon.types.map((type) => (
              <PokemonType
                className='text-shadow w-20 rounded-full text-center text-sm font-semibold'
                key={type}
                type={type}
              >
                {t('types.' + type)}
              </PokemonType>
            ))}
          </div>
          <div className='flex flex-col justify-start gap-2 font-semibold tracking-wider'>
            <PokemonAbility ability={pokemon.ability} />
            <PokemonNature nature={pokemon.nature} />
          </div>
        </div>
        <div className='flex grow flex-col justify-between'>
          <PokemonStats pokemon={pokemon} />
          <PokemonMoves moves={pokemon.moves} />
        </div>
      </div>
    </div>
  )
}
