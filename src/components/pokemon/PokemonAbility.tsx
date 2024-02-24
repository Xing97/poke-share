import { useI18nName } from '@/hooks/useI18nName'
import AbilityIcon from '@/icons/AbilityIcon'
import { type Ability } from '@/model/pokemon'
import { useModalStore } from '@/stores/modal'
import AbilityModal from '../modal/AbilityModal'

interface Props {
  ability: Ability
}

export default function PokemonAbility ({ ability }: Props): JSX.Element {
  const i18n = useI18nName()
  const showModal = useModalStore(state => state.showModal)

  return (
    <button
      className='mr-auto flex items-center gap-2 transition-transform hover:scale-110'
      onClick={() => { showModal(<AbilityModal ability={ability} />) }}
    >
      <AbilityIcon className='size-8' />
      <span>{i18n(ability.name)}</span>
    </button>
  )
}
