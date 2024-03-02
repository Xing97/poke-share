import { type Name, type VerboseEffect, type VersionGroupFlavorText } from '@/model/poke-api/common'

export interface IAbility {
  id: number
  name: string
  names: Name[]
  effect_entries: VerboseEffect[]
  flavor_text_entries: VersionGroupFlavorText[]
}
