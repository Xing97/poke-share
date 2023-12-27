import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  INCREASE_SPEED
} from '../../services/constants'
import { calculateStats } from '../../services/stats'
import { type Pokemon, type Stats } from '../../types'
import Tabs from '../Tabs'

const MAX_BASE = 255
const MAX_EV = 255
const MAX_IV = 31
const MAX_TOTAL = 714

const COLOR_BAR: Record<string, string> = {
  hp: 'bg-red-600',
  attack: 'bg-orange-600',
  defense: 'bg-yellow-600',
  specialAttack: 'bg-green-600',
  specialDefense: 'bg-blue-600',
  speed: 'bg-pink-600'
}

interface Props {
  pokemon: Pokemon
}

export default function PokemonStats ({ pokemon }: Props): JSX.Element {
  const [stats, setStats] = useState(pokemon.stats)
  const [max, setMax] = useState(MAX_BASE)

  const { nature } = pokemon

  const lvl50: Stats = useMemo(() => calculateStats(pokemon, 50), [pokemon])
  const lvl100: Stats = useMemo(() => calculateStats(pokemon, 100), [pokemon])

  const handleSelect = (tab: string): void => {
    switch (tab) {
      case 'base':
        setStats(pokemon.stats)
        setMax(MAX_BASE)
        break
      case 'evs':
        setStats(pokemon.evs)
        setMax(MAX_EV)
        break
      case 'ivs':
        setStats(pokemon.ivs)
        setMax(MAX_IV)
        break
      case 'lvl50':
        setStats(lvl50)
        setMax(MAX_TOTAL)
        break
      case 'lvl100':
        setStats(lvl100)
        setMax(MAX_TOTAL)
        break
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-end gap-1.5 text-sm'>
        <Tabs tabs={['base', 'evs', 'ivs', 'lvl50', 'lvl100']} setSelected={handleSelect} />
      </div>
      <div className='grid h-min flex-1 grid-cols-pokemon-stats content-center justify-center gap-x-3 gap-y-1'>
        <Stat stat='hp' value={stats.hp} max={max} />
        <Stat
          stat='attack'
          value={stats.attack}
          max={max}
          increase={INCREASE_ATTACK.includes(nature)}
          decrease={DECREASE_ATTACK.includes(nature)}
        />
        <Stat
          stat='defense'
          value={stats.defense}
          max={max}
          increase={INCREASE_DEFENSE.includes(nature)}
          decrease={DECREASE_DEFENSE.includes(nature)}
        />
        <Stat
          stat='specialAttack'
          value={stats.specialAttack}
          max={max}
          increase={INCREASE_SPECIAL_ATTACK.includes(nature)}
          decrease={DECREASE_SPECIAL_ATTACK.includes(nature)}
        />
        <Stat
          stat='specialDefense'
          value={stats.specialDefense}
          max={max}
          increase={INCREASE_SPECIAL_DEFENSE.includes(nature)}
          decrease={DECREASE_SPECIAL_DEFENSE.includes(nature)}
        />
        <Stat
          stat='speed'
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

function Stat ({ stat, value, max, increase = false, decrease = false }: StatProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <>
      <h3 className={`font-semibold tracking-wide ${increase ? 'text-green-500' : ''} ${decrease ? 'text-red-500' : ''}`}>
        {t('stats.' + stat)}
      </h3>
      <h3 className='justify-self-end font-semibold'>{value}</h3>
      <div className='flex h-4 w-full self-center border border-solid border-slate-500 shadow'>
        <div className={COLOR_BAR[stat]} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </>
  )
}
