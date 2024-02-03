import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum Sidebar {
  Pokemon = 'pokemon',
  Input = 'input',
  Settings = 'settings'
}

interface SidebarStore {
  sidebar: Sidebar
  setSidebar: (sidebar: Sidebar) => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist((set) => ({
    sidebar: Sidebar.Pokemon,
    setSidebar (v) {
      set((s) => ({ sidebar: v === s.sidebar ? Sidebar.Pokemon : v }))
    }
  }),
  { name: '__MW::sidebar' })
)
