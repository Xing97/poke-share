import { create } from 'zustand'

interface ModalStore {
  modal: React.ReactNode | null
  showModal: (modal: React.ReactNode | null) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>()(
  (set) => ({
    modal: null,
    showModal (modal) { set({ modal }) },
    closeModal () { set({ modal: null }) }
  })
)
