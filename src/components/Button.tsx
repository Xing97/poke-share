interface Props {
  children: React.ReactNode
  className?: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export default function Button ({ children, className, type = 'button', onClick, disabled = false }: Props): JSX.Element {
  return (
    <button
      className={`${className} rounded-full border-2 border-black/25 px-4 py-1 font-semibold tracking-wide text-white active:brightness-90`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
