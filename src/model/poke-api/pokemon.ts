import { type NamedAPIResource } from '@/model/poke-api/common'

export interface IPokemon {
  id: number
  name: string
  abilities: PokemonAbility[]
  forms: NamedAPIResource[]
  past_types: PokemonPastType[]
  sprites: PokemonSprites
  species: NamedAPIResource
  stats: PokemonStat[]
  types: PokemonType[]
}

export interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export interface PokemonPastType {
  generation: NamedAPIResource
  types: PokemonType[]
}

export interface PokemonSprites {
  front_default: string
  front_shiny: string
  front_female: string
  front_shiny_female: string
}

export interface PokemonStat {
  stat: NamedAPIResource
  base_stat: number
}

export interface PokemonType {
  slot: number
  type: NamedAPIResource
}
