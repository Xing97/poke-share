interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
}

export default function Link({ children, href }: Props): JSX.Element {
  return (
    <a
      className="text-blue-500 underline hover:text-blue-800 dark:hover:text-white"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
