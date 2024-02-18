import Aside from '@/components/Aside'
import PokemonTeam from '@/components/PokemonTeam'
import { LoadingIcon } from '@/icons/LoadingIcon'
import { usePokemonStore } from '@/stores/pokemon'
import { useThemeStore } from '@/stores/theme'
import { Toaster } from 'sonner'

export default function App (): JSX.Element {
  const theme = useThemeStore(store => store.theme)
  const loading = usePokemonStore(store => store.loading)

  return (
    <div className='flex h-dvh w-screen flex-col md:flex-row'>
      <Aside />
      <main className='flex h-full w-full grow flex-col items-center gap-6 self-center overflow-y-auto p-6'>
        {loading
          ? <LoadingIcon className='m-auto h-20 w-20 animate-spin' />
          : <PokemonTeam />}
      </main>
      <Toaster expand={true} richColors theme={theme} />
    </div>
  )
}
