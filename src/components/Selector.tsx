import { useId } from 'react'
import { useTranslation } from 'react-i18next'

interface Props<T extends string> {
  options: T[]
  setSelected: (option: T) => void
  translation: string | Record<T, string>
  defaultSelected?: T
  className?: string
}

export default function Selector<T extends string> (
  { options, setSelected, translation, className, defaultSelected = options[0] }: Props<T>): JSX.Element {
  const { t } = useTranslation()
  const id = useId()

  return (
    <div className={'flex flex-wrap gap-1.5 ' + className}>
      {options.map((option) => (
        <label key={option} className='cursor-pointer rounded-full border border-slate-100 bg-slate-500 px-2 font-semibold tracking-wide hover:bg-slate-400 has-[:checked]:bg-slate-100 has-[:checked]:text-black'>
          <input
            id={option}
            className='hidden'
            type='radio'
            name={id}
            value={option}
            onChange={() => { setSelected(option) }}
            defaultChecked={option === defaultSelected}
          />
          { typeof translation === 'string' ? t(translation + '.' + option) : translation[option]}
        </label>
      ))}
    </div>
  )
}
