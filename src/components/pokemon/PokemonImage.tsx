import { useI18nName } from '../../hooks/useI18nName'
import { Gender, type Pokemon } from '../../types.d'
import FemaleIcon from '../icons/FemaleIcon'
import MaleIcon from '../icons/MaleIcon'

interface Props {
  pokemon: Pokemon
}

export default function PokemonImage ({ pokemon }: Props): JSX.Element {
  const i18n = useI18nName()

  return (
    <div className='relative'>
      {pokemon.gender === Gender.Male && <MaleIcon className='absolute' height='32px' width='32px' />}
      {pokemon.gender === Gender.Female && <FemaleIcon className='absolute' height='32px' width='32px' />}
      <img className='img-pokemon' src={pokemon.image} alt={i18n(pokemon.name)} />
      {pokemon.item != null &&
        <img className='img-item absolute bottom-0 right-0' src={pokemon.item.image} alt={i18n(pokemon.item.name)} title={i18n(pokemon.item.name)} />}
    </div>
  )
}
