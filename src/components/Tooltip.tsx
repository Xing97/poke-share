interface Props {
  children: React.ReactNode
  label: string
}

export default function Tooltip ({ children, label }: Props): JSX.Element {
  return (
    <div className='group relative'>
      {children}
      <span role='tooltip' className='absolute start-full top-1/2 z-20 ms-1.5 hidden -translate-y-1/2 text-nowrap rounded bg-slate-400 px-2 py-1.5 font-semibold tracking-wide md:group-hover:block dark:bg-slate-600'>
        {label}
      </span>
    </div>
  )
}
