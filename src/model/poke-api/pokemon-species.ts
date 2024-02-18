import { type Name, type NamedAPIResource } from '@/model/poke-api/common'

export interface IPokemonSpecies {
  id: number
  name: string
  order: number
  names: Name[]
  pokedex_numbers: PokemonSpeciesDexEntry[]
}

interface PokemonSpeciesDexEntry {
  entry_number: number
  pokedex: NamedAPIResource
}
