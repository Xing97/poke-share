import { useLocalStorage } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'
import EditIcon from './icons/EditIcon'

interface Props {
  onClick: () => void
}

export default function Header ({ onClick }: Props): JSX.Element {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useLocalStorage('language', i18n.language)

  const change = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(event.target.value)

    i18n.changeLanguage(event.target.value)
      .catch(console.error)
  }

  return (
    <header className='flex justify-between bg-red-700 p-1'>
      <h1 className='text-2xl font-bold'>POKEMON</h1>
      <button className='rounded bg-white/30 p-1 hover:bg-white/40' onClick={onClick}>
        <EditIcon className='h-6 w-6' />
      </button>
      <select className='rounded bg-slate-800 font-semibold' value={language} onChange={change}>
        <option value='en'>English</option>
        <option value='es'>Español</option>
        <option value='de'>Deutsch</option>
        <option value='it'>Italiano</option>
        <option value='fr'>Français</option>
        <option value='ja'>日本語</option>
        <option disabled value='ja-Hrkt'>にほんご</option>
        <option value='zh-Hans'>简体中文</option>
        <option value='zh-Hant'>繁體中文</option>
        <option value='ko'>한국어</option>
      </select>
    </header>
  )
}
