import useI18n from "@/hooks/useI18n"
import QuestionIcon from "@/icons/QuestionIcon"
import { type Item } from "@/model/pokemon"
import { useState } from "react"

interface Props {
  item: Item
}

export default function PokemonItemImage({ item }: Props): JSX.Element {
  const { resolveName } = useI18n()
  const [itemImageError, setItemImageError] = useState(false)

  return itemImageError || item.image == null ? (
    <QuestionIcon className="h-full p-2" aria-label={resolveName(item.name)} />
  ) : (
    <img
      className="img-item h-full"
      src={item.image}
      alt={resolveName(item.name)}
      aria-label={resolveName(item.name)}
      onError={() => {
        setItemImageError(true)
      }}
    />
  )
}
