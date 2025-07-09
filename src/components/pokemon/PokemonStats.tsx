import Selector from "@/components/Selector"
import {
  DECREASE_ATTACK,
  DECREASE_DEFENSE,
  DECREASE_SPECIAL_ATTACK,
  DECREASE_SPECIAL_DEFENSE,
  DECREASE_SPEED,
  INCREASE_ATTACK,
  INCREASE_DEFENSE,
  INCREASE_SPECIAL_ATTACK,
  INCREASE_SPECIAL_DEFENSE,
  INCREASE_SPEED,
} from "@/model/constants"
import { type Pokemon, type Stats } from "@/model/pokemon"
import { calculateStats } from "@/services/stats"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

const MAX_BASE = 255
const MAX_EV = 255
const MAX_IV = 31
const MAX_TOTAL = 550

const COLOR_BAR: Record<string, string> = {
  "hp": "bg-red-500 dark:bg-red-600 ring-red-800 dark:ring-red-300",
  "attack": "bg-orange-500 dark:bg-orange-600 ring-orange-800 dark:ring-orange-300",
  "defense": "bg-yellow-500 dark:bg-yellow-600 ring-yellow-800 dark:ring-yellow-300",
  "special-attack": "bg-green-500 dark:bg-green-600 ring-green-800 dark:ring-green-300",
  "special-defense": "bg-blue-500 dark:bg-blue-600 ring-blue-800 dark:ring-blue-300",
  "speed": "bg-pink-500 dark:bg-pink-600 ring-pink-800 dark:ring-pink-300",
}

interface Props {
  pokemon: Pokemon
}

export default function PokemonStats({ pokemon }: Props): JSX.Element {
  const [selected, setSelected] = useState("base")
  const [stats, setStats] = useState(pokemon.stats)
  const [max, setMax] = useState(MAX_BASE)

  const { nature } = pokemon

  const lvl50: Stats = useMemo(() => calculateStats(pokemon, 50), [pokemon])
  const lvl100: Stats = useMemo(() => calculateStats(pokemon, 100), [pokemon])

  const handleSelect = (tab: string): void => {
    switch (tab) {
      case "base":
        setStats(pokemon.stats)
        setMax(MAX_BASE)
        break
      case "evs":
        setStats(pokemon.evs)
        setMax(MAX_EV)
        break
      case "ivs":
        setStats(pokemon.ivs)
        setMax(MAX_IV)
        break
      case "lvl50":
        setStats(lvl50)
        setMax(MAX_TOTAL)
        break
      case "lvl100":
        setStats(lvl100)
        setMax(MAX_TOTAL)
        break
    }
    setSelected(tab)
  }

  return (
    <div className="flex flex-col gap-2">
      <Selector
        className="self-end"
        options={["base", "evs", "ivs", "lvl50", "lvl100"]}
        selected={selected}
        setSelected={handleSelect}
        translation="labels"
      />
      <div className="grid grid-cols-pokemon-stats gap-x-3 gap-y-1">
        <Stat stat="hp" value={stats.hp} max={max} />
        <Stat
          stat="attack"
          value={stats.attack}
          max={max}
          increase={INCREASE_ATTACK.includes(nature)}
          decrease={DECREASE_ATTACK.includes(nature)}
        />
        <Stat
          stat="defense"
          value={stats.defense}
          max={max}
          increase={INCREASE_DEFENSE.includes(nature)}
          decrease={DECREASE_DEFENSE.includes(nature)}
        />
        <Stat
          stat="special-attack"
          value={stats.specialAttack}
          max={max}
          increase={INCREASE_SPECIAL_ATTACK.includes(nature)}
          decrease={DECREASE_SPECIAL_ATTACK.includes(nature)}
        />
        <Stat
          stat="special-defense"
          value={stats.specialDefense}
          max={max}
          increase={INCREASE_SPECIAL_DEFENSE.includes(nature)}
          decrease={DECREASE_SPECIAL_DEFENSE.includes(nature)}
        />
        <Stat
          stat="speed"
          value={stats.speed}
          max={max}
          increase={INCREASE_SPEED.includes(nature)}
          decrease={DECREASE_SPEED.includes(nature)}
        />
      </div>
    </div>
  )
}

interface StatProps {
  stat: string
  value: number
  max: number
  increase?: boolean
  decrease?: boolean
}

function Stat({ stat, value, max, increase = false, decrease = false }: StatProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <>
      <span
        className={`font-semibold tracking-wide${increase ? "text-green-500" : decrease ? "text-red-500" : ""}`}
      >
        {t("stats." + stat)}
      </span>
      <span className="justify-self-end font-semibold">{value}</span>
      <div className="flex h-4 w-full self-center ring-1 ring-inset ring-slate-500">
        <div
          className={`ring-1 ring-inset duration-300 ease-in ${COLOR_BAR[stat]}`}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
    </>
  )
}
