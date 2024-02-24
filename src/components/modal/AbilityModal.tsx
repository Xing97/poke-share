import useFlavorText from '@/hooks/useFlavorText'
import { useI18nName } from '@/hooks/useI18nName'
import AbilityIcon from '@/icons/AbilityIcon'
import { type Ability } from '@/model/pokemon'

interface Props {
  ability: Ability
}

export default function AbilityModal ({ ability }: Props): JSX.Element {
  const i18n = useI18nName()
  const flavorText = useFlavorText()

  return (
    <section className='flex flex-col gap-4'>
      <header className='flex h-16 items-center gap-2'>
        <AbilityIcon className='h-full p-3' />
        <h1 className='text-2xl font-bold tracking-wide'>{i18n(ability.name)}</h1>
      </header>
      <main>
        <p>{flavorText(ability.flavorText) ?? '???'}</p>
      </main>
    </section>
  )
}
