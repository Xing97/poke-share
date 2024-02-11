/* eslint-disable @typescript-eslint/naming-convention */
import { type AbilityFlavorText, type IAbility } from '../model/poke-api/ability'
import { type Name, type NamedAPIResource, type VersionGroupFlavorText } from '../model/poke-api/common'
import { type IItem, type ItemSprites } from '../model/poke-api/item'
import { type IMove, type MoveFlavorText } from '../model/poke-api/move'
import {
  type IPokemon,
  type PokemonAbility,
  type PokemonPastType,
  type PokemonSprites,
  type PokemonStat,
  type PokemonType
} from '../model/poke-api/pokemon'
import { type IPokemonSpecies, type PokemonSpeciesDexEntry } from '../model/poke-api/pokemon-species'

interface Param {
  response: Response
}

export async function cachePokemon ({ response }: Param): Promise<Response> {
  const parsePokemon = ({
    id,
    name,
    abilities,
    past_types,
    sprites,
    species,
    stats,
    types
  }: IPokemon): IPokemon => ({
    id,
    name,
    abilities: parseAbilities(abilities),
    past_types: parsePastTypes(past_types),
    sprites: parseSprites(sprites),
    species: parseNamedAPIResource(species),
    stats: parseStats(stats),
    types: parsePokemonTypes(types)
  })

  const parseAbilities = (abilities: PokemonAbility[]): PokemonAbility[] =>
    abilities.map(({ is_hidden, slot, ability }) => ({
      is_hidden,
      slot,
      ability: parseNamedAPIResource(ability)
    }))

  const parsePastTypes = (past_types: PokemonPastType[]): PokemonPastType[] =>
    past_types.map(({ generation, types }) => ({
      generation: parseNamedAPIResource(generation),
      types: parsePokemonTypes(types)
    }))

  const parsePokemonTypes = (types: PokemonType[]): PokemonType[] =>
    types.map(({ slot, type }) => ({
      slot,
      type: parseNamedAPIResource(type)
    }))

  const parseSprites = ({
    front_default,
    front_shiny,
    front_female,
    front_shiny_female
  }: PokemonSprites): PokemonSprites => ({
    front_default,
    front_shiny,
    front_female,
    front_shiny_female
  })

  const parseStats = (stats: PokemonStat[]): PokemonStat[] =>
    stats.map(({ stat, base_stat }) => ({
      stat: parseNamedAPIResource(stat),
      base_stat
    }))

  const parseNamedAPIResource = ({ name }: NamedAPIResource): NamedAPIResource => ({
    name
  })

  const data = await response.json() as IPokemon
  return new Response(JSON.stringify(parsePokemon(data)), {
    headers: response.headers
  })
}

export async function cacheItem ({ response }: Param): Promise<Response> {
  const parseItem = ({
    id,
    name,
    flavor_text_entries,
    names,
    sprites
  }: IItem): IItem => ({
    id,
    name,
    flavor_text_entries: parseFlavorTextEntries(flavor_text_entries),
    names: parseNames(names),
    sprites: parseItemSprites(sprites)
  })

  const parseFlavorTextEntries = (flavor_text_entries: VersionGroupFlavorText[]): VersionGroupFlavorText[] =>
    flavor_text_entries
      .filter(({ text, language }, index, array) =>
        array.find((a, i) => a.language.name === language.name && index < i && a.text === text) == null)
      .map(({ text, language, version_group }) => ({
        text,
        language: parseNamedAPIResource(language),
        version_group: parseNamedAPIResource(version_group)
      }))

  const parseNames = (names: Name[]): Name[] =>
    names.map(({ name, language }) => ({
      name,
      language: parseNamedAPIResource(language)
    }))

  const parseItemSprites = (sprite: ItemSprites): ItemSprites => ({
    default: sprite.default
  })

  const parseNamedAPIResource = ({ name }: NamedAPIResource): NamedAPIResource => ({
    name
  })

  const data = await response.json() as IItem
  return new Response(JSON.stringify(parseItem(data)), {
    headers: response.headers
  })
}

