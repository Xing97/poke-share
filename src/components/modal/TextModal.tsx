import useI18n from '@/hooks/useI18n'
import { type EffectText, type FlavorText, type I18nName } from '@/model/pokemon'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

const BULBAPEDIA_MAP: Record<string, string> = {
  ability: '_(Ability)',
  item: '',
  move: '_(move)'
}

const EXTERNAL_LINKS = [
  {
    website: 'Bulbapedia',
    getHref: (entity: string, name?: string) =>
    `https://bulbapedia.bulbagarden.net/wiki/${name}${BULBAPEDIA_MAP[entity]}`
  },
  {
    website: 'Pokémon Database',
    getHref: (entity: string, name?: string) =>
    `https://pokemondb.net/${entity}/${name?.replaceAll(' ', '-')}`
  }
]

interface Props {
  name: I18nName
  entity: string
  flavorText: FlavorText
  effectText: EffectText
}

export default function TextModal ({ name, entity, flavorText, effectText }: Props): JSX.Element {
  const { resolveFlavorText, resolveEffectText } = useI18n()

  const flavor = resolveFlavorText(flavorText)
  const effect = resolveEffectText(effectText)?.replaceAll(/^\s{4,}/gm, '')

  return (
    <div className='flex flex-col gap-6'>
      {flavor != null && <p className='text-lg font-medium'>{flavor}</p>}
      {effect != null && <article
        className='markdown' dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(effect) as string)
        }}
      />}
      <footer className='mt-auto flex gap-4 self-end'>
        {EXTERNAL_LINKS.map(({ website, getHref }) => (
          <Anchor
            key={website + name.en}
            website={website}
            href={getHref(entity, name.en)}
          />
        ))}
      </footer>
    </div>
  )
}

interface AnchorProps {
  website: string
  href: string
}

function Anchor ({ website, href }: AnchorProps): JSX.Element {
  return (
    <a
      className='text-blue-500 underline hover:text-blue-800 dark:hover:text-white'
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {website}
    </a>
  )
}
