import { Theme, useThemeStore } from '@/stores/theme'
import { Helmet } from 'react-helmet-async'

export default function ThemeProvider (): JSX.Element {
  const theme = useThemeStore((s) => s.theme)

  return (
    <Helmet>
      <html {...(isDark(theme) ? { className: 'dark' } : {})} />
    </Helmet>
  )
}

function isDark (theme: Theme): boolean {
  return theme === Theme.Dark ||
  (theme === Theme.System &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
}
