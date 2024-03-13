import Button from '@/components/Button'
import HelpModal from '@/components/modal/HelpModal'
import { LoadingIcon } from '@/icons/LoadingIcon'
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

    const form = new FormData(event.currentTarget)
    submit(form.get('paste') as string, form.get('title') as string, true)
  }

  return (
    <form className='flex size-full flex-col gap-2 p-2' onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <Button
          className='bg-blue-600'
          onClick={() => { setInput(INPUT_EXAMPLE) }}
        >
          {t('input.example')}
        </Button>
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
      <Button
        className='flex justify-center gap-2 bg-blue-700 disabled:cursor-not-allowed'
        type='submit'
        disabled={loading}
      >
        {loading && <LoadingIcon className='size-6 animate-spin-clockwise animate-iteration-count-infinite' />}
        {loading ? t('input.loading') : t('input.update')}
      </Button>
    </form>
  )
}
