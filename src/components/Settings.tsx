import { useLocalStorage } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'
import { Game, Generation, Language, Theme } from '../types.d'
import Selector from './Selector'

export default function Settings (): JSX.Element {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useLocalStorage('language', i18n.language)

  const changeLanguage = (language: string): void => {
    setLanguage(language)
    i18n.changeLanguage(language).catch(console.error)
  }

  return (
    <div className='flex flex-wrap gap-6 rounded bg-slate-700 p-4'>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.game-generation')}</legend>
        <Selector
          options={Object.values(Generation)}
          setSelected={() => {}}
          translation='generations'
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.game-version')}</legend>
        <Selector
          options={Object.values(Game)}
          setSelected={() => {}}
          translation='version-groups'
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.language')}</legend>
        <Selector
          options={Object.values(Language)}
          setSelected={changeLanguage}
          translation={{
            [Language.English]: 'English',
            [Language.Spanish]: 'Español',
            [Language.French]: 'Français',
            [Language.German]: 'Deutsch',
            [Language.Italian]: 'Italiano',
            [Language.Korean]: '한국어',
            [Language.Japanese]: '日本語',
            [Language.ChineseSimplified]: '简体中文',
            [Language.ChineseTraditional]: '繁體中文'
          }}
          defaultSelected={language}
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.theme')}</legend>
        <Selector
          options={Object.values(Theme)}
          setSelected={() => {}}
          translation='themes'
        />
      </fieldset>
    </div>
  )
}
