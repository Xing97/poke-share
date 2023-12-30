import { useId } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  tabs: string[]
  setSelected: (tab: string) => void
  translation: string
  defaultSelected?: string
  className?: string
}

export default function Selector ({ tabs, setSelected, translation, className, defaultSelected = tabs[0] }: Props): JSX.Element {
  const { t } = useTranslation()
  const id = useId()

  return (
    <div className={'flex flex-wrap gap-1.5 ' + className}>
      {tabs.map((tab) => (
        <label key={tab} className='cursor-pointer rounded-full border border-slate-100 bg-slate-500 px-2 font-semibold tracking-wide hover:bg-slate-400 has-[:checked]:bg-slate-100 has-[:checked]:text-black'>
          <input
            id={tab}
            className='hidden'
            type='radio'
            name={id}
            value={tab}
            onChange={() => { setSelected(tab) }}
            defaultChecked={tab === defaultSelected}
          />
          {t(translation + '.' + tab)}
        </label>
      ))}
    </div>
  )
}
