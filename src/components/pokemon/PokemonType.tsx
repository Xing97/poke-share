import { Type } from '../../types.d'

const TYPES: Record<Type, string> = {
  [Type.Normal]: 'bg-normal',
  [Type.Fire]: 'bg-fire',
  [Type.Water]: 'bg-water',
  [Type.Electric]: 'bg-electric',
  [Type.Grass]: 'bg-grass',
  [Type.Ice]: 'bg-ice',
  [Type.Fighting]: 'bg-fighting',
  [Type.Poison]: 'bg-poison',
  [Type.Ground]: 'bg-ground',
  [Type.Flying]: 'bg-flying',
  [Type.Psychic]: 'bg-psychic',
  [Type.Bug]: 'bg-bug',
  [Type.Rock]: 'bg-rock',
  [Type.Ghost]: 'bg-ghost',
  [Type.Dragon]: 'bg-dragon',
  [Type.Dark]: 'bg-dark',
  [Type.Steel]: 'bg-steel',
  [Type.Fairy]: 'bg-fairy'
}

interface Props {
  children?: React.ReactNode
  type: Type
  className?: string
}

export default function PokemonType ({ children, type, className }: Props): JSX.Element {
  return (
    <div className={`${TYPES[type]} ${className} border-[3px] border-black/25 py-0.5 shadow`}>
      {children}
    </div>
  )
}
