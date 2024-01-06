import { useId } from 'react'
import { useTranslation } from 'react-i18next'

interface Props<T extends string> {
  options: T[]
  selected: T
  setSelected: (option: T) => void
  translation: string | Record<T, string>
  enabled?: T[]
  className?: string
}

export default function Selector<T extends string> (
  { options, setSelected, translation, enabled, className, selected }: Props<T>): JSX.Element {
  const { t } = useTranslation()
  const id = useId()

  return (
    <div className={'flex flex-wrap gap-1.5 ' + className}>
      {options.map((option) => (
        <label
          key={option}
          className='cursor-pointer rounded-full border border-slate-900 bg-slate-400 px-2 font-semibold tracking-wide hover:bg-slate-500 has-[:disabled]:cursor-default has-[:disabled]:border-slate-600 has-[:checked]:bg-slate-900 has-[:disabled]:bg-inherit has-[:checked]:text-white has-[:disabled]:text-slate-500 dark:border-slate-100 dark:bg-slate-500 dark:hover:bg-slate-400 dark:has-[:checked]:bg-slate-100 dark:has-[:checked]:text-black'
        >
          <input
            id={option}
            className='hidden'
            type='radio'
            name={id}
            value={option}
            onChange={() => { setSelected(option) }}
            checked={option === selected}
            disabled={enabled !== undefined && !enabled.includes(option)}
          />
          { typeof translation === 'string' ? t(translation + '.' + option) : translation[option]}
        </label>
      ))}
    </div>
  )
}
