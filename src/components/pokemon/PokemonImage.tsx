import GenericModal from "@/components/modal/GenericModal"
import PokemonItemImage from "@/components/pokemon/PokemonItemImage"
import useI18n from "@/hooks/useI18n"
import FemaleIcon from "@/icons/FemaleIcon"
import MaleIcon from "@/icons/MaleIcon"
import PokeBallIcon from "@/icons/PokeBallIcon"
import { Gender, type Pokemon } from "@/model/pokemon"
import { useModalStore } from "@/stores/modal"
import { useSpriteStore } from "@/stores/sprite"
import { Suspense, useState, lazy } from "react"
import { useTranslation } from "react-i18next"

const TeraTypeIcon = lazy(() => import("@/icons/TeraTypeIcon"))

interface Props {
  pokemon: Pokemon
}

export default function PokemonImage({ pokemon }: Props) {
  const { t } = useTranslation()
  const { resolveName } = useI18n()
  const [pokemonImageError, setPokemonImageError] = useState(false)
  const showModal = useModalStore((state) => state.showModal)

  const pokemonItem = pokemon.item

  const sprite = useSpriteStore((state) => state.sprite)
  const spriteUrl = pokemon.sprites[sprite]

  return (
    <div className="relative flex size-52 items-center justify-center">
      {pokemonImageError || spriteUrl == null ? (
        <PokeBallIcon className="size-20" />
      ) : (
        <img
          className="img-pokemon size-full"
          src={spriteUrl}
          alt={resolveName(pokemon.name)}
          onError={() => {
            setPokemonImageError(true)
          }}
        />
      )}
      {pokemon.gender === Gender.Male && <MaleIcon className="absolute top-0 left-0 size-8" />}
      {pokemon.gender === Gender.Female && <FemaleIcon className="absolute top-0 left-0 size-8" />}
      {pokemon.teraType != null && (
        <div
          className="hint--bottom absolute top-0 right-0 size-8"
          aria-label={t("types." + pokemon.teraType)}
        >
          <Suspense>
            <TeraTypeIcon type={pokemon.teraType} />
          </Suspense>
        </div>
      )}
      {pokemonItem != null && (
        <div className="absolute right-0 bottom-0">
          <button
            className="hint--bottom size-12"
            aria-label={resolveName(pokemonItem.name)}
            onClick={() => {
              showModal(
                <GenericModal
                  entity={pokemonItem}
                  entityType="item"
                  icon={<PokemonItemImage item={pokemonItem} />}
                />
              )
            }}
          >
            <PokemonItemImage item={pokemonItem} />
          </button>
        </div>
      )}
    </div>
  )
}
