import { usePokemonStore } from '@/stores/pokemon'
import { useTranslation } from 'react-i18next'

export default function PokemonInput (): JSX.Element {
  const input = usePokemonStore(state => state.input)
  const submit = usePokemonStore(state => state.submit)
  const { t } = useTranslation()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const form = new window.FormData(event.currentTarget)
    submit(form.get('paste') as string)
  }

  return (
    <form className='flex h-full w-full flex-col gap-4' onSubmit={handleSubmit}>
      <textarea
        name='paste'
        className='h-full resize-none rounded-lg bg-slate-300 p-2 dark:bg-slate-700'
        placeholder={t('labels.paste')}
        required
        autoComplete='off'
        autoFocus
        spellCheck='false'
        defaultValue={input}
      />
      <button
        className='w-full rounded-full bg-blue-300 py-1.5 tracking-wider hover:bg-blue-400 dark:bg-blue-800 dark:hover:bg-blue-700'
        type='submit'
      >
        UPDATE
      </button>
    </form>
  )
}
