import {
  type Category,
  type I18nName,
  type Move,
  type Nature,
  type Pokemon,
  type PokemonInput,
  type Type
} from '../types'
import { type IAbility } from './model/ability'
import { type Name } from './model/common'
import { type IItem } from './model/item'
import { type IMove } from './model/move'
import { type IPokemon } from './model/pokemon'
import { type IPokemonSpecies } from './model/pokemon-species'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemon (pokeInput: PokemonInput): Promise<Pokemon> {
  const pokemonPromise = fetchApi<IPokemon>('pokemon', pokeInput.name)
  const itemPromise = pokeInput.item != null ? fetchApi<IItem>('item', pokeInput.item) : undefined
  const abilityPromise = pokeInput.ability != null ? fetchApi<IAbility>('ability', pokeInput.ability) : undefined
  const movesPromise = Promise.all(pokeInput.moves.map(async m => await fetchApi<IMove>('move', m)))

  const [_pokemon, _item, _ability, _moves] = await Promise
    .all([pokemonPromise, itemPromise, abilityPromise, movesPromise])

  const _specie = await fetchApi<IPokemonSpecies>('pokemon-species', _pokemon.species.name)

  const pokemon: Pokemon = {
    id: _pokemon.id,
    order: _specie.pokedex_numbers.find(p => p.pokedex.name === 'national')?.entry_number ?? _specie.id,
    species: _pokemon.species.name,
    name: mapNames(_specie.names, _pokemon.name),
    nickname: pokeInput.nickname,
    gender: pokeInput.gender,
    item: undefined,
    nature: pokeInput.nature as Nature,
    ability: undefined, // TODO add default
    evs: pokeInput.evs,
    ivs: pokeInput.ivs,
    moves: _moves.map<Move>(m => ({
      id: m.id,
      name: mapNames(m.names, m.name),
      type: m.type.name as unknown as Type,
      category: m.damage_class.name as unknown as Category,
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
      specialAttack: _pokemon.stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? NaN,
      specialDefense: _pokemon.stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? NaN,
      speed: _pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat ?? NaN
    },
    types: _pokemon.types.map(t => t.type.name as unknown as Type)
  }

  if (_item !== undefined) {
    pokemon.item = {
      name: mapNames(_item.names, _item.name),
      description: _item.flavor_text_entries.find(f => f.language.name === 'en')?.text ?? '???',
      image: _item.sprites.default
    }
  }

  if (_ability !== undefined) {
    pokemon.ability = {
      name: mapNames(_ability.names, _ability.name),
      description: _ability.flavor_text_entries.find(f => f.language.name === 'en')?.flavor_text ?? '???'
    }
  }

  return pokemon
}

async function fetchApi<T> (entity: string, name: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${entity}/${name.toLowerCase().replaceAll(' ', '-')}`)
  const data = await response.json() as T
  return data
}

function mapNames (names: Name[], name: string): I18nName {
  return {
    name,
    en: names.find(n => n.language.name === 'en')?.name,
    es: names.find(n => n.language.name === 'es')?.name,
    fr: names.find(n => n.language.name === 'fr')?.name,
    de: names.find(n => n.language.name === 'de')?.name,
    it: names.find(n => n.language.name === 'it')?.name,
    cs: names.find(n => n.language.name === 'cs')?.name,
    ko: names.find(n => n.language.name === 'ko')?.name,
    ja: names.find(n => n.language.name === 'ja')?.name,
    'pt-BR': names.find(n => n.language.name === 'pt-BR')?.name,
    'ja-Hrkt': names.find(n => n.language.name === 'ja-Hrkt')?.name,
    'zh-Hant': names.find(n => n.language.name === 'zh-Hant')?.name,
    'zh-Hans': names.find(n => n.language.name === 'zh-Hans')?.name
  }
}
