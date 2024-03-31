import { type Name } from "@/model/poke-api/common"

export interface IPokemonForm {
  id: number
  name: string
  form_name: string
  form_names: Name[]
}
