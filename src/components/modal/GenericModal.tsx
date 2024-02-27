import useI18n from '@/hooks/useI18n'
import { type EffectText, type FlavorText, type I18nName } from '@/model/pokemon'
import lazyWithPreload from 'react-lazy-with-preload'

const TextModal = lazyWithPreload(async () => await import('@/components/modal/TextModal'))

void TextModal.preload()

interface Props {
  entity: { name: I18nName, flavorText: FlavorText, effectText: EffectText }
  icon?: JSX.Element
  wikiPrefix?: string
}

export default function GenericModal ({ entity, icon, wikiPrefix = '' }: Props): JSX.Element {
  const { name } = useI18n()

  return (
    <section className='flex flex-col gap-4'>
      <header className='flex h-14 items-center gap-2'>
        {icon}
        <h1 className='text-3xl font-bold tracking-wide'>{name(entity.name)}</h1>
      </header>
      <TextModal entity={entity} wikiPrefix={wikiPrefix} />
    </section>
  )
}
