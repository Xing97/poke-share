import { type Name, type NamedAPIResource, type VersionGroupFlavorText } from '@/model/poke-api/common'

export interface IMove {
  id: number
  name: string
  accuracy: number
  pp: number
  priority: number
  power: number
  damage_class: NamedAPIResource
  flavor_text_entries: VersionGroupFlavorText[]
  names: Name[]
  type: NamedAPIResource
}
