import Aside from '@/components/Aside'
import PokemonTeam from '@/components/PokemonTeam'
import { usePokemonStore } from '@/stores/pokemon'
import { useThemeStore } from '@/stores/theme'
import { Toaster } from 'sonner'

export default function App (): JSX.Element {
  const theme = useThemeStore(store => store.theme)
  const loading = usePokemonStore(store => store.loading)

  return (
    <div className='flex h-dvh w-screen flex-col-reverse transition-colors duration-300 md:flex-row-reverse'>
      <main className='flex size-full grow flex-col items-center gap-6 self-center overflow-y-auto'>
        {loading
          ? <span className='relative h-1.5 w-full overflow-hidden bg-slate-400 after:absolute after:h-1.5 after:w-48 after:animate-loader after:bg-black dark:bg-slate-700 dark:after:bg-white' />
          : <PokemonTeam />}
      </main>
      <Aside />
      <Toaster expand={true} richColors theme={theme} />
    </div>
  )
}
