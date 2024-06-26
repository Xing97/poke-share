import { VALID_TERA_TYPES } from "@/model/constants"
import { type Gender, type Pokemon, type PokemonInfo, type Stats, type Type } from "@/model/pokemon"
import { fetchPokemon } from "@/services/poke-api"

const RE_HEAD =
  /^(?:(?:(.*) \()([A-Z][a-z0-9:']+\.?(?:[- ][A-Za-z][a-z0-9:']*\.?)*)\)|([A-Z][a-z0-9:']+\.?(?:[- ][A-Za-z][a-z0-9:']*\.?)*))(?: \(([MF])\))?(?: @ ([A-Z][a-z0-9:']*(?:[- ][A-Z][a-z0-9:']*)*))? *$/
const RE_MOVE =
  /^- ?([A-Z][a-z']*(?:[- ][A-Za-z][a-z']*)*(?: \[[A-Z][a-z]+\])?)(?: ?\/ ?[A-Z][a-z']*(?:[- ][A-Za-z][a-z']*)*)* *$/gm
const RE_NATURE = /^([A-Za-z]+) Nature/m

export async function parsePokemons(text: string): Promise<Array<PromiseSettledResult<Pokemon>>> {
  return await Promise.allSettled(
    text
      .trim()
      .split(/^\s*\n/m)
      .map(parsePokemon)
      .map(fetchPokemon)
  )
}

function parsePokemon(text: string): PokemonInfo {
  const lines = text.split("\n").map((line) => line.trim())

  const headMatch = lines[0].match(RE_HEAD) ?? []
  const name = headMatch[2] ?? headMatch[3]
  const nickname = headMatch[1]
  const gender = headMatch[4] as Gender
  const item = headMatch[5]

  const nature = text.match(RE_NATURE)?.[1].toLowerCase()
  const data = parseData(lines.slice(1))
  const evs = parseStats(data.get("EVs"), 0)
  const ivs = parseStats(data.get("IVs"), 31)

  const moves = [...text.matchAll(RE_MOVE)].map((match) => match[1].trim())

  let teraType: Type | undefined = data.get("Tera Type")?.toLowerCase() as Type
  if (!VALID_TERA_TYPES.includes(teraType)) {
    teraType = undefined
  }

  return {
    name,
    nickname,
    gender,
    item,
    nature,
    ability: data.get("Ability"),
    shiny: data.get("Shiny") === "Yes",
    evs,
    ivs,
    moves,
    teraType,
  }
}

function parseData(lines: string[]): Map<string, string> {
  return lines
    .filter((line) => line.includes(":"))
    .map((elm) => elm.split(":").map((item) => item.trim()))
    .reduce((map, elm) => {
      const [key, value] = elm
      map.set(key, value)
      return map
    }, new Map<string, string>())
}

function parseStats(text: string | undefined, defaultValue: number): Stats {
  const stats = {
    hp: defaultValue,
    attack: defaultValue,
    defense: defaultValue,
    specialAttack: defaultValue,
    specialDefense: defaultValue,
    speed: defaultValue,
  }

  if (text === undefined) {
    return stats
  }

  text
    .split("/")
    .map((elm) => elm.trim())
    .map((elm) => elm.split(" "))
    .forEach((elm) => {
      const [value, key] = elm
      if (key === "HP") {
        stats.hp = parseInt(value)
      } else if (key === "Atk") {
        stats.attack = parseInt(value)
      } else if (key === "Def") {
        stats.defense = parseInt(value)
      } else if (key === "SpA") {
        stats.specialAttack = parseInt(value)
      } else if (key === "SpD") {
        stats.specialDefense = parseInt(value)
      } else if (key === "Spe") {
        stats.speed = parseInt(value)
      }
    })

  return stats
}
