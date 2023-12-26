import { useI18nName } from '../../hooks/useI18nName'
import { type Move } from '../../types'
import PokemonType from './PokemonType'

interface Props {
  moves: Move[]
}

export default function PokemonMoves ({ moves }: Props): JSX.Element {
  const i18n = useI18nName()

  return (
    <div className='grid grid-cols-2 gap-3'>
      {moves.map(move =>
        <PokemonType
          className='flex justify-between rounded-xl px-2 align-middle shadow'
          key={move.id}
          type={move.type}
        >
          <h3 className='text-shadow truncate px-1 font-bold tracking-wider'>
            {i18n(move.name)}
          </h3>
          <img className='object-scale-down px-1' src={`src/assets/${move.category}.png`} alt={move.category} />
        </PokemonType>)}
    </div>
  )
}
