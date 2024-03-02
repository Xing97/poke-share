import TeraTypeBug from '@/icons/tera-types/TeraTypeBug'
import TeraTypeDark from '@/icons/tera-types/TeraTypeDark'
import TeraTypeDragon from '@/icons/tera-types/TeraTypeDragon'
import TeraTypeElectric from '@/icons/tera-types/TeraTypeElectric'
import TeraTypeFairy from '@/icons/tera-types/TeraTypeFairy'
import TeraTypeFighting from '@/icons/tera-types/TeraTypeFighting'
import TeraTypeFire from '@/icons/tera-types/TeraTypeFire'
import TeraTypeFlying from '@/icons/tera-types/TeraTypeFlying'
import TeraTypeGhost from '@/icons/tera-types/TeraTypeGhost'
import TeraTypeGrass from '@/icons/tera-types/TeraTypeGrass'
import TeraTypeGround from '@/icons/tera-types/TeraTypeGround'
import TeraTypeIce from '@/icons/tera-types/TeraTypeIce'
import TeraTypeNormal from '@/icons/tera-types/TeraTypeNormal'
import TeraTypePoison from '@/icons/tera-types/TeraTypePoison'
import TeraTypePsychic from '@/icons/tera-types/TeraTypePsychic'
import TeraTypeRock from '@/icons/tera-types/TeraTypeRock'
import TeraTypeSteel from '@/icons/tera-types/TeraTypeSteel'
import TeraTypeStellar from '@/icons/tera-types/TeraTypeStellar'
import TeraTypeWater from '@/icons/tera-types/TeraTypeWater'
import { Type } from '@/model/pokemon'

const TERA_TYPES = {
  [Type.Bug]: TeraTypeBug,
  [Type.Dark]: TeraTypeDark,
  [Type.Dragon]: TeraTypeDragon,
  [Type.Electric]: TeraTypeElectric,
  [Type.Fairy]: TeraTypeFairy,
  [Type.Fighting]: TeraTypeFighting,
  [Type.Fire]: TeraTypeFire,
  [Type.Flying]: TeraTypeFlying,
  [Type.Ghost]: TeraTypeGhost,
  [Type.Grass]: TeraTypeGrass,
  [Type.Ground]: TeraTypeGround,
  [Type.Ice]: TeraTypeIce,
  [Type.Normal]: TeraTypeNormal,
  [Type.Poison]: TeraTypePoison,
  [Type.Psychic]: TeraTypePsychic,
  [Type.Rock]: TeraTypeRock,
  [Type.Steel]: TeraTypeSteel,
  [Type.Stellar]: TeraTypeStellar,
  [Type.Water]: TeraTypeWater
}

export default function TeraTypeIcon ({ type, className }: { type: Type, className?: string }): JSX.Element {
  const Component = TERA_TYPES[type]
  return <Component className={className} />
}
