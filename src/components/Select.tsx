import { useTranslation } from "react-i18next"

interface TestProps<T extends string> {
  name: string
  description?: string
  options: T[]
  selected: T
  setSelected: (option: T) => void
}

export default function Select<T extends string>({
  name,
  description,
  options,
  setSelected,
  selected,
}: TestProps<T>): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-1">
      <span className="text-lg font-semibold">{t("settings." + name)}</span>
      <select
        className="w-full bg-slate-300 px-2 py-1 dark:bg-slate-700"
        name={name}
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value as T)
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {t(name + "." + option)}
          </option>
        ))}
      </select>
      {description != null && <p className="text-slate-600 dark:text-slate-400">{description}</p>}
    </div>
  )
}
