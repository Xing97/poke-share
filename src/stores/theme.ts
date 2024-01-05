import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum Theme {
  System = 'system',
  Light = 'light',
  Dark = 'dark'
}

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist((set) => ({
    theme: Theme.System,
    setTheme (theme) { set({ theme }) }
  }),
  { name: '__MW::theme' }
  )
)
