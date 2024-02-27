import useI18n from '@/hooks/useI18n'
import { type EffectText, type FlavorText, type I18nName } from '@/model/pokemon'
import DOMPurify from 'dompurify'
import 'github-markdown.css'
import { marked } from 'marked'

interface Props {
  entity: {
    name: I18nName
    flavorText: FlavorText
    effectText: EffectText
  }
  wikiPrefix?: string
}

export default function TextModal ({ entity, wikiPrefix = '' }: Props): JSX.Element {
  const { flavorText, effectText } = useI18n()

  const flavor = flavorText(entity.flavorText)
  const effect = effectText(entity.effectText)?.replaceAll(/^\s{4,}/gm, '')

  return (
    <div className='flex flex-col gap-6'>
      {flavor != null && <p className='text-lg font-medium'>{flavor}</p>}
      {effect != null && <article
        className='markdown-body' dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize((marked.parse(effect) as string))
        }}
      />}
      <a
        className='mt-auto self-end align-bottom text-blue-500 underline hover:text-blue-800 dark:hover:text-white'
        href={`https://bulbapedia.bulbagarden.net/wiki/${entity.name.en + wikiPrefix}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        Bulbapedia
      </a>
    </div>
  )
}
