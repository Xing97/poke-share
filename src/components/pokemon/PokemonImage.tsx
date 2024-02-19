import { useI18nName } from '@/hooks/useI18nName'
import FemaleIcon from '@/icons/FemaleIcon'
import MaleIcon from '@/icons/MaleIcon'
import PokeBallIcon from '@/icons/PokeBallIcon'
import QuestionIcon from '@/icons/QuestionIcon'
import TeraTypeBug from '@/icons/tera-types/TeraTypeBug'
import TeraTypeDark from '@/icons/tera-types/TeraTypeDark'
import TeraTypeDragon from '@/icons/tera-types/TeraTypeDragon'
import TeraTypeElectric from '@/icons/tera-types/TeraTypeElectric'
import TeraTypeFairy from '@/icons/tera-types/TeraTypeFairy'
import TeraTypeFighting from '@/icons/tera-types/TeraTypeFighting'
import TeraTypeFire from '@/icons/tera-types/TeraTypeFire'
import TeraTypeFlying from '@/icons/tera-types/TeraTypeFlying'
import TeraTypeGhost from '@/icons/tera-types/TeraTypeGhost'
import TeraTypeGrass from '@/icons/tera-types/TeraTypeGrass'
import TeraTypeGround from '@/icons/tera-types/TeraTypeGround'
import TeraTypeIce from '@/icons/tera-types/TeraTypeIce'
import TeraTypeNormal from '@/icons/tera-types/TeraTypeNormal'
import TeraTypePoison from '@/icons/tera-types/TeraTypePoison'
import TeraTypePsychic from '@/icons/tera-types/TeraTypePsychic'
import TeraTypeRock from '@/icons/tera-types/TeraTypeRock'
import TeraTypeSteel from '@/icons/tera-types/TeraTypeSteel'
import TeraTypeStellar from '@/icons/tera-types/TeraTypeStellar'
import TeraTypeWater from '@/icons/tera-types/TeraTypeWater'
import { Gender, Type, type Pokemon } from '@/model/pokemon'
import { useState } from 'react'

const TERA_TYPES = {
  [Type.Bug]: TeraTypeBug,
  [Type.Dark]: TeraTypeDark,
  [Type.Dragon]: TeraTypeDragon,
  [Type.Electric]: TeraTypeElectric,
  [Type.Fairy]: TeraTypeFairy,
  [Type.Fighting]: TeraTypeFighting,
  [Type.Fire]: TeraTypeFire,
  [Type.Flying]: TeraTypeFlying,
  [Type.Ghost]: TeraTypeGhost,
  [Type.Grass]: TeraTypeGrass,
  [Type.Ground]: TeraTypeGround,
  [Type.Ice]: TeraTypeIce,
  [Type.Normal]: TeraTypeNormal,
  [Type.Poison]: TeraTypePoison,
  [Type.Psychic]: TeraTypePsychic,
  [Type.Rock]: TeraTypeRock,
  [Type.Steel]: TeraTypeSteel,
  [Type.Water]: TeraTypeWater,
  [Type.Stellar]: TeraTypeStellar
}

function getTeraType (type: Type): JSX.Element {
  const Component = TERA_TYPES[type]
  return <Component className='absolute right-0 top-0 size-10' />
}

interface Props {
  pokemon: Pokemon
}

export default function PokemonImage ({ pokemon }: Props): JSX.Element {
  const i18n = useI18nName()
  const [pokemonImageError, setPokemonImageError] = useState(false)
  const [itemImageError, setItemImageError] = useState(false)

  return (
    <div className='relative flex size-52 items-center justify-center'>
      {pokemonImageError || pokemon.image == null
        ? <PokeBallIcon className='size-20' />
        : <img
            className='img-pokemon size-full' src={pokemon.image} alt={i18n(pokemon.name)}
            onError={() => { setPokemonImageError(true) }}
        />}
      {pokemon.gender === Gender.Male && <MaleIcon className='absolute left-0 top-0 size-8' />}
      {pokemon.gender === Gender.Female && <FemaleIcon className='absolute left-0 top-0 size-8' />}
      {pokemon.teraType != null && getTeraType(pokemon.teraType)}
      {pokemon.item != null &&
        (itemImageError || pokemon.item.image == null
          ? <QuestionIcon
              className='absolute bottom-0 right-0 size-1/6'
              title={i18n(pokemon.item.name)}
          />
          : <img
              className='img-item absolute bottom-0 right-0 size-1/4'
              src={pokemon.item.image}
              alt={i18n(pokemon.item.name)}
              title={i18n(pokemon.item.name)}
              onError={() => { setItemImageError(true) }}
          />)}
    </div>
  )
}
