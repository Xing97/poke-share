import { type Name, type VersionGroupFlavorText } from '@/model/poke-api/common'

export interface IAbility {
  id: number
  name: string
  names: Name[]
  flavor_text_entries: VersionGroupFlavorText[]
}
