import { useContext } from 'react'
import { AppContext } from '../context/app'
import { CogIcon } from './icons/CogIcon'
import EditIcon from './icons/EditIcon'

export default function Header (): JSX.Element {
  const { team, clearTeam, toggleSettings } = useContext(AppContext)

  return (
    <header className='flex justify-between bg-red-700 px-2 py-1'>
      <h1 className='text-lg font-bold'>POKEMON</h1>
      <button
        className='h-8 rounded bg-sky-500 px-3 enabled:hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40'
        disabled={team.length === 0}
        onClick={clearTeam}
      >
        <EditIcon className='h-3.5 w-3.5' />
      </button>
      <button
        className='h-8 w-8 rounded-full p-1.5 hover:bg-black/10'
        onClick={toggleSettings}
      >
        <CogIcon />
      </button>
    </header>
  )
}
