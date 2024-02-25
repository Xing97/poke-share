import useI18n from '@/hooks/useI18n'
import QuestionIcon from '@/icons/QuestionIcon'
import { type Item } from '@/model/pokemon'
import { useState } from 'react'

interface Props {
  item: Item
}

export default function PokemonItemImage ({ item }: Props): JSX.Element {
  const { name } = useI18n()
  const [itemImageError, setItemImageError] = useState(false)

  return (itemImageError || item.image == null
    ? <QuestionIcon
        className='h-full p-2'
        aria-label={name(item.name)}
    />
    : <img
        className='img-item h-full'
        src={item.image}
        alt={name(item.name)}
        aria-label={name(item.name)}
        onError={() => { setItemImageError(true) }}
    />)
}
