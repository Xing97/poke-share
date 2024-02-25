import useI18n from '@/hooks/useI18n'
import { getMoveCategory } from '@/model/constants'
import { type Move } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { CATEGORY_BG_COLORS, TYPES_BG_COLORS } from '../styles'

interface Props {
  move: Move
}

export default function MoveModal ({ move }: Props): JSX.Element {
  const { t } = useTranslation()
  const { name, flavorText, effectText } = useI18n()

  const flavor = flavorText(move.flavorText)
  const effect = effectText(move.effectText)

  const generation = useGameStore(state => state.generation)
  const moveCategory = getMoveCategory(move, generation)

  return (
    <section>
      <header className='flex gap-4'>
        <h1 className='text-3xl font-bold tracking-wide'>{name(move.name)}</h1>
      </header>
      <main className='flex gap-6'>
        <div className='mt-6 grid min-w-fit grid-cols-2 flex-col gap-1'>
          <Row className={TYPES_BG_COLORS[move.type]} name='type' value={t('types.' + move.type)} />
          <Row className={CATEGORY_BG_COLORS[moveCategory]} name='category' value={t('category.' + moveCategory)} />
          <Row name='pp' value={move.pp} />
          <Row name='power' value={move.power} />
          <Row name='accuracy' value={move.accuracy} />
          <Row name='priority' value={move.priority} />
        </div>
        <div>
          {flavor != null && <p className='mt-6 text-lg font-medium'>{flavor}</p>}
          {effect != null && <p className='mt-6'>{effect}</p>}
        </div>
      </main>
    </section>
  )
}

function Row ({ name, value, className }: { name: string, value: string | number, className?: string }): JSX.Element {
  const { t } = useTranslation()

  return (
    <>
      <span className={twMerge('text-lg rounded-l-full bg-slate-600 px-6 py-1 text-center font-semibold tracking-wide', className)} >
        {t('move.' + name)}
      </span>
      <span className={twMerge('text-lg rounded-r-full bg-slate-600 pl-2 pr-4 py-1 font-medium tracking-wide', className)}>
        {value ?? '—'}
      </span>
    </>
  )
}
