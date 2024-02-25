import useI18n from '@/hooks/useI18n'
import AbilityIcon from '@/icons/AbilityIcon'
import { type Ability } from '@/model/pokemon'
import { useModalStore } from '@/stores/modal'
import PokemonModal from '../modal/GenericModal'

interface Props {
  ability: Ability
}

export default function PokemonAbility ({ ability }: Props): JSX.Element {
  const { name } = useI18n()
  const showModal = useModalStore(state => state.showModal)

  return (
    <button
      className='mr-auto flex items-center gap-2 transition-transform hover:scale-110'
      onClick={() => {
        showModal(<PokemonModal
          entity={ability}
          icon={<AbilityIcon className='h-full p-3' />}
        />)
      }}
    >
      <AbilityIcon className='size-8' />
      <span>{name(ability.name)}</span>
    </button>
  )
}
