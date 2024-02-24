import { GEN_GAME } from '@/model/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  Colosseum = 'colosseum',
  XD = 'xd',
  DiamondPearl = 'diamond-pearl',
  Platinum = 'platinum',
  HeartGoldSoulSilver = 'heartgold-soulsilver',
  BlackWhite = 'black-white',
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

interface GameStore {
  generation: Generation
  game: Game
  setGeneration: (generation: Generation) => void
  setGame: (game: Game) => void
}

export const useGameStore = create<GameStore>()(
  persist((set) => ({
    generation: Generation.IX,
    game: Game.ScarletViolet,
    setGeneration (generation) { set({ generation, game: GEN_GAME[generation] }) },
    setGame (game) { set({ game }) }
  }),
  { name: '__MW::game' })
)
