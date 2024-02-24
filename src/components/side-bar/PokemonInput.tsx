import HelpModal from '@/components/modal/HelpModal'
import QuestionIcon from '@/icons/QuestionIcon'
import { INPUT_EXAMPLE } from '@/model/constants'
import { useModalStore } from '@/stores/modal'
import { usePokemonStore } from '@/stores/pokemon'
import { type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

export default function PokemonInput (): JSX.Element {
  const { t } = useTranslation()

  const title = usePokemonStore(state => state.title)
  const input = usePokemonStore(state => state.input)
  const loading = usePokemonStore(state => state.loading)
  const setInput = usePokemonStore(state => state.setInput)
  const submit = usePokemonStore(state => state.submit)

  const showModal = useModalStore(state => state.showModal)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const form = new window.FormData(event.currentTarget)
    submit(form.get('paste') as string, form.get('title') as string)
  }

  return (
    <form className='flex size-full flex-col gap-2 p-2' onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <button
          className='rounded-full bg-blue-600 px-4 py-1 font-semibold tracking-wide text-white hover:bg-blue-700'
          type='button'
          onClick={() => { setInput(INPUT_EXAMPLE) }}
        >
          {t('input.example')}
        </button>
        <button type='button' onClick={() => { showModal(<HelpModal />) }}>
          <QuestionIcon className='size-8' />
        </button>
      </div>
      <textarea
        name='paste'
        className='scrollbar-thin h-full resize-none rounded bg-slate-300 p-1.5 text-sm placeholder:text-base focus-visible:outline focus-visible:outline-1 focus-visible:outline-black dark:bg-slate-700 dark:focus-visible:outline-white'
        placeholder={t('input.paste')}
        required
        autoComplete='off'
        autoFocus
        spellCheck='false'
        value={input}
        onChange={(event) => { setInput(event.target.value) }}
        wrap='off'
      />
      <input
        className='rounded bg-slate-300 px-1.5 py-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black dark:bg-slate-700 dark:focus-visible:outline-white'
        type='text'
        name='title'
        placeholder={t('input.title')}
        spellCheck='false'
        defaultValue={title}
      />
      <button
        className='rounded-full bg-blue-700 py-1 font-semibold tracking-wide text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
        type='submit'
        disabled={loading}
      >
        {t('input.update')}
      </button>
    </form>
  )
}