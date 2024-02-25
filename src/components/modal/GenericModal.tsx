import useI18n from '@/hooks/useI18n'
import { type EffectText, type FlavorText, type I18nName } from '@/model/pokemon'

interface Props {
  entity: { name: I18nName, flavorText: FlavorText, effectText: EffectText }
  icon?: JSX.Element
  wikiPrefix?: string
}

export default function GenericModal ({ entity, icon, wikiPrefix = '' }: Props): JSX.Element {
  const { name, flavorText, effectText } = useI18n()

  const flavor = flavorText(entity.flavorText)
  const effect = effectText(entity.effectText)

  return (
    <section className='flex flex-col gap-4'>
      <header className='flex h-14 items-center gap-2'>
        {icon}
        <h1 className='text-3xl font-bold tracking-wide'>{name(entity.name)}</h1>
      </header>
      {flavor != null && <p className='font-medium'>{flavor}</p>}
      {effect != null && <p className=''>{effect}</p>}
      <a
        className='self-end text-blue-500 underline hover:text-white'
        href={`https://bulbapedia.bulbagarden.net/wiki/${entity.name.en + wikiPrefix}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        Bulbapedia
      </a>
    </section>
  )
}
