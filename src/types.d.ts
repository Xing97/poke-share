export enum Language {
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  German = 'de',
  Italian = 'it',
  // Czech = 'cs',
  Korean = 'ko',
  Japanese = 'ja',
  // Portuguese = 'pt-BR',
  // JapaneseRomaji = 'ja-Hrkt',
  ChineseSimplified = 'zh-Hans',
  ChineseTraditional = 'zh-Hant'
}

export enum Generation {
  I = 'generation-i',
  II = 'generation-ii',
  III = 'generation-iii',
  IV = 'generation-iv',
  V = 'generation-v',
  VI = 'generation-vi',
  VII = 'generation-vii',
  VIII = 'generation-viii',
  IX = 'generation-ix'
}

export enum Game {
  RedBlue = 'red-blue',
  Yellow = 'yellow',
  GoldSilver = 'gold-silver',
  Crystal = 'crystal',
  RubySapphire = 'ruby-sapphire',
  Emerald = 'emerald',
  FireRedLeafGreen = 'firered-leafgreen',
  DiamondPearl = 'diamond-pearl',
  Platinum = 'platinum',
  HeartGoldSoulSilver = 'heartgold-soulsilver',
  BlackWhite = 'black-white',
  Colosseum = 'colosseum',
  XD = 'xd',
  Black2White2 = 'black-2-white-2',
  XandY = 'x-y',
  OmegaRubyAlphaSapphire = 'omega-ruby-alpha-sapphire',
  SunMoon = 'sun-moon',
  UltraSunUltraMoon = 'ultra-sun-ultra-moon',
  LetSGoPikachuLetSGoEevee = 'lets-go-pikachu-lets-go-eevee',
  SwordShield = 'sword-shield',
  TheIsleOfArmor = 'the-isle-of-armor',
  TheCrownTundra = 'the-crown-tundra',
  BrilliantDiamondAndShiningPearl = 'brilliant-diamond-and-shining-pearl',
  LegendsArceus = 'legends-arceus',
  ScarletViolet = 'scarlet-violet',
  TheTealMask = 'the-teal-mask',
  TheIndigoDisk = 'the-indigo-disk'
}

export interface I18nName {
  name: string
  [Language.English]?: string
  [Language.Spanish]?: string
  [Language.French]?: string
  [Language.German]?: string
  [Language.Italian]?: string
  [Language.Czech]?: string
  [Language.Korean]?: string
  [Language.Japanese]?: string
  [Language.Portuguese]?: string
  [Language.JapaneseRomaji]?: string
  [Language.ChineseTraditional]?: string
  [Language.ChineseSimplified]?: string
}

export interface PokemonInfo {
  name: string
  nickname?: string
  gender?: Gender
  item?: string
  nature?: string
  ability?: string
  shiny?: boolean
  evs: Stats
  ivs: Stats
  moves: string[]
}

export interface Pokemon {
  id: number
  order: number
  name: I18nName
  nickname?: string
  gender?: Gender
  item?: Item
  nature: Nature
  ability: Ability
  evs: Stats
  ivs: Stats
  moves: Move[]
  image: string
  stats: Stats
  types: Type[]
}

export interface Stats {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface Item {
  name: I18nName
  description: string
  image: string
}

export interface Ability {
  name: I18nName
  description: string
}

export interface Move {
  id: number
  name: I18nName
  type: Type
  category: Category
  pp: number
  power: number
  accuracy: number
  priority: number
  description: string
}

export enum Type {
  Normal = 'normal',
  Fighting = 'fighting',
  Flying = 'flying',
  Poison = 'poison',
  Ground = 'ground',
  Rock = 'rock',
  Bug = 'bug',
  Ghost = 'ghost',
  Steel = 'steel',
  Fire = 'fire',
  Water = 'water',
  Grass = 'grass',
  Electric = 'electric',
  Psychic = 'psychic',
  Ice = 'ice',
  Dragon = 'dragon',
  Dark = 'dark',
  Fairy = 'fairy',
}

export enum Category {
  Physical = 'physical',
  Special = 'special',
  Status = 'status'
}

export enum Gender {
  Male = 'M',
  Female = 'F'
}

export enum Nature {
  Hardy = 'hardy',
  Lonely = 'lonely',
  Brave = 'brave',
  Adamant = 'adamant',
  Naughty = 'naughty',
  Bold = 'bold',
  Docile = 'docile',
  Relaxed = 'relaxed',
  Impish = 'impish',
  Lax = 'lax',
  Timid = 'timid',
  Hasty = 'hasty',
  Serious = 'serious',
  Jolly = 'jolly',
  Naive = 'naive',
  Modest = 'modest',
  Mild = 'mild',
  Quiet = 'quiet',
  Bashful = 'bashful',
  Rash = 'rash',
  Calm = 'calm',
  Gentle = 'gentle',
  Sassy = 'sassy',
  Careful = 'careful',
  Quirky = 'quirky'
}
