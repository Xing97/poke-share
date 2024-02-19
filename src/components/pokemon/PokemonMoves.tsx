import PokemonType from '@/components/pokemon/PokemonType'
import { useI18nName } from '@/hooks/useI18nName'
import { getMoveCategory } from '@/model/constants'
import { type Move } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'

interface Props {
  moves: Move[]
}

export default function PokemonMoves ({ moves }: Props): JSX.Element {
  const i18n = useI18nName()
  const generation = useGameStore(state => state.generation)

  return (
    <div className='grid grid-cols-pokemon-moves gap-3'>
      {moves.map(move =>
        <PokemonType
          className='flex h-9 items-center justify-between rounded-xl px-2 shadow'
          key={move.id}
          type={move.type}
        >
          <span className='text-shadow truncate px-1 font-bold tracking-wider'>
            {i18n(move.name)}
          </span>
          <img
            className='h-full p-0.5'
            src={`/img/${getMoveCategory(move, generation)}.png`}
            alt={getMoveCategory(move, generation)}
          />
        </PokemonType>)}
    </div>
  )
}
