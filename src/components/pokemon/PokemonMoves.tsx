import MoveModal from '@/components/modal/MoveModal'
import PokemonType from '@/components/pokemon/PokemonType'
import useI18n from '@/hooks/useI18n'
import { getMoveCategory, isBeforeGame } from '@/model/constants'
import { type Move } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'
import { useModalStore } from '@/stores/modal'

interface Props {
  moves: Move[]
}

export default function PokemonMoves ({ moves }: Props): JSX.Element {
  const { resolveName } = useI18n()
  const generation = useGameStore(state => state.generation)
  const game = useGameStore(state => state.game)
  const showModal = useModalStore(state => state.showModal)

  return (
    <div className='grid grid-cols-pokemon-moves gap-3'>
      {moves.map(move =>
        <button
          key={move.id}
          className='transition-transform hover:scale-105'
          onClick={() => { showModal(<MoveModal move={move} />) }}
        >
          <PokemonType
            className='flex h-9 items-center justify-between rounded-xl px-1 shadow-box'
            type={move.pastValues.find(pv => isBeforeGame(pv.game, game) && pv.type != null)?.type ?? move.type}
          >
            <span className='text-shadow truncate px-1 font-bold tracking-wider'>
              {resolveName(move.name)}
            </span>
            <img
              className='h-full p-0.5'
              src={`/img/${getMoveCategory(move, generation)}.png`}
              alt={getMoveCategory(move, generation)}
            />
          </PokemonType>
        </button>)}
    </div>
  )
}
