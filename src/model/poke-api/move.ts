import {
  type Name,
  type NamedAPIResource,
  type VerboseEffect,
  type VersionGroupFlavorText,
} from "@/model/poke-api/common"

export interface IMove {
  id: number
  name: string
  accuracy?: number
  pp: number
  priority: number
  power?: number
  damage_class: NamedAPIResource
  effect_entries: VerboseEffect[]
  flavor_text_entries: VersionGroupFlavorText[]
  names: Name[]
  type: NamedAPIResource
  past_values: PastMoveStatValues[]
}

export interface PastMoveStatValues {
  accuracy?: number
  power?: number
  pp?: number
  effect_entries: VerboseEffect[]
  type?: NamedAPIResource
  version_group: NamedAPIResource
}
