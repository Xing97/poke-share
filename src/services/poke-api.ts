import { type IAbility } from '@/model/poke-api/ability'
import { type Name, type VerboseEffect, type VersionGroupFlavorText } from '@/model/poke-api/common'
import { type IItem } from '@/model/poke-api/item'
import { type IMove } from '@/model/poke-api/move'
import { type IPokemon } from '@/model/poke-api/pokemon'
import { type IPokemonForm } from '@/model/poke-api/pokemon-form'
import { type IPokemonSpecies } from '@/model/poke-api/pokemon-species'
import {
  Nature,
  type Category,
  type EffectText,
  type FlavorText,
  type I18nName,
  type Pokemon,
  type PokemonInfo,
  type Type
} from '@/model/pokemon'
import { type Game, type Generation } from '@/stores/game'
import { Language } from '@/stores/language'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemon (pokeInput: PokemonInfo): Promise<Pokemon> {
  const pokemonPromise = fetchApi<IPokemon>('pokemon', pokeInput.name)
  const itemPromise = pokeInput.item != null ? fetchApi<IItem>('item', pokeInput.item) : undefined
  const abilityPromise = pokeInput.ability != null ? fetchApi<IAbility>('ability', pokeInput.ability) : undefined
  const movesPromise = Promise.all(pokeInput.moves.map(async m => await fetchApi<IMove>('move', m)))

  let [_pokemon, _item, _ability, _moves] = await Promise
    .all([pokemonPromise, itemPromise, abilityPromise, movesPromise])

  if (_ability === undefined) {
    const defaultAbility = _pokemon.abilities.find(a => a.slot === 1)
    if (defaultAbility === undefined) {
      throw new Error('No default ability found')
    }
    _ability = await fetchApi<IAbility>('ability', defaultAbility.ability.name)
  }

  const [_specie, _forms] = await Promise.all([
    fetchApi<IPokemonSpecies>('pokemon-species', _pokemon.species.name),
    Promise.all(_pokemon.forms
      .filter(f => f.name !== _pokemon.species.name)
      .map(async f => await fetchApi<IPokemonForm>('pokemon-form', f.name)))
  ])

  const pokemon: Pokemon = {
    id: _pokemon.id,
    order: _specie.pokedex_numbers.find(p => p.pokedex.name === 'national')?.entry_number ?? _specie.id,
    name: mapNames(_specie.names, _pokemon.name),
    forms: _forms.map(f => mapNames(f.form_names, f.name)),
    nickname: pokeInput.nickname,
    gender: pokeInput.gender,
    nature: pokeInput.nature as Nature ?? Nature.Hardy,
    ability: {
      name: mapNames(_ability.names, _ability.name),
      effectText: mapEffectText(_ability.effect_entries),
      flavorText: mapFlavorText(_ability.flavor_text_entries)
    },
    evs: pokeInput.evs,
    ivs: pokeInput.ivs,
    moves: _moves.map(m => ({
      id: m.id,
      name: mapNames(m.names, m.name),
      type: m.type.name as Type,
      category: m.damage_class.name as Category,
      pp: m.pp,
      power: m.power,
      accuracy: m.accuracy,
      priority: m.priority,
      effectText: mapEffectText(m.effect_entries),
      flavorText: mapFlavorText(m.flavor_text_entries),
      pastValues: m.past_values.map(v => ({
        accuracy: v.accuracy,
        power: v.power,
        pp: v.pp,
        effectText: mapEffectText(v.effect_entries),
        type: v.type?.name as Type,
        game: v.version_group.name as Game
      }))
    })),
    image: pokeInput.shiny === true ? _pokemon.sprites.front_shiny : _pokemon.sprites.front_default,
    stats: {
      hp: _pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat ?? NaN,
      attack: _pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat ?? NaN,
      defense: _pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat ?? NaN,
      specialAttack: _pokemon.stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? NaN,
      specialDefense: _pokemon.stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? NaN,
      speed: _pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat ?? NaN
    },
    types: _pokemon.types.map(t => t.type.name as Type),
    pastTypes: _pokemon.past_types.map(t => ({
      generation: t.generation.name as Generation,
      types: t.types.map(t => t.type.name as Type)
    })),
    teraType: pokeInput.teraType
  }

  if (_item !== undefined) {
    pokemon.item = {
      name: mapNames(_item.names, _item.name),
      effectText: mapEffectText(_item.effect_entries),
      flavorText: mapFlavorText(_item.flavor_text_entries),
      image: _item.sprites.default
    }
  }

  return pokemon
}

async function fetchApi<T> (entity: string, name: string): Promise<T> {
  const isHiddenPower = entity === 'move' && name.startsWith('Hidden Power')
  const idName = isHiddenPower ? 'hidden-power' : name.toLowerCase().replaceAll(' ', '-').replaceAll("'", '')

  const response = await fetch(`${BASE_URL}/${entity}/${idName}`)

  if (!response.ok) {
    throw new Error(`${entity} with name ${name} not found in PokeAPI`)
  }

  if (isHiddenPower) {
    const data = await response.json() as IMove
    data.type.name = name.substring(13).replace('[', '').replace(']', '').toLowerCase()
    return data as T
  }

  return await response.json() as T
}

function mapNames (names: Name[], name: string): I18nName {
  const i18nName: I18nName = {
    name
  }

  Object.values(Language).forEach((lang) => {
    i18nName[lang] = findLanguage(names, lang)
  })

  return i18nName
}

function findLanguage (names: Name[], language: Language): string | undefined {
  return names.find(n => n.language.name === language as string)?.name
}

function mapFlavorText (list: VersionGroupFlavorText[]): FlavorText {
  return list.reduce<FlavorText>((acc, item) => {
    const lang = acc[item.language.name as Language] ?? {}
    lang[item.version_group.name as Game] = item.text ?? item.flavor_text
    acc[item.language.name as Language] = lang
    return acc
  }, {})
}

function mapEffectText (list: VerboseEffect[]): EffectText {
  return list.reduce<EffectText>((acc, item) => {
    acc[item.language.name as Language] = { effect: item.effect, sortEffect: item.short_effect }
    return acc
  }, {})
}
