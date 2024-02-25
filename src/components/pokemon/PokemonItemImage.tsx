import { useI18nName } from '@/hooks/useI18nName'
import QuestionIcon from '@/icons/QuestionIcon'
import { type Item } from '@/model/pokemon'
import { useState } from 'react'

interface Props {
  item: Item
}

export default function PokemonItemImage ({ item }: Props): JSX.Element {
  const i18n = useI18nName()
  const [itemImageError, setItemImageError] = useState(false)

  return (itemImageError || item.image == null
    ? <QuestionIcon
        className='h-full p-2'
        aria-label={i18n(item.name)}
    />
    : <img
        className='img-item h-full'
        src={item.image}
        alt={i18n(item.name)}
        aria-label={i18n(item.name)}
        onError={() => { setItemImageError(true) }}
    />)
}
