import { CATEGORY_BG_COLORS, TYPES_BG_COLORS } from '@/components/styles'
import useI18n from '@/hooks/useI18n'
import { getMoveCategory } from '@/model/constants'
import { type Move } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

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
      <main className='mt-6 flex gap-6'>
        <div className='grid h-fit min-w-fit grid-cols-2 flex-col gap-x-1 gap-y-2'>
          <Row className={TYPES_BG_COLORS[move.type]} name='type' value={t('types.' + move.type)} />
          <Row className={CATEGORY_BG_COLORS[moveCategory]} name='category' value={t('category.' + moveCategory)} />
          <Row name='pp' value={move.pp} />
          <Row name='power' value={move.power} />
          <Row name='accuracy' value={move.accuracy} />
          <Row name='priority' value={move.priority} />
        </div>
        <div className='flex flex-col gap-6'>
          {flavor != null && <p className='text-lg font-medium'>{flavor}</p>}
          {effect != null && <p>{effect}</p>}
          <a
            className='mt-auto self-end align-bottom text-blue-500 underline hover:text-white'
            href={`https://bulbapedia.bulbagarden.net/wiki/${move.name.en}_(move)`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Bulbapedia
          </a>
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
