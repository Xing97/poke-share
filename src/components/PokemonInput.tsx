import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../context/app'

export default function PokemonInput (): JSX.Element {
  const { input, submit } = useContext(AppContext)
  const { t } = useTranslation()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault()

    const form = new window.FormData(event.currentTarget)
    submit(form.get('paste') as string)
  }

  return (
    <form className='flex w-full max-w-3xl flex-col gap-4' onSubmit={handleSubmit}>
      <textarea
        name='paste'
        className='h-96 resize-none rounded-lg bg-slate-800 p-2'
        placeholder={t('labels.paste')}
        required
        autoComplete='off'
        autoFocus
        spellCheck='false'
        defaultValue={input}
      />
      <div className='flex grow flex-wrap justify-between gap-2 font-semibold'>
        <button
          className='w-32 rounded-full bg-blue-800 py-1.5 tracking-wider hover:bg-blue-700'
          type='submit'
        >
          TEST
        </button>
        <button
          className='w-32 rounded-full bg-red-800 py-1.5 tracking-wider hover:bg-red-700'
          type='reset'
        >
          CLEAR
        </button>
      </div>
    </form>
  )
}
