import { useI18nName } from '@/hooks/useI18nName'
import FemaleIcon from '@/icons/FemaleIcon'
import MaleIcon from '@/icons/MaleIcon'
import PokeBallIcon from '@/icons/PokeBallIcon'
import QuestionIcon from '@/icons/QuestionIcon'
import { Gender, type Pokemon } from '@/model/pokemon'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  pokemon: Pokemon
}

export default function PokemonImage ({ pokemon }: Props): JSX.Element {
  const i18n = useI18nName()
  const { t } = useTranslation()
  const [pokemonImageError, setPokemonImageError] = useState(false)
  const [itemImageError, setItemImageError] = useState(false)

  return (
    <div className='relative flex h-52 w-52 items-center justify-center'>
      {pokemonImageError || pokemon.image == null
        ? <PokeBallIcon className='h-20 w-20' />
        : <img
            className='img-pokemon h-full w-full' src={pokemon.image} alt={i18n(pokemon.name)}
            onError={() => { setPokemonImageError(true) }}
        />}
      {pokemon.gender === Gender.Male && <MaleIcon className='absolute left-0 top-0 h-8 w-8' />}
      {pokemon.gender === Gender.Female && <FemaleIcon className='absolute left-0 top-0 h-8 w-8' />}
      {pokemon.teraType != null && <img
        className='absolute right-0 top-0 h-10 w-10'
        src={`/img/tera_type_${pokemon.teraType}.webp`}
        alt={pokemon.teraType}
        title={t('types.' + pokemon.teraType)}
      />}
      {pokemon.item != null &&
        (itemImageError || pokemon.item.image == null
          ? <QuestionIcon
              className='absolute bottom-0 right-0 h-1/6 w-1/6'
              title={i18n(pokemon.item.name)}
          />
          : <img
              className='img-item absolute bottom-0 right-0 h-1/4 w-1/4'
              src={pokemon.item.image}
              alt={i18n(pokemon.item.name)}
              title={i18n(pokemon.item.name)}
              onError={() => { setItemImageError(true) }}
          />)}
    </div>
  )
}
