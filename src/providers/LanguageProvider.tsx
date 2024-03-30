import i18n from '@/setup/i18n'
import { useLanguageStore } from '@/stores/language'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export default function LanguageProvider(): JSX.Element {
  const language = useLanguageStore((s) => s.language)

  useEffect(() => {
    void i18n.changeLanguage(language)
  }, [language])

  return (
    <Helmet>
      <html lang={language} />
    </Helmet>
  )
}
