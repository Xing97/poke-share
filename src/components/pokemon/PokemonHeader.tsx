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
      <h2 className='font-mono text-slate-600 dark:text-slate-400'>{number}</h2>
      <h1 className='text-xl font-bold tracking-wide'>{pokemon.nickname ?? pokemonName}</h1>
      {pokemon.nickname != null && <h3 className='text-slate-800 dark:text-slate-200'>{`(${pokemonName})`}</h3>}
    </div>
  )
}
