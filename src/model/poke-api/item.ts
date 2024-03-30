import { type Name, type VerboseEffect, type VersionGroupFlavorText } from "@/model/poke-api/common"

export interface IItem {
  id: number
  name: string
  effect_entries: VerboseEffect[]
  flavor_text_entries: VersionGroupFlavorText[]
  names: Name[]
  sprites: ItemSprites
}

export interface ItemSprites {
  default: string
}
