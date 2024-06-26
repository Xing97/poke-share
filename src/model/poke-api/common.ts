export interface Name {
  name: string
  language: NamedAPIResource
}

export interface NamedAPIResource {
  name: string
}

export interface VerboseEffect {
  effect: string
  short_effect: string
  language: NamedAPIResource
}

export interface VersionGroupFlavorText {
  text?: string
  flavor_text?: string
  language: NamedAPIResource
  version_group: NamedAPIResource
}
