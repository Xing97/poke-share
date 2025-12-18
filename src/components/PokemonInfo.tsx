import PokemonAbility from "@/components/pokemon/PokemonAbility"
import PokemonHeader from "@/components/pokemon/PokemonHeader"
import PokemonImage from "@/components/pokemon/PokemonImage"
import PokemonMoves from "@/components/pokemon/PokemonMoves"
import PokemonNature from "@/components/pokemon/PokemonNature"
import PokemonStats from "@/components/pokemon/PokemonStats"
import PokemonType from "@/components/pokemon/PokemonType"
import { isIncludedGeneration } from "@/model/constants"
import { type Pokemon, type Type } from "@/model/pokemon"
import { useGameStore, type Generation } from "@/stores/game"
import { useTranslation } from "react-i18next"

interface Props {
  pokemon: Pokemon
}

function getTypes(pokemon: Pokemon, generation: Generation): Type[] {
  return (
    pokemon.pastTypes.find((pastType) => isIncludedGeneration(pastType.generation, generation))
      ?.types ?? pokemon.types
  )
}

export default function PokemonInfo({ pokemon }: Props): JSX.Element {
  const { t } = useTranslation()
  const generation = useGameStore((state) => state.generation)

  return (
    <div className="animate-fade-in shadow-box animate-duration-slow flex w-auto flex-col gap-4 rounded-xl border border-slate-600 bg-slate-200 p-5 dark:bg-slate-800">
      <PokemonHeader pokemon={pokemon} />
      <div className="flex flex-wrap justify-center gap-10">
        <div className="flex flex-col gap-4">
          <PokemonImage pokemon={pokemon} />
          <div className="flex flex-wrap justify-center gap-2 self-center">
            {getTypes(pokemon, generation).map((type) => (
              <PokemonType
                className="text-shadow w-24 rounded-full text-center font-semibold tracking-wide"
                key={type}
                type={type}
              >
                {t("types." + type)}
              </PokemonType>
            ))}
          </div>
          <div className="flex flex-col justify-start gap-2 font-semibold tracking-wider">
            <PokemonAbility ability={pokemon.ability} />
            <PokemonNature nature={pokemon.nature} />
          </div>
        </div>
        <div className="flex w-72 grow flex-col justify-between gap-10">
          <PokemonStats pokemon={pokemon} />
          <PokemonMoves moves={pokemon.moves} />
        </div>
      </div>
    </div>
  )
}
