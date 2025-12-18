import History from "@/components/side-bar/History"
import PokemonInput from "@/components/side-bar/PokemonInput"
import Settings from "@/components/side-bar/Settings"
import CogIcon from "@/icons/CogIcon"
import EditIcon from "@/icons/EditIcon"
import SaveIcon from "@/icons/HistoryIcon"
import PokeBallIcon from "@/icons/PokeBallIcon"
import ShareIcon from "@/icons/ShareIcon"
import { Sidebar, useSidebarStore } from "@/stores/sidebar"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

const SIDE_BAR = {
  [Sidebar.Pokemon]: null,
  [Sidebar.Input]: <PokemonInput />,
  [Sidebar.History]: <History />,
  [Sidebar.Settings]: <Settings />,
}

export default function Aside(): JSX.Element {
  const { t } = useTranslation()
  const selected = useSidebarStore((store) => store.sidebar)

  const shareUrl = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success(t("labels.share")))
      .catch(() => toast.error("Failed to copy sharable URL to clipboard."))
  }, [t])

  return (
    <aside className="flex">
      <div className="flex w-full justify-between bg-slate-400 md:h-full md:w-16 md:flex-col dark:bg-slate-700">
        <header className="flex md:block">
          <AsideTab name={Sidebar.Pokemon}>
            <PokeBallIcon />
          </AsideTab>
          <AsideTab name={Sidebar.Input}>
            <EditIcon />
          </AsideTab>
          <AsideTab name={Sidebar.History}>
            <SaveIcon />
          </AsideTab>
        </header>
        <footer className="flex md:block">
          <AsideButton name="share" onClick={shareUrl}>
            <ShareIcon />
          </AsideButton>
          <AsideTab name={Sidebar.Settings}>
            <CogIcon />
          </AsideTab>
        </footer>
      </div>
      {selected !== Sidebar.Pokemon && (
        <div className="scrollbar-thin xs:top-16 absolute top-12 bottom-0 w-full overflow-y-auto bg-slate-200 md:static md:h-full md:w-72 lg:w-80 xl:w-96 dark:bg-slate-800">
          {SIDE_BAR[selected]}
        </div>
      )}
    </aside>
  )
}

function AsideTab({ children, name }: { children: React.ReactNode; name: Sidebar }): JSX.Element {
  const { t } = useTranslation()
  const selected = useSidebarStore((store) => store.sidebar)
  const setSelected = useSidebarStore((store) => store.setSidebar)

  return (
    <button
      aria-label={t("tooltips." + name)}
      className={`hint--right xs:size-16 size-12 before:hidden after:hidden md:border-l-3 md:before:block md:after:block ${selected === name ? "border-black text-black dark:border-white dark:text-white" : "border-transparent text-slate-600 dark:text-slate-400"} p-3 hover:text-black dark:hover:text-white`}
      onClick={() => {
        setSelected(name)
      }}
    >
      {children}
    </button>
  )
}

interface AsideButtonProps {
  children: React.ReactNode
  name: string
  onClick: () => void
}

function AsideButton({ children, name, onClick }: AsideButtonProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <button
      aria-label={t("tooltips." + name)}
      className="hint--right xs:size-16 size-12 border-transparent p-3 text-slate-600 before:hidden after:hidden hover:text-black md:border-l-3 md:before:block md:after:block dark:text-slate-400 dark:hover:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
