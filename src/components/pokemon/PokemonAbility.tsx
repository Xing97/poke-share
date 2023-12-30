import { useI18nName } from '../../hooks/useI18nName'
import { type Ability } from '../../types'
import AbilitityIcon from '../icons/AbilityIcon'

interface Props {
  ability: Ability
}

export default function PokemonAbility ({ ability }: Props): JSX.Element {
  const i18n = useI18nName()

  return (
    <div className='flex items-center gap-2'>
      <AbilitityIcon height='32px' width='32px' />
      <span>{i18n(ability.name)}</span>
    </div>
  )
}
