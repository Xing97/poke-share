import { TYPES_BG_COLORS } from "@/components/styles"
import { type Type } from "@/model/pokemon"

interface Props {
  children?: React.ReactNode
  type: Type
  className?: string
}

export default function PokemonType({ children, type, className }: Props): JSX.Element {
  return (
    <div
      className={`${TYPES_BG_COLORS[type]} ${className} border-3 border-black/25 py-0.5 text-white`}
    >
      {children}
    </div>
  )
}
