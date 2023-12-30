import { useLocalStorage } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'
import { Game, Generation, Language } from '../types.d'
import Selector from './Selector'

export default function Settings (): JSX.Element {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useLocalStorage('language', i18n.language)

  const changeLanguage = (language: string): void => {
    setLanguage(language)
    i18n.changeLanguage(language).catch(console.error)
  }

  return (
    <div className='flex flex-wrap gap-6 rounded bg-slate-800 p-4'>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.game-generation')}</legend>
        <Selector
          tabs={Object.values(Generation)}
          setSelected={() => {}}
          translation='generations'
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.game-version')}</legend>
        <Selector
          tabs={Object.values(Game)}
          setSelected={() => {}}
          translation='version-groups'
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.language')}</legend>
        <Selector
          tabs={Object.values(Language)}
          setSelected={changeLanguage}
          translation='languages'
          defaultSelected={language}
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.theme')}</legend>
        <Selector
          tabs={['auto', 'ligth', 'dark']}
          setSelected={() => {}}
          translation='themes'
        />
      </fieldset>
    </div>
  )
}
