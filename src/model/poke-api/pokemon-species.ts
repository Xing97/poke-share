import { type Name, type NamedAPIResource } from './common'

export interface IPokemonSpecies {
  id: number
  name: string
  names: Name[]
  pokedex_numbers: PokemonSpeciesDexEntry[]
}

export interface PokemonSpeciesDexEntry {
  entry_number: number
  pokedex: NamedAPIResource
}
