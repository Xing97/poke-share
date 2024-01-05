import { deflateRaw, inflateRaw } from 'pako'

export function setInputInPath (input: string): void {
  const compressed = deflateRaw(input)
  const base64 = btoa(String.fromCharCode.apply(null, [...compressed]))
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

    return inflateRaw(retrieved, { to: 'string' })
  } catch (e) {
    console.error(e)

    window.location.pathname = '/'

    return ''
  }
}
