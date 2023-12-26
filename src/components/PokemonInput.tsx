import { useTranslation } from 'react-i18next'
import { parsePokemons } from '../services/input-analizer'
import { fetchPokemon } from '../services/poke-api'
import { type Pokemon } from '../types'

interface Props {
  setPokemons: (pokemons: Pokemon[]) => void
}

export default function PokemonInput ({ setPokemons }: Props): JSX.Element {
  const { t } = useTranslation()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault()

    const form = new window.FormData(event.currentTarget)

    const info = parsePokemons(form.get('paste') as string)

    Promise.all(info.map(async pokemon => await fetchPokemon(pokemon)))
      .then(setPokemons)
      .catch(console.error)
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
