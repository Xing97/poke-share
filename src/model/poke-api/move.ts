import { type Name, type NamedAPIResource } from './common'

export interface IMove {
  id: number
  name: string
  accuracy: number
  pp: number
  priority: number
  power: number
  damage_class: NamedAPIResource
  flavor_text_entries: MoveFlavorText[]
  names: Name[]
  type: NamedAPIResource
}

export interface MoveFlavorText {
  flavor_text: string
  language: NamedAPIResource
  version_group: NamedAPIResource
}
