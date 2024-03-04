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

export const locales: Record<Language, Translations> = {
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

interface Translations {
  labels: Labels
  tooltips: Tooltips
  input: Input
  history: History
  settings: Settings
  themes: Themes
  generations: Generations
  'version-groups': VersionGroups
  move: Move
  category: Category
  types: Types
  natures: Natures
  stats: Stats
}

interface Labels {
  share: string
  base: string
  evs: string
  ivs: string
  lvl50: string
  lvl100: string
}

interface Tooltips {
  pokemon: string
  input: string
  history: string
  share: string
  settings: string
}

interface Input {
  paste: string
  title: string
  update: string
  error: string
  'some-error': string
  example: string
}

interface History {
  clear: string
  untitled: string
  cleared: string
  undo: string
}

interface Settings {
  generations: string
  'version-groups': string
  languages: string
  themes: string
}

interface Themes {
  system: string
  light: string
  dark: string
}

interface Generations {
  'generation-i': string
  'generation-ii': string
  'generation-iii': string
  'generation-iv': string
  'generation-v': string
  'generation-vi': string
  'generation-vii': string
  'generation-viii': string
  'generation-ix': string
}

interface VersionGroups {
  'red-blue': string
  yellow: string
  'gold-silver': string
  crystal: string
  'ruby-sapphire': string
  emerald: string
  'firered-leafgreen': string
  'diamond-pearl': string
  platinum: string
  'heartgold-soulsilver': string
  'black-white': string
  colosseum: string
  xd: string
  'black-2-white-2': string
  'x-y': string
  'omega-ruby-alpha-sapphire': string
  'sun-moon': string
  'ultra-sun-ultra-moon': string
  'lets-go-pikachu-lets-go-eevee': string
  'sword-shield': string
  'the-isle-of-armor': string
  'the-crown-tundra': string
  'brilliant-diamond-and-shining-pearl': string
  'legends-arceus': string
  'scarlet-violet': string
  'the-teal-mask': string
  'the-indigo-disk': string
}

interface Move {
  type: string
  category: string
  power: string
  accuracy: string
  pp: string
  priority: string
}

interface Category {
  physical: string
  special: string
  status: string
}

interface Types {
  rock: string
  bug: string
  electric: string
  psychic: string
  dragon: string
  ground: string
  poison: string
  normal: string
  ghost: string
  water: string
  ice: string
  grass: string
  fighting: string
  shadow: string
  flying: string
  fire: string
  steel: string
  dark: string
  fairy: string
  unknown: string
}

interface Natures {
  docile: string
  timid: string
  impish: string
  modest: string
  lax: string
  gentle: string
  bold: string
  jolly: string
  rash: string
  hardy: string
  calm: string
  adamant: string
  quirky: string
  naive: string
  serious: string
  bashful: string
  hasty: string
  brave: string
  sassy: string
  careful: string
  naughty: string
  quiet: string
  relaxed: string
  mild: string
  lonely: string
}

interface Stats {
  hp: string
  defense: string
  accuracy: string
  'special-attack': string
  evasion: string
  attack: string
  speed: string
  'special-defense': string
}
