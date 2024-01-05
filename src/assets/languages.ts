import de from '@/assets/locales/de.json'
import en from '@/assets/locales/en.json'
import es from '@/assets/locales/es.json'
import fr from '@/assets/locales/fr.json'
import it from '@/assets/locales/it.json'
import ja from '@/assets/locales/ja.json'
import ko from '@/assets/locales/ko.json'
import zhHans from '@/assets/locales/zh-Hans.json'
import zhHant from '@/assets/locales/zh-Hant.json'
import { Language } from '@/stores/language'

export const locales = {
  [Language.English]: en,
  [Language.Spanish]: es,
  [Language.French]: fr,
  [Language.German]: de,
  [Language.Italian]: it,
  [Language.Japanese]: ja,
  [Language.Korean]: ko,
  [Language.ChineseSimplified]: zhHans,
  [Language.ChineseTraditional]: zhHant
}
