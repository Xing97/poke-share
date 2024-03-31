import useI18n from "@/hooks/useI18n"
import { type EffectText, type FlavorText, type I18nName } from "@/model/pokemon"
import { Suspense } from "react"
import lazyWithPreload from "react-lazy-with-preload"

const TextModal = lazyWithPreload(async () => await import("@/components/modal/TextModal"))

void TextModal.preload()

interface Props {
  entity: { name: I18nName; flavorText: FlavorText; effectText: EffectText }
  entityType: string
  icon?: JSX.Element
}

export default function GenericModal({ entity, entityType, icon }: Props): JSX.Element {
  const { resolveName } = useI18n()

  return (
    <section className="flex flex-col gap-4">
      <header className="flex h-14 items-center gap-2">
        {icon}
        <h1 className="text-3xl font-bold tracking-wide">{resolveName(entity.name)}</h1>
      </header>
      <Suspense>
        <TextModal
          name={entity.name}
          entity={entityType}
          flavorText={entity.flavorText}
          effectText={entity.effectText}
        />
      </Suspense>
    </section>
  )
}
