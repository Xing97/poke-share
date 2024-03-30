import { type SVGProps } from 'react'

export default function FemaleIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#ec4899"
        d="M11 19h-1q-.425 0-.712-.288T9 18q0-.425.288-.712T10 17h1v-2.1q-1.975-.35-3.238-1.888T6.5 9.45q0-2.275 1.613-3.862T12 4q2.275 0 3.888 1.588T17.5 9.45q0 2.025-1.263 3.563T13 14.9V17h1q.425 0 .713.288T15 18q0 .425-.288.713T14 19h-1v1q0 .425-.288.713T12 21q-.425 0-.712-.288T11 20zm1-6q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13"
      />
    </svg>
  )
}
