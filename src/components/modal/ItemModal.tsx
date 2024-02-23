import useFlavorText from '@/hooks/useFlavorText'
import { useI18nName } from '@/hooks/useI18nName'
import { type Item } from '@/model/pokemon'
import PokemonItemImage from '../pokemon/PokemonItemImage'

interface Props {
  item: Item
}

export default function ItemModal ({ item }: Props): JSX.Element {
  const i18n = useI18nName()
  const flavorText = useFlavorText()

  return (
    <section className='flex flex-col gap-4'>
      <header className='flex h-16 items-center gap-4'>
        <PokemonItemImage item={item} />
        <h1 className='text-3xl font-bold tracking-wider'>{i18n(item.name)}</h1>
      </header>
      <main>
        <p>{flavorText(item.flavorText)}</p>
      </main>
    </section>
  )
}
