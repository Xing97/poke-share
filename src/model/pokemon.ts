import { type Game, type Generation } from '@/stores/game'
import { type Language } from '@/stores/language'

export interface I18nName {
  name: string
  [Language.English]?: string
  [Language.Spanish]?: string
  [Language.French]?: string
  [Language.German]?: string
  [Language.Italian]?: string
  [Language.Korean]?: string
  [Language.Japanese]?: string
  [Language.ChineseTraditional]?: string
  [Language.ChineseSimplified]?: string
}

export interface FlavorText {
  [Language.English]?: VersionText
  [Language.Spanish]?: VersionText
  [Language.French]?: VersionText
  [Language.German]?: VersionText
  [Language.Italian]?: VersionText
  [Language.Korean]?: VersionText
  [Language.Japanese]?: VersionText
  [Language.ChineseTraditional]?: VersionText
  [Language.ChineseSimplified]?: VersionText
}

export interface VersionText {
  [Game.RedBlue]?: string
  [Game.Yellow]?: string
  [Game.GoldSilver]?: string
  [Game.Crystal]?: string
  [Game.RubySapphire]?: string
  [Game.Emerald]?: string
  [Game.FireRedLeafGreen]?: string
  [Game.DiamondPearl]?: string
  [Game.Platinum]?: string
  [Game.HeartGoldSoulSilver]?: string
  [Game.BlackWhite]?: string
  [Game.Colosseum]?: string
  [Game.XD]?: string
  [Game.Black2White2]?: string
  [Game.XandY]?: string
  [Game.OmegaRubyAlphaSapphire]?: string
  [Game.SunMoon]?: string
  [Game.UltraSunUltraMoon]?: string
  [Game.LetSGoPikachuLetSGoEevee]?: string
  [Game.SwordShield]?: string
  [Game.TheIsleOfArmor]?: string
  [Game.TheCrownTundra]?: string
  [Game.BrilliantDiamondAndShiningPearl]?: string
  [Game.LegendsArceus]?: string
  [Game.ScarletViolet]?: string
  [Game.TheTealMask]?: string
  [Game.TheIndigoDisk]?: string
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
  teraType?: Type
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
  past_types: PastType[]
  teraType?: Type
}

export interface Stats {
  hp: number
  attack: number
  defense: number
  special_attack: number
  special_defense: number
  speed: number
}

export interface Item {
  name: I18nName
  flavorText: FlavorText
  image: string
}

export interface Ability {
  name: I18nName
  flavorText: FlavorText
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
  flavorText: FlavorText
}

export interface PastType {
  generation: Generation
  types: Type[]
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
  Stellar = 'stellar'
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
