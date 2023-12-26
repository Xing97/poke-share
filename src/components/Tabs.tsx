import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  tabs: string[]
  setSelected: (tab: string) => void
}

export default function Tabs ({ tabs, setSelected }: Props): JSX.Element {
  const { t } = useTranslation()
  const [actual, setActual] = useState(tabs[0])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setSelected(e.currentTarget.name)
    setActual(e.currentTarget.name)
  }

  return (
    <>
      {tabs.map(tab => (
        <button
          key={tab}
          name={tab}
          className={'rounded-full border border-slate-100 px-2 font-semibold tracking-wide ' +
            (actual === tab ? 'bg-slate-100 text-black' : 'bg-slate-500')}
          onClick={handleClick}
        >
          {t('labels.' + tab)}
        </button>)
      )}
    </>
  )
}
