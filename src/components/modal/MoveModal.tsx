import { CATEGORY_BG_COLORS, TYPES_BG_COLORS } from '@/components/styles'
import useI18n from '@/hooks/useI18n'
import { getMoveCategory } from '@/model/constants'
import { type Move } from '@/model/pokemon'
import { useGameStore } from '@/stores/game'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import lazyWithPreload from 'react-lazy-with-preload'
import { twMerge } from 'tailwind-merge'

const TextModal = lazyWithPreload(async () => await import('@/components/modal/TextModal'))

void TextModal.preload()

interface Props {
  move: Move
}

export default function MoveModal ({ move }: Props): JSX.Element {
  const { t, i18n } = useTranslation()
  const { name } = useI18n()

  const generation = useGameStore(state => state.generation)
  const moveCategory = getMoveCategory(move, generation)

  const lang = i18n.language

  return (
    <section>
      <header className='flex gap-4'>
        <h1 className='text-3xl font-bold tracking-wide'>{name(move.name)}</h1>
      </header>
      <main className='mt-6 flex gap-6'>
        <div className='grid h-fit min-w-fit grid-cols-2 flex-col gap-x-1 gap-y-2'>
          <Row className={TYPES_BG_COLORS[move.type]} name='type' value={t('types.' + move.type)} />
          <Row className={CATEGORY_BG_COLORS[moveCategory]} name='category' value={t('category.' + moveCategory)} />
          <Row name='pp' value={move.pp.toLocaleString(lang)} />
          <Row name='power' value={move.power?.toLocaleString(lang)} />
          <Row name='accuracy' value={move.accuracy?.toLocaleString(lang)} />
          <Row name='priority' value={move.priority.toLocaleString(lang, { signDisplay: 'exceptZero' })} />
        </div>
        <Suspense>
          <TextModal entity={move} />
        </Suspense>
      </main>
    </section>
  )
}

function Row ({ name, value, className }: { name: string, value?: string, className?: string }): JSX.Element {
  const { t } = useTranslation()

  return (
    <>
      <span className={twMerge('text-white text-lg rounded-l-full bg-slate-600 px-6 py-1 text-center font-semibold tracking-wide', className)} >
        {t('move.' + name)}
      </span>
      <span className={twMerge('text-white text-lg rounded-r-full bg-slate-600 pl-2 pr-4 py-1 font-medium tracking-wide', className)}>
        {value ?? '—'}
      </span>
    </>
  )
}
