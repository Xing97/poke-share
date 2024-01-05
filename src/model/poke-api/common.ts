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
}

export interface VersionGroupFlavorText {
  text: string
  language: NamedAPIResource
  version_group: NamedAPIResource
}
