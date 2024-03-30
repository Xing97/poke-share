import Link from "@/components/Link"
import useI18n from "@/hooks/useI18n"
import { type EffectText, type FlavorText, type I18nName } from "@/model/pokemon"
import DOMPurify from "dompurify"
import { marked } from "marked"

const BULBAPEDIA_MAP: Record<string, string> = {
  ability: "_(Ability)",
  item: "",
  move: "_(move)",
}

interface Props {
  name: I18nName
  entity: string
  flavorText: FlavorText
  effectText: EffectText
  className?: string
}

export default function TextModal({
  name,
  entity,
  flavorText,
  effectText,
  className = "",
}: Props): JSX.Element {
  const { resolveFlavorText, resolveEffectText } = useI18n()

  const flavor = resolveFlavorText(flavorText)
  const effect = resolveEffectText(effectText)?.replaceAll(/^\s{4,}/gm, "")

  return (
    <div className={"flex flex-col gap-6 " + className}>
      {flavor != null && <p className="text-lg font-medium">{flavor}</p>}
      {effect != null && (
        <article
          className="markdown"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(effect) as string),
          }}
        />
      )}
      <footer className="mt-auto flex gap-4 self-end">
        <Link
          href={`https://bulbapedia.bulbagarden.net/wiki/${name.en?.replaceAll(" ", "_")}${BULBAPEDIA_MAP[entity]}`}
        >
          Bulbapedia
        </Link>
        <Link href={`https://pokemondb.net/${entity}/${name.en?.replaceAll(" ", "-")}`}>
          Pokémon Database
        </Link>
      </footer>
    </div>
  )
}
