import PokemonInput from '@/components/side-bar/PokemonInput'
import Settings from '@/components/side-bar/Settings'
import Store from '@/components/side-bar/Store'
import CogIcon from '@/icons/CogIcon'
import EditIcon from '@/icons/EditIcon'
import PokeBallIcon from '@/icons/PokeBallIcon'
import SaveIcon from '@/icons/SaveIcon'
import ShareIcon from '@/icons/ShareIcon'
import { Sidebar, useSidebarStore } from '@/stores/sidebar'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const SIDE_BAR = {
  [Sidebar.Pokemon]: null,
  [Sidebar.Input]: <PokemonInput />,
  [Sidebar.Store]: <Store />,
  [Sidebar.Settings]: <Settings />
}

export default function Aside (): JSX.Element {
  const { t } = useTranslation()
  const selected = useSidebarStore(store => store.sidebar)

  const shareUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success(t('labels.share')))
      .catch(() => toast.error('Failed to copy sharable URL to clipboard.'))
  }, [t])

  return (
    <aside className='flex'>
      <div className='flex w-full justify-between bg-slate-400 md:h-full md:w-16 md:flex-col dark:bg-slate-700'>
        <header className='flex md:block'>
          <Tab name={Sidebar.Pokemon}>
            <PokeBallIcon />
          </Tab>
          <Tab name={Sidebar.Input}>
            <EditIcon />
          </Tab>
          <Tab name={Sidebar.Store}>
            <SaveIcon />
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
        <div className='scrollbar-thin absolute bottom-0 top-12 z-10 w-full overflow-y-auto bg-slate-200 xs:top-16 md:static md:h-full md:w-72 lg:w-80 xl:w-96 dark:bg-slate-800'>
          {SIDE_BAR[selected]}
        </div>}
    </aside>
  )
}

function Tab ({ children, name }: { children: React.ReactNode, name: Sidebar }): JSX.Element {
  const { t } = useTranslation()
  const selected = useSidebarStore(store => store.sidebar)
  const setSelected = useSidebarStore(store => store.setSidebar)

  return (
    <button
      aria-label={t('tooltips.' + name)}
      className={`hint--right hint--rounded aspect-square size-12 before:hidden after:hidden xs:h-16 xs:w-16 md:border-l-3 md:before:block md:after:block ${selected === name ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-slate-600 dark:text-slate-400'} p-3 hover:text-black hover:dark:text-white`}
      onClick={() => { setSelected(name) }}
    >
      {children}
    </button>
  )
}

function Button ({ children, name, onClick }: { children: React.ReactNode, name: string, onClick: () => void }): JSX.Element {
  const { t } = useTranslation()

  return (
    <button
      aria-label={t('tooltips.' + name)}
      className='hint--right hint--rounded aspect-square size-12 border-transparent p-3 text-slate-600 before:hidden after:hidden hover:text-black xs:h-16 xs:w-16 md:border-l-3 dark:text-slate-400 hover:dark:text-white'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
