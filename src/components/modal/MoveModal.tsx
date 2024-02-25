import useFlavorText from '@/hooks/useFlavorText'
import { useI18nName } from '@/hooks/useI18nName'
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
  const i18n = useI18nName()
  const flavorText = useFlavorText()

  const generation = useGameStore(state => state.generation)

  const moveCategory = getMoveCategory(move, generation)

  return (
    <section className='flex flex-col gap-6'>
      <header className='flex items-center gap-4'>
        <h1 className='text-2xl font-bold tracking-wide'>{i18n(move.name)}</h1>
      </header>
      <main className='flex gap-6'>
        <div className='grid min-w-fit grid-cols-2 flex-col gap-1'>
          <Row className={TYPES_BG_COLORS[move.type]} name='type' value={t('types.' + move.type)} />
          <Row className={CATEGORY_BG_COLORS[moveCategory]} name='category' value={t('category.' + moveCategory)} />
          <Row name='pp' value={move.pp} />
          <Row name='power' value={move.power} />
          <Row name='accuracy' value={move.accuracy} />
          <Row name='priority' value={move.priority} />
        </div>
        <p>{flavorText(move.flavorText) ?? '???'}</p>
      </main>
    </section>
  )
}

function Row ({ name, value, className }: { name: string, value: string | number, className?: string }): JSX.Element {
  const { t } = useTranslation()

  return (
    <>
      <span className={twMerge('rounded-l-full bg-slate-600 px-6 py-1 text-center font-bold tracking-wide', className)} >
        {t('move.' + name)}
      </span>
      <span className={twMerge('rounded-r-full bg-slate-600 pl-2 pr-4 py-1 font-medium tracking-wide', className)}>
        {value ?? '—'}
      </span>
    </>
  )
}
