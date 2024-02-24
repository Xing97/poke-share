import CloseIcon from '@/icons/CloseIcon'
import { useModalStore } from '@/stores/modal'
import { useEffect } from 'react'

export default function ModalProvider (): JSX.Element | null {
  const modal = useModalStore(state => state.modal)
  const closeModal = useModalStore(state => state.closeModal)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => { window.removeEventListener('keydown', handleKeyDown) }
  }, [closeModal])

  if (modal == null) {
    return null
  }

  return (
    <>
      <div className='fixed z-40 h-dvh w-screen bg-black/50' onClick={closeModal} />
      <div className='fixed left-1/2 top-1/2 z-50 flex max-w-3xl -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 pb-4 pl-4 pr-10 pt-6'>
        <button
          className='absolute right-2 top-2 rounded p-0.5 hover:bg-slate-600/50'
          onClick={closeModal}
        >
          <CloseIcon className='size-6' />
        </button>
        {modal}
      </div>
    </>

  )
}
