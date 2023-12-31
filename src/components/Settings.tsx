import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'usehooks-ts'
import { usePokemonStore } from '../store/pokemon-store'
import { Game, Generation, Language, Theme } from '../types.d'
import Selector from './Selector'

export default function Settings (): JSX.Element {
  const { t, i18n } = useTranslation()

  const generation = usePokemonStore(state => state.generation)
  const setGeneration = usePokemonStore(state => state.setGeneration)

  const game = usePokemonStore(state => state.game)
  const setGame = usePokemonStore(state => state.setGame)

  const [language, setLanguage] = useLocalStorage<Language>('language', i18n.language as Language)

  const theme = usePokemonStore(state => state.theme)
  const setTheme = usePokemonStore(state => state.setTheme)

  return (
    <div className='flex flex-wrap gap-6 rounded bg-slate-700 p-4'>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.game-generation')}</legend>
        <Selector
          options={Object.values(Generation)}
          setSelected={setGeneration}
          translation='generations'
          defaultSelected={generation}
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.game-version')}</legend>
        <Selector
          options={Object.values(Game)}
          setSelected={setGame}
          translation='version-groups'
          defaultSelected={game}
        />
      </fieldset>
      <fieldset>
        <legend className='m-2 text-lg font-bold'>{t('labels.language')}</legend>
        <Selector
          options={Object.values(Language)}
          setSelected={(l) => {
            setLanguage(l)
            i18n.changeLanguage(l).catch(console.error)
          }}
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
          setSelected={setTheme}
          translation='themes'
          defaultSelected={theme}
        />
      </fieldset>
    </div>
  )
}
