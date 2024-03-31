import {
  DECREASE_ATTACK,
  DECREASE_DEFENSE,
  DECREASE_SPECIAL_ATTACK,
  DECREASE_SPECIAL_DEFENSE,
  DECREASE_SPEED,
  INCREASE_ATTACK,
  INCREASE_DEFENSE,
  INCREASE_SPECIAL_ATTACK,
  INCREASE_SPECIAL_DEFENSE,
  INCREASE_SPEED,
} from "@/model/constants"
import { type Pokemon, type Stats } from "@/model/pokemon"

export function calculateStats(pokemon: Pokemon, level: number): Stats {
  const base = pokemon.stats
  const evs = pokemon.evs
  const ivs = pokemon.ivs

  return {
    hp: calculateHP(base.hp, evs.hp, ivs.hp, level),
    attack: calculateStat(
      base.attack,
      evs.attack,
      ivs.attack,
      level,
      INCREASE_ATTACK.includes(pokemon.nature)
        ? 1.1
        : DECREASE_ATTACK.includes(pokemon.nature)
          ? 0.9
          : 1
    ),
    defense: calculateStat(
      base.defense,
      evs.defense,
      ivs.defense,
      level,
      INCREASE_DEFENSE.includes(pokemon.nature)
        ? 1.1
        : DECREASE_DEFENSE.includes(pokemon.nature)
          ? 0.9
          : 1
    ),
    specialAttack: calculateStat(
      base.specialAttack,
      evs.specialAttack,
      ivs.specialAttack,
      level,
      INCREASE_SPECIAL_ATTACK.includes(pokemon.nature)
        ? 1.1
        : DECREASE_SPECIAL_ATTACK.includes(pokemon.nature)
          ? 0.9
          : 1
    ),
    specialDefense: calculateStat(
      base.specialDefense,
      evs.specialDefense,
      ivs.specialDefense,
      level,
      INCREASE_SPECIAL_DEFENSE.includes(pokemon.nature)
        ? 1.1
        : DECREASE_SPECIAL_DEFENSE.includes(pokemon.nature)
          ? 0.9
          : 1
    ),
    speed: calculateStat(
      base.speed,
      evs.speed,
      ivs.speed,
      level,
      INCREASE_SPEED.includes(pokemon.nature)
        ? 1.1
        : DECREASE_SPEED.includes(pokemon.nature)
          ? 0.9
          : 1
    ),
  }
}

function calculateHP(base: number, ev: number, iv: number, level: number): number {
  return (((2 * base + iv + (ev >> 2)) * level) / 100 + level + 10) | 0
}

function calculateStat(
  base: number,
  ev: number,
  iv: number,
  level: number,
  nature: number
): number {
  return ((((2 * base + iv + (ev >> 2)) * level) / 100 + 5) * nature) | 0
}
