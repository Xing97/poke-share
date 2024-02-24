import DeleteIcon from '@/icons/DeleteIcon'
import { usePokemonStore } from '@/stores/pokemon'
import { useSavesStore, type Save } from '@/stores/saves'
import { useTranslation } from 'react-i18next'

export default function Store (): JSX.Element {
  const { t } = useTranslation()

  const saves = useSavesStore(state => state.saves)
  const addSave = useSavesStore(state => state.add)
  const removeSave = useSavesStore(state => state.remove)
  const clear = useSavesStore(state => state.clear)

  const title = usePokemonStore(state => state.title)
  const input = usePokemonStore(state => state.input)

  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <div className='flex justify-between'>
        <button className='rounded-full bg-blue-600 px-4 py-1 font-semibold tracking-wide text-white hover:bg-blue-700' onClick={() => { addSave(input, title) }}>
          {t('store.save-current')}
        </button>
        <button className='rounded-full bg-red-600 px-4 py-1 font-semibold tracking-wide text-white hover:bg-red-700' onClick={clear}>
          {t('store.clear')}
        </button>
      </div>
      <ul className='flex w-full flex-col gap-3'>
        {saves.map((save, index) =>
          <SaveElement key={index} save={save} removeSave={() => { removeSave(index) }} />)}
      </ul>
    </div>
  )
}

interface SaveProps {
  save: Save
  removeSave: () => void
}

function SaveElement ({ save, removeSave }: SaveProps): JSX.Element {
  const { t, i18n } = useTranslation()

  const submit = usePokemonStore(state => state.submit)

  return (
    <li className='flex gap-1'>
      <button
        className='flex min-w-0 grow flex-col rounded bg-slate-300 px-3 py-1 text-left dark:bg-slate-700'
        onClick={() => { submit(save.input, save.title) }}
      >
        <span className='w-full truncate text-lg font-semibold tracking-wide'>
          {(save.title !== '') ? save.title : t('store.untitled')}
        </span>
        <span className='w-full truncate text-sm italic tracking-wide'>
          {new Date(save.date).toLocaleString(i18n.language)}
        </span>
      </button>
      <button className='rounded bg-slate-300 p-2 dark:bg-slate-700' onClick={removeSave}>
        <DeleteIcon className='size-6 text-red-500' />
      </button>
    </li>
  )
}
