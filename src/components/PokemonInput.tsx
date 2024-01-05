import { usePokemonStore } from '@/stores/pokemon'
import { useTranslation } from 'react-i18next'

export default function PokemonInput (): JSX.Element {
  const title = usePokemonStore(state => state.title)
  const input = usePokemonStore(state => state.input)
  const submit = usePokemonStore(state => state.submit)
  const { t } = useTranslation()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const form = new window.FormData(event.currentTarget)
    submit(form.get('paste') as string, form.get('title') as string)
  }

  return (
    <form className='flex h-full w-full flex-col gap-2' onSubmit={handleSubmit}>
      <textarea
        name='paste'
        className='h-full resize-none rounded bg-slate-300 p-1 dark:bg-slate-700'
        placeholder={t('labels.paste')}
        required
        autoComplete='off'
        autoFocus
        spellCheck='false'
        defaultValue={input}
      />
      <input
        className='resize-none rounded bg-slate-300 p-1 dark:bg-slate-700'
        type='text'
        name='title'
        placeholder='Title (optional)'
        defaultValue={title}
      />
      <button
        className='w-full rounded-full bg-blue-300 py-1 font-semibold tracking-wide hover:bg-blue-400 dark:bg-blue-800 dark:hover:bg-blue-700'
        type='submit'
      >
        UPDATE
      </button>
    </form>
  )
}
