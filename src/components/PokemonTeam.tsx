import PokemonInfo from "@/components/PokemonInfo"
import { usePokemonStore } from "@/stores/pokemon"

export default function PokemonTeam() {
  const team = usePokemonStore((state) => state.pokemonTeam)
  const title = usePokemonStore((state) => state.title)

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 p-6">
      <title>{title !== "" ? title : "PokeShare"}</title>
      {team.map((pokemon) => (
        <PokemonInfo key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
