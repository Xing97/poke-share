import useI18n from "@/hooks/useI18n"
import { type Pokemon } from "@/model/pokemon"

interface Props {
  pokemon: Pokemon
}

export default function PokemonHeader({ pokemon }: Props): JSX.Element {
  const { resolveName } = useI18n()

  const number = "#" + pokemon.order.toString().padStart(3, "0")
  const pokemonName = resolveName(pokemon.name)
  const pokemonForm = pokemon.forms[0]

  const displayName =
    pokemonForm != null ? `${pokemonName} ${resolveName(pokemonForm)}` : pokemonName

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-slate-600 dark:text-slate-400">{number}</span>
      <span className="text-xl font-bold tracking-wide">{pokemon.nickname ?? displayName}</span>
      {pokemon.nickname != null && (
        <span className="text-slate-800 dark:text-slate-200">{`(${displayName})`}</span>
      )}
    </div>
  )
}
