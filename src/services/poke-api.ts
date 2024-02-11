import { type IAbility } from '@/model/poke-api/ability'
import { type Name } from '@/model/poke-api/common'
import { type IItem } from '@/model/poke-api/item'
import { type IMove } from '@/model/poke-api/move'
import { type IPokemon } from '@/model/poke-api/pokemon'
import { type IPokemonSpecies } from '@/model/poke-api/pokemon-species'
import {
  type Category,
  type I18nName,
  type Move,
  type Nature,
  type Pokemon,
  type PokemonInfo,
  type Type
} from '@/model/pokemon'
import { type Generation } from '@/stores/game'
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

  const _specie = await fetchApi<IPokemonSpecies>('pokemon-species', _pokemon.species.name)

  const pokemon: Pokemon = {
    id: _pokemon.id,
    order: _specie.pokedex_numbers.find(p => p.pokedex.name === 'national')?.entry_number ?? _specie.id,
    name: mapNames(_specie.names, _pokemon.name),
    nickname: pokeInput.nickname,
    gender: pokeInput.gender,
    item: undefined,
    nature: pokeInput.nature as Nature,
    ability: {
      name: mapNames(_ability.names, _ability.name),
      description: _ability.flavor_text_entries.find(f => f.language.name === 'en')?.flavor_text ?? '???'
    },
    evs: pokeInput.evs,
    ivs: pokeInput.ivs,
    moves: _moves.map<Move>(m => ({
      id: m.id,
      name: mapNames(m.names, m.name),
      type: m.type.name as Type,
      category: m.damage_class.name as Category,
      pp: m.pp,
      power: m.power,
      accuracy: m.accuracy,
      priority: m.priority,
      description: m.flavor_text_entries.find(f => f.language.name === 'en')?.flavor_text ?? '???'
    })),
    image: pokeInput.shiny === true ? _pokemon.sprites.front_shiny : _pokemon.sprites.front_default,
    stats: {
      hp: _pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat ?? NaN,
      attack: _pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat ?? NaN,
      defense: _pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat ?? NaN,
      special_attack: _pokemon.stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? NaN,
      special_defense: _pokemon.stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? NaN,
      speed: _pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat ?? NaN
    },
    types: _pokemon.types.map(t => t.type.name as Type),
    past_types: _pokemon.past_types.map(t => ({
      generation: t.generation.name as Generation,
      types: t.types.map(t => t.type.name as Type)
    }))
  }

  if (_item !== undefined) {
    pokemon.item = {
      name: mapNames(_item.names, _item.name),
      description: _item.flavor_text_entries.find(f => f.language.name === 'en')?.text ?? '???',
      image: _item.sprites.default
    }
  }

  return pokemon
}

async function fetchApi<T> (entity: string, name: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${entity}/${name.toLowerCase().replaceAll(' ', '-')}`)

  if (!response.ok) {
    throw new Error(`${entity} with name ${name} not found in PokeAPI`)
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
