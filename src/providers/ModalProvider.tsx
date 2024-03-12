import CloseIcon from '@/icons/CloseIcon'
import { useModalStore } from '@/stores/modal'
import { useEffect, useRef } from 'react'

export default function ModalProvider (): JSX.Element | null {
  const dialog = useRef<HTMLDialogElement>(null)
  const modal = useModalStore(state => state.modal)
  const closeModal = useModalStore(state => state.closeModal)

  useEffect(() => {
    if (modal != null) {
      dialog.current?.showModal()
    } else {
      dialog.current?.close()
    }
  }, [modal])

  return (
    <dialog
      ref={dialog}
      onClick={closeModal}
      className='scrollbar-thin inset-0 max-w-4xl animate-zoom-in border border-slate-600 bg-slate-200 text-black animate-duration-fast backdrop:animate-fade-in backdrop:bg-black/55 backdrop:animate-duration-fast dark:bg-slate-800 dark:text-white md:rounded-xl'
    >
      <div className='size-full h-fit p-6' onClick={e => { e.stopPropagation() }}>
        <button
          className='absolute right-2 top-2 rounded p-0.5 hover:bg-black/25'
          onClick={closeModal}
        >
          <CloseIcon className='size-6' />
        </button>
        {modal}
      </div>
    </dialog>
  )
}
