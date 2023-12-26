import { type SVGProps } from 'react'
import { type JSX } from 'react/jsx-runtime'

export default function MaleIcon (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='#3b82f6' d='M20 5v4q0 .425-.288.713T19 10q-.425 0-.712-.288T18 9V7.425l-3.975 3.95q.475.7.725 1.488T15 14.5q0 2.3-1.6 3.9T9.5 20q-2.3 0-3.9-1.6T4 14.5q0-2.3 1.6-3.9T9.5 9q.825 0 1.625.237t1.475.738L16.575 6H15q-.425 0-.712-.288T14 5q0-.425.288-.712T15 4h4q.425 0 .713.288T20 5M9.5 11q-1.45 0-2.475 1.025T6 14.5q0 1.45 1.025 2.475T9.5 18q1.45 0 2.475-1.025T13 14.5q0-1.45-1.025-2.475T9.5 11' />
    </svg>
  )
}
