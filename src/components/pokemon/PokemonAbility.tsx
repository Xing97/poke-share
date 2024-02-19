import { useI18nName } from '@/hooks/useI18nName'
import AbilityIcon from '@/icons/AbilityIcon'
import { type Ability } from '@/model/pokemon'

interface Props {
  ability: Ability
}

export default function PokemonAbility ({ ability }: Props): JSX.Element {
  const i18n = useI18nName()

  return (
    <div className='flex items-center gap-2'>
      <AbilityIcon className='size-8' />
      <span>{i18n(ability.name)}</span>
    </div>
  )
}
