import { type Name, type NamedAPIResource } from './common'

export interface IAbility {
  id: number
  name: string
  names: Name[]
  flavor_text_entries: AbilityFlavorText[]
}

export interface AbilityFlavorText {
  flavor_text: string
  language: NamedAPIResource
  version_group: NamedAPIResource
}
