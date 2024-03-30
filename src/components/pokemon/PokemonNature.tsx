import NatureIcon from '@/icons/NatureIcon'
import { type Nature } from '@/model/pokemon'
import { useTranslation } from 'react-i18next'

interface Props {
  nature: Nature
}

export default function PokemonNature({ nature }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <NatureIcon className="size-8" />
      <span>{t('natures.' + nature)}</span>
    </div>
  )
}
