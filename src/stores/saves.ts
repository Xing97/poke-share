import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Save {
  title: string
  input: string
  date: number
}

interface SavesStore {
  saves: Save[]
  add: (input: string, title: string) => void
  remove: (index: number) => void
  clear: () => void
}

export const useSavesStore = create<SavesStore>()(
  persist((set) => ({
    saves: [],
    add: (input, title) => { set((state) => ({ saves: [...state.saves, { input, title, date: new Date().getTime() }] })) },
    remove: (index) => { set((state) => ({ saves: state.saves.filter((_, i) => i !== index) })) },
    clear: () => { set({ saves: [] }) }
  }),
  { name: '__MW::saves' }
  )
)
