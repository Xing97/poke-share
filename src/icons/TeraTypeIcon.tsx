import { Type } from '@/model/pokemon'
import TeraTypeBug from './tera-types/TeraTypeBug'
import TeraTypeDark from './tera-types/TeraTypeDark'
import TeraTypeDragon from './tera-types/TeraTypeDragon'
import TeraTypeElectric from './tera-types/TeraTypeElectric'
import TeraTypeFairy from './tera-types/TeraTypeFairy'
import TeraTypeFighting from './tera-types/TeraTypeFighting'
import TeraTypeFire from './tera-types/TeraTypeFire'
import TeraTypeFlying from './tera-types/TeraTypeFlying'
import TeraTypeGhost from './tera-types/TeraTypeGhost'
import TeraTypeGrass from './tera-types/TeraTypeGrass'
import TeraTypeGround from './tera-types/TeraTypeGround'
import TeraTypeIce from './tera-types/TeraTypeIce'
import TeraTypeNormal from './tera-types/TeraTypeNormal'
import TeraTypePoison from './tera-types/TeraTypePoison'
import TeraTypePsychic from './tera-types/TeraTypePsychic'
import TeraTypeRock from './tera-types/TeraTypeRock'
import TeraTypeSteel from './tera-types/TeraTypeSteel'
import TeraTypeStellar from './tera-types/TeraTypeStellar'
import TeraTypeWater from './tera-types/TeraTypeWater'

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
