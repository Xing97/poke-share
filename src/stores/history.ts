import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface HistoryItem {
  title: string
  input: string
  date: number
}

interface HistoryStore {
  history: HistoryItem[]
  add: (input: string, title: string) => void
  remove: (index: number) => void
  clear: () => void
  restore: (history: HistoryItem[]) => void
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      history: [],
      add: (input, title) => {
        set((state) => ({
          history: [{ input, title, date: new Date().getTime() }, ...state.history],
        }))
      },
      remove: (index) => {
        set((state) => ({
          history: state.history.filter((_, i) => i !== index),
        }))
      },
      clear: () => {
        set({ history: [] })
      },
      restore: (history) => {
        set({ history })
      },
    }),
    { name: "__MW::history" }
  )
)
