import PokemonModal from '@/components/modal/GenericModal'
import PokemonItemImage from '@/components/pokemon/PokemonItemImage'
import useI18n from '@/hooks/useI18n'
import FemaleIcon from '@/icons/FemaleIcon'
import MaleIcon from '@/icons/MaleIcon'
import PokeBallIcon from '@/icons/PokeBallIcon'
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
import { useModalStore } from '@/stores/modal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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

interface Props {
  pokemon: Pokemon
}

export default function PokemonImage ({ pokemon }: Props): JSX.Element {
  const { t } = useTranslation()
  const { name } = useI18n()
  const [pokemonImageError, setPokemonImageError] = useState(false)
  const showModal = useModalStore(state => state.showModal)

  const pokemonItem = pokemon.item

  return (
    <div className='relative flex size-52 items-center justify-center'>
      {pokemonImageError || pokemon.image == null
        ? <PokeBallIcon className='size-20' />
        : <img
            className='img-pokemon size-full' src={pokemon.image} alt={name(pokemon.name)}
            onError={() => { setPokemonImageError(true) }}
        />}
      {pokemon.gender === Gender.Male && <MaleIcon className='absolute left-0 top-0 size-8' />}
      {pokemon.gender === Gender.Female && <FemaleIcon className='absolute left-0 top-0 size-8' />}
      {pokemon.teraType != null &&
        <div className='hint--bottom hint--rounded absolute right-0 top-0 size-8' aria-label={t('types.' + pokemon.teraType)}>
          {TERA_TYPES[pokemon.teraType]({})}
        </div>}
      {pokemonItem != null &&
        <div className='absolute bottom-0 right-0'>
          <button
            className='hint--bottom hint--rounded size-12 transition-transform hover:scale-125'
            aria-label={name(pokemonItem.name)}
            onClick={() => {
              showModal(<PokemonModal
                entity={pokemonItem}
                icon={<PokemonItemImage item={pokemonItem} />}
              />)
            }}
          >
            <PokemonItemImage item={pokemonItem} />
          </button>
        </div>}
    </div>
  )
}
