import PokemonInfo from "@/components/PokemonInfo"
import { usePokemonStore } from "@/stores/pokemon"
import { Helmet } from "react-helmet-async"

export default function PokemonTeam(): JSX.Element {
  const team = usePokemonStore((state) => state.pokemonTeam)
  const title = usePokemonStore((state) => state.title)

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 p-6">
      <Helmet>
        <title>{title !== "" ? title : "PokeShare"}</title>
      </Helmet>
      {team.map((pokemon) => (
        <PokemonInfo key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