export async function cachePokemonSpecies ({ response }: Param): Promise<Response> {
  const parsePokemonSpecies = ({
    id,
    name,
    names,
    pokedex_numbers
  }: IPokemonSpecies): IPokemonSpecies => ({
    id,
    name,
    names: parseNames(names),
    pokedex_numbers: parsePokedexNumbers(pokedex_numbers)
  })

  const parsePokedexNumbers = (pokedex_numbers: PokemonSpeciesDexEntry[]): PokemonSpeciesDexEntry[] =>
    pokedex_numbers.map(({ entry_number, pokedex }) => ({
      entry_number,
      pokedex: parseNamedAPIResource(pokedex)
    }))

  const parseNames = (names: Name[]): Name[] =>
    names.map(({ name, language }) => ({
      name,
      language: parseNamedAPIResource(language)
    }))

  const parseNamedAPIResource = ({ name }: NamedAPIResource): NamedAPIResource => ({
    name
  })

  const data = await response.json() as IPokemonSpecies
  return new Response(JSON.stringify(parsePokemonSpecies(data)), {
    headers: response.headers
  })
}

export async function cacheMove ({ response }: Param): Promise<Response> {
  const parseMove = ({
    id,
    name,
    accuracy,
    pp,
    priority,
    power,
    damage_class,
    flavor_text_entries,
    names,
    type
  }: IMove): IMove => ({
    id,
    name,
    accuracy,
    pp,
    priority,
    power,
    damage_class: parseNamedAPIResource(damage_class),
    flavor_text_entries: parseFlavorTextEntries(flavor_text_entries),
    names: parseNames(names),
    type: parseNamedAPIResource(type)
  })

  const parseFlavorTextEntries = (flavor_text_entries: MoveFlavorText[]): MoveFlavorText[] =>
    flavor_text_entries
      .filter(({ flavor_text, language }, index, array) =>
        array.find((a, i) => a.language.name === language.name && index < i && a.flavor_text === flavor_text) == null)
      .map(({ flavor_text, language, version_group }) => ({
        flavor_text,
        language: parseNamedAPIResource(language),
        version_group: parseNamedAPIResource(version_group)
      }))

  const parseNames = (names: Name[]): Name[] =>
    names.map(({ name, language }) => ({
      name,
      language: parseNamedAPIResource(language)
    }))

  const parseNamedAPIResource = ({ name }: NamedAPIResource): NamedAPIResource => ({
    name
  })

  const data = await response.json() as IMove
  return new Response(JSON.stringify(parseMove(data)), {
    headers: response.headers
  })
}

export async function cacheAbility ({ response }: Param): Promise<Response> {
  const parseAbility = ({
    id,
    name,
    names,
    flavor_text_entries
  }: IAbility): IAbility => ({
    id,
    name,
    names: parseNames(names),
    flavor_text_entries: parseFlavorTextEntries(flavor_text_entries)
  })

  const parseNames = (names: Name[]): Name[] =>
    names.map(({ name, language }) => ({
      name,
      language: parseNamedAPIResource(language)
    }))

  const parseFlavorTextEntries = (flavor_text_entries: AbilityFlavorText[]): AbilityFlavorText[] =>
    flavor_text_entries
      .filter(({ flavor_text, language }, index, array) =>
        array.find((a, i) => a.language.name === language.name && index < i && a.flavor_text === flavor_text) == null)
      .map(({ flavor_text, language, version_group }) => ({
        flavor_text,
        language: parseNamedAPIResource(language),
        version_group: parseNamedAPIResource(version_group)
      }))

  const parseNamedAPIResource = ({ name }: NamedAPIResource): NamedAPIResource => ({
    name
  })

  const data = await response.json() as IAbility
  return new Response(JSON.stringify(parseAbility(data)), {
    headers: response.headers
  })
}
