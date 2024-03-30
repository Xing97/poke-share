import { deflateRaw, inflateRaw } from 'pako'

const SEPARATOR = '|'

export function setInputInPath(input: string, title: string): void {
  const data = (title !== '' ? title + SEPARATOR : '') + input
  const compressed = deflateRaw(data)
  const base64 = btoa(String.fromCharCode.apply(null, [...compressed]))
  window.history.replaceState(null, '', `/${base64}`)
}

export function getInputFromPath(): { title: string; input: string } {
  const path = window.location.pathname

  if (path === '/') {
    return { title: '', input: '' }
  }

  try {
    const retrieved = new Uint8Array(
      atob(path.slice(1))
        .split('')
        .map((char) => char.charCodeAt(0))
    )

    const data = inflateRaw(retrieved, { to: 'string' })

    const sep = data.indexOf(SEPARATOR)

    if (sep > 0) {
      return { title: data.substring(0, sep), input: data.substring(sep + 1) }
    }

    return { title: '', input: data }
  } catch (e) {
    console.error(e)

    window.location.pathname = '/'

    return { title: '', input: '' }
  }
}
