import { deflate, inflate } from 'pako'

export function setInputInPath (input: string): void {
  const compresed = deflate(input)
  const base64 = btoa(String.fromCharCode.apply(null, [...compresed]))
  window.history.replaceState(null, '', `/${base64}`)
}

export function getInputFromPath (): string {
  const path = window.location.pathname

  if (path === '/') {
    return ''
  }

  try {
    const retrieved = new Uint8Array(atob(path.slice(1))
      .split('')
      .map((char) => char.charCodeAt(0)))

    return inflate(retrieved, { to: 'string' })
  } catch (e) {
    console.error(e)

    window.location.pathname = '/'

    return ''
  }
}
