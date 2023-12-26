import { type Name, type VersionGroupFlavorText } from './common'

export interface IItem {
  id: number
  name: string
  flavor_text_entries: VersionGroupFlavorText[]
  names: Name[]
  sprites: ItemSprites
}

export interface ItemSprites {
  default: string
}
