import GenericModal from '@/components/modal/GenericModal'
import PokemonItemImage from '@/components/pokemon/PokemonItemImage'
import useI18n from '@/hooks/useI18n'
import FemaleIcon from '@/icons/FemaleIcon'
import MaleIcon from '@/icons/MaleIcon'
import PokeBallIcon from '@/icons/PokeBallIcon'
import { Gender, type Pokemon } from '@/model/pokemon'
import { useModalStore } from '@/stores/modal'
import { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import lazyWithPreload from 'react-lazy-with-preload'

const TeraTypeIcon = lazyWithPreload(async () => await import('@/icons/TeraTypeIcon'))

void TeraTypeIcon.preload()

interface Props {
  pokemon: Pokemon
}

export default function PokemonImage ({ pokemon }: Props): JSX.Element {
  const { t } = useTranslation()
  const { resolveName } = useI18n()
  const [pokemonImageError, setPokemonImageError] = useState(false)
  const showModal = useModalStore(state => state.showModal)

  const pokemonItem = pokemon.item

  return (
    <div className='relative flex size-52 items-center justify-center'>
      {pokemonImageError || pokemon.image == null
        ? <PokeBallIcon className='size-20' />
        : <img
            className='img-pokemon size-full' src={pokemon.image} alt={resolveName(pokemon.name)}
            onError={() => { setPokemonImageError(true) }}
        />}
      {pokemon.gender === Gender.Male && <MaleIcon className='absolute left-0 top-0 size-8' />}
      {pokemon.gender === Gender.Female && <FemaleIcon className='absolute left-0 top-0 size-8' />}
      {pokemon.teraType != null &&
        <div className='hint--bottom hint--rounded absolute right-0 top-0 size-8' aria-label={t('types.' + pokemon.teraType)}>
          <Suspense>
            <TeraTypeIcon type={pokemon.teraType} />
          </Suspense>
        </div>}
      {pokemonItem != null &&
        <div className='absolute bottom-0 right-0'>
          <button
            className='hint--bottom hint--rounded size-12 transition-transform hover:scale-125'
            aria-label={resolveName(pokemonItem.name)}
            onClick={() => {
              showModal(<GenericModal
                entity={pokemonItem}
                entityType='item'
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
