import { useI18nName } from '@/hooks/useI18nName'
import { type Pokemon } from '@/model/pokemon'

interface Props {
  pokemon: Pokemon
}

export default function PokemonHeader ({ pokemon }: Props): JSX.Element {
  const i18n = useI18nName()

  const number = '#' + pokemon.order.toString().padStart(3, '0')
  const pokemonName = i18n(pokemon.name)

  return (
    <div className='flex items-center gap-2'>
      <span className='font-mono text-slate-600 dark:text-slate-300'>{number}</span>
      <span className='text-xl font-bold tracking-wide'>{pokemon.nickname ?? pokemonName}</span>
      {pokemon.nickname != null && <span className='text-slate-800 dark:text-slate-200'>{`(${pokemonName})`}</span>}
    </div>
  )
}
