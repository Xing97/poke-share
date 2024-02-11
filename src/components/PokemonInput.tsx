import { usePokemonStore } from '@/stores/pokemon'
import { useTranslation } from 'react-i18next'

export default function PokemonInput (): JSX.Element {
  const { t } = useTranslation()

  const title = usePokemonStore(state => state.title)
  const input = usePokemonStore(state => state.input)
  const submit = usePokemonStore(state => state.submit)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const form = new window.FormData(event.currentTarget)
    submit(form.get('paste') as string, form.get('title') as string)
  }

  return (
    <form className='flex h-full w-full flex-col gap-2 p-2' onSubmit={handleSubmit}>
      <textarea
        name='paste'
        className='h-full resize-none rounded bg-slate-300 p-1.5 text-sm placeholder:text-base focus-visible:outline focus-visible:outline-1 focus-visible:outline-white dark:bg-slate-700'
        placeholder={t('input.paste')}
        required
        autoComplete='off'
        autoFocus
        spellCheck='false'
        defaultValue={input}
        wrap='off'
      />
      <input
        className='rounded bg-slate-300 px-1.5 py-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white dark:bg-slate-700'
        type='text'
        name='title'
        placeholder={t('input.title')}
        spellCheck='false'
        defaultValue={title}
      />
      <button
        className='rounded-full bg-blue-300 py-1 font-medium tracking-wide hover:bg-blue-400 dark:bg-blue-800 dark:hover:bg-blue-700'
        type='submit'
      >
        {t('input.update')}
      </button>
    </form>
  )
}
