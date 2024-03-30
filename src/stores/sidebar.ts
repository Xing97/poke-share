import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export enum Sidebar {
  Pokemon = 'pokemon',
  Input = 'input',
  History = 'history',
  Settings = 'settings',
}

interface SidebarStore {
  sidebar: Sidebar
  setSidebar: (sidebar: Sidebar) => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      sidebar: window.location.pathname === '/' ? Sidebar.Input : Sidebar.Pokemon,
      setSidebar(v) {
        set((s) => ({ sidebar: v === s.sidebar ? Sidebar.Pokemon : v }))
      },
    }),
    {
      name: '__MW::sidebar',
      storage: createJSONStorage(() => window.sessionStorage),
    }
  )
)
