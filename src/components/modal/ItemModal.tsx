import PokemonItemImage from '@/components/pokemon/PokemonItemImage'
import useFlavorText from '@/hooks/useFlavorText'
import { useI18nName } from '@/hooks/useI18nName'
import { type Item } from '@/model/pokemon'

interface Props {
  item: Item
}

export default function ItemModal ({ item }: Props): JSX.Element {
  const i18n = useI18nName()
  const flavorText = useFlavorText()

  return (
    <section className='flex flex-col gap-4'>
      <header className='flex h-16 items-center gap-2'>
        <PokemonItemImage item={item} />
        <h1 className='text-2xl font-bold tracking-wide'>{i18n(item.name)}</h1>
      </header>
      <main>
        <p>{flavorText(item.flavorText) ?? '???'}</p>
      </main>
    </section>
  )
}
