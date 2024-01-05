import { type SVGProps } from 'react'

export default function PokeBallIcon (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'>
        <path d='M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0' /><path d='M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6 0h6m6 0h6' />
      </g>
    </svg>
  )
}
