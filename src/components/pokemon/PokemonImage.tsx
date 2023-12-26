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
      {pokemon.gender === Gender.Male && <MaleIcon className='absolute' height='28px' width='28px' />}
      {pokemon.gender === Gender.Female && <FemaleIcon className='absolute' height='28px' width='28px' />}
      <img className='img-pokemon' src={pokemon.image} alt={pokemon.name} />
      {pokemon.item != null &&
        <img className='img-item' src={pokemon.item.image} alt={i18n(pokemon.item.name)} title={i18n(pokemon.item.name)} />}
    </div>
  )
}
