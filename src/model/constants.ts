import { Category, type Move, Nature, Type } from '@/model/pokemon'
import { Game, Generation } from '@/stores/game'

const GENS = Object.values(Generation)

export function isIncludedGeneration (max: Generation, actual: Generation): boolean {
  return GENS.indexOf(max) >= GENS.indexOf(actual)
}

export const INCREASE_ATTACK = [
  Nature.Lonely,
  Nature.Brave,
  Nature.Adamant,
  Nature.Naughty
]
export const INCREASE_DEFENSE = [
  Nature.Bold,
  Nature.Relaxed,
  Nature.Impish,
  Nature.Lax
]
export const INCREASE_SPECIAL_ATTACK = [
  Nature.Modest,
  Nature.Mild,
  Nature.Quiet,
  Nature.Rash
]
export const INCREASE_SPECIAL_DEFENSE = [
  Nature.Calm,
  Nature.Gentle,
  Nature.Sassy,
  Nature.Careful
]
export const INCREASE_SPEED = [
  Nature.Timid,
  Nature.Hasty,
  Nature.Jolly,
  Nature.Naive
]
export const DECREASE_ATTACK = [
  Nature.Bold,
  Nature.Timid,
  Nature.Modest,
  Nature.Calm
]
export const DECREASE_DEFENSE = [
  Nature.Lonely,
  Nature.Hasty,
  Nature.Mild,
  Nature.Gentle
]
export const DECREASE_SPECIAL_ATTACK = [
  Nature.Adamant,
  Nature.Impish,
  Nature.Jolly,
  Nature.Careful
]
export const DECREASE_SPECIAL_DEFENSE = [
  Nature.Naughty,
  Nature.Lax,
  Nature.Naive,
  Nature.Rash
]
export const DECREASE_SPEED = [
  Nature.Brave,
  Nature.Relaxed,
  Nature.Quiet,
  Nature.Sassy
]

const TYPE_BASED_CATEGORIES = {
  [Type.Normal]: Category.Physical,
  [Type.Fighting]: Category.Physical,
  [Type.Flying]: Category.Physical,
  [Type.Poison]: Category.Physical,
  [Type.Ground]: Category.Physical,
  [Type.Rock]: Category.Physical,
  [Type.Bug]: Category.Physical,
  [Type.Ghost]: Category.Physical,
  [Type.Steel]: Category.Physical,
  [Type.Fire]: Category.Special,
  [Type.Water]: Category.Special,
  [Type.Grass]: Category.Special,
  [Type.Electric]: Category.Special,
  [Type.Psychic]: Category.Special,
  [Type.Ice]: Category.Special,
  [Type.Dragon]: Category.Special,
  [Type.Dark]: Category.Special,
  [Type.Fairy]: Category.Special
}

export function getMoveCategory (move: Move, generation: Generation): Category {
  if (Category.Status === move.category) return Category.Status

  return isIncludedGeneration(Generation.III, generation)
    ? TYPE_BASED_CATEGORIES[move.type]
    : move.category
}

export const GEN_GAMES = {
  [Generation.I]: [
    Game.RedBlue,
    Game.Yellow
  ],
  [Generation.II]: [
    Game.GoldSilver,
    Game.Crystal
  ],
  [Generation.III]: [
    Game.RubySapphire,
    Game.Emerald,
    Game.FireRedLeafGreen,
    Game.Colosseum,
    Game.XD
  ],
  [Generation.IV]: [
    Game.DiamondPearl,
    Game.Platinum,
    Game.HeartGoldSoulSilver
  ],
  [Generation.V]: [
    Game.BlackWhite,
    Game.Black2White2
  ],
  [Generation.VI]: [
    Game.XandY,
    Game.OmegaRubyAlphaSapphire
  ],
  [Generation.VII]: [
    Game.SunMoon,
    Game.UltraSunUltraMoon,
    Game.LetSGoPikachuLetSGoEevee
  ],
  [Generation.VIII]: [
    Game.SwordShield,
    Game.TheIsleOfArmor,
    Game.TheCrownTundra,
    Game.BrilliantDiamondAndShiningPearl,
    Game.LegendsArceus
  ],
  [Generation.IX]: [
    Game.ScarletViolet,
    Game.TheTealMask,
    Game.TheIndigoDisk
  ]
}

export const GAME_GEN = {
  [Game.RedBlue]: Generation.I,
  [Game.Yellow]: Generation.I,
  [Game.GoldSilver]: Generation.II,
  [Game.Crystal]: Generation.II,
  [Game.RubySapphire]: Generation.III,
  [Game.Emerald]: Generation.III,
  [Game.FireRedLeafGreen]: Generation.III,
  [Game.Colosseum]: Generation.III,
  [Game.XD]: Generation.III,
  [Game.DiamondPearl]: Generation.IV,
  [Game.Platinum]: Generation.IV,
  [Game.HeartGoldSoulSilver]: Generation.IV,
  [Game.BlackWhite]: Generation.V,
  [Game.Black2White2]: Generation.V,
  [Game.XandY]: Generation.VI,
  [Game.OmegaRubyAlphaSapphire]: Generation.VI,
  [Game.SunMoon]: Generation.VII,
  [Game.UltraSunUltraMoon]: Generation.VII,
  [Game.LetSGoPikachuLetSGoEevee]: Generation.VII,
  [Game.SwordShield]: Generation.VIII,
  [Game.TheIsleOfArmor]: Generation.VIII,
  [Game.TheCrownTundra]: Generation.VIII,
  [Game.BrilliantDiamondAndShiningPearl]: Generation.VIII,
  [Game.LegendsArceus]: Generation.VIII,
  [Game.ScarletViolet]: Generation.IX,
  [Game.TheTealMask]: Generation.IX,
  [Game.TheIndigoDisk]: Generation.IX
}