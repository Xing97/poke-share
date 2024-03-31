import Button from "@/components/Button"
import DeleteIcon from "@/icons/DeleteIcon"
import { useHistoryStore, type HistoryItem } from "@/stores/history"
import { usePokemonStore } from "@/stores/pokemon"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export default function History(): JSX.Element {
  const { t } = useTranslation()

  const history = useHistoryStore((state) => state.history)
  const removeSave = useHistoryStore((state) => state.remove)
  const clear = useHistoryStore((state) => state.clear)
  const restore = useHistoryStore((state) => state.restore)

  const clearAll = useCallback((): void => {
    const copy = structuredClone(history)
    clear()
    toast.success(t("history.cleared"), {
      action: {
        label: t("history.undo"),
        onClick: () => {
          restore(copy)
        },
      },
    })
  }, [clear, history, restore, t])

  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <h1 className="text-xl font-bold">{t("tooltips.history")}</h1>
      <Button className="self-end rounded-full bg-red-600" onClick={clearAll}>
        {t("history.clear")}
      </Button>
      <ul className="peer flex w-full flex-col gap-2">
        {history.map((item, index) => (
          <HistoryElement
            key={index}
            item={item}
            removeSave={() => {
              removeSave(index)
            }}
          />
        ))}
      </ul>
    </div>
  )
}

interface SaveProps {
  item: HistoryItem
  removeSave: () => void
}

function HistoryElement({ item, removeSave }: SaveProps): JSX.Element {
  const { t, i18n } = useTranslation()

  const submit = usePokemonStore((state) => state.submit)

  return (
    <li className="group flex min-w-0 gap-2 rounded bg-slate-300 px-2 py-1 text-left hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600">
      <button
        className="group flex grow flex-col truncate text-left"
        onClick={() => {
          submit(item.input, item.title, false)
        }}
      >
        <span className="w-full truncate text-lg font-medium">
          {item.title !== "" ? item.title : t("history.untitled")}
        </span>
        <span className="w-full truncate text-sm italic">
          {new Date(item.date).toLocaleString(i18n.language)}
        </span>
      </button>
      <button
        className="hidden transition-colors hover:text-red-500 group-hover:block"
        onClick={removeSave}
      >
        <DeleteIcon className="size-6" />
      </button>
    </li>
  )
}
