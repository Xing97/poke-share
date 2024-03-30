import { type ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export default function Button({ children, className, ...props }: Props): JSX.Element {
  return (
    <button
      className={`${className} rounded-full border-2 border-black/25 px-4 py-1 font-semibold tracking-wide text-white active:brightness-90`}
      {...props}
    >
      {children}
    </button>
  )
}
