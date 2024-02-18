import CloseIcon from '@/icons/CloseIcon'
import { useModalStore } from '@/stores/modal'

export default function ModalProvider (): JSX.Element | null {
  const modal = useModalStore(state => state.modal)
  const closeModal = useModalStore(state => state.closeModal)

  if (modal == null) {
    return null
  }

  return (
    <>
      <div onClick={closeModal} className='fixed left-0 top-0 z-40 h-dvh w-screen bg-black/50' />
      <div className='fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 p-6'>
        <button className='absolute right-2 top-2 rounded p-0.5 hover:bg-slate-600/50' onClick={closeModal}>
          <CloseIcon className='h-6 w-6' />
        </button>
        {modal}
      </div>
    </>

  )
}
