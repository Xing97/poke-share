import PokemonInput from '@/components/PokemonInput'
import Settings from '@/components/Settings'
import CogIcon from '@/icons/CogIcon'
import EditIcon from '@/icons/EditIcon'
import PokeBallIcon from '@/icons/PokeBallIcon'
import ShareIcon from '@/icons/ShareIcon'
import { Sidebar, useSidebarStore } from '@/stores/sidebar'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const SIDE_BAR: Record<Sidebar, JSX.Element | null> = {
  [Sidebar.Pokemon]: null,
  [Sidebar.Input]: <PokemonInput />,
  [Sidebar.Settings]: <Settings />
}

export default function Aside (): JSX.Element {
  const { t } = useTranslation()
  const selected = useSidebarStore(store => store.sidebar)

  const shareUrl = (): void => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success(t('labels.share')))
      .catch(() => toast.error('Failed to copy sharable URL to clipboard.'))
  }

  return (
    <aside className='flex'>
      <div className='flex h-16 w-full justify-between bg-slate-400 md:h-full md:w-16 md:flex-col dark:bg-slate-700'>
        <header className='flex md:block'>
          <Tab name={Sidebar.Pokemon}>
            <PokeBallIcon />
          </Tab>
          <Tab name={Sidebar.Input}>
            <EditIcon />
          </Tab>
        </header>
        <footer className='flex md:block'>
          <Button name='share' onClick={shareUrl}>
            <ShareIcon />
          </Button>
          <Tab name={Sidebar.Settings}>
            <CogIcon />
          </Tab>
        </footer>
      </div>
      {selected !== Sidebar.Pokemon &&
        <div className='absolute bottom-0 top-16 z-50 w-full overflow-y-auto bg-slate-300 md:static md:h-full md:w-72 lg:w-80 xl:w-96 dark:bg-slate-800'>
          {SIDE_BAR[selected]}
        </div>}
    </aside>
  )
}

function Tab ({ children, name }: { children: React.ReactNode, name: Sidebar }): JSX.Element {
  const selected = useSidebarStore(store => store.sidebar)
  const setSelected = useSidebarStore(store => store.setSidebar)

  return (
    <button
      aria-label={name}
      className={`aspect-square h-full md:h-auto md:w-full md:border-l-3 ${selected === name ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-slate-600 dark:text-slate-400'} p-3 text-slate-600 hover:text-black hover:dark:text-white`}
      onClick={() => { setSelected(name) }}
    >
      {children}
    </button>
  )
}

function Button ({ children, name, onClick }: { children: React.ReactNode, name: string, onClick: () => void }): JSX.Element {
  return (
    <button
      aria-label={name}
      className='aspect-square h-full border-transparent p-3 text-slate-600 md:h-auto md:w-full md:border-l-3 dark:text-slate-400 hover:dark:text-white'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
