import CloseIcon from "@/icons/CloseIcon"
import { useModalStore } from "@/stores/modal"
import { useEffect, useRef } from "react"

export default function ModalProvider(): JSX.Element | null {
  const dialog = useRef<HTMLDialogElement>(null)
  const modal = useModalStore((state) => state.modal)
  const closeModal = useModalStore((state) => state.closeModal)

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
      className="scrollbar-thin animate-zoom-in animate-duration-fast backdrop:animate-fade-in backdrop:animate-duration-fast inset-0 m-auto max-w-4xl border-2 border-slate-700 bg-slate-200 text-black backdrop:bg-black/55 md:rounded-xl dark:border-slate-400 dark:bg-slate-800 dark:text-white"
    >
      <div
        className="size-full h-fit p-6"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <button
          className="absolute top-2 right-2 rounded-sm p-0.5 hover:bg-black/25"
          onClick={closeModal}
        >
          <CloseIcon className="size-6" />
        </button>
        {modal}
      </div>
    </dialog>
  )
}
