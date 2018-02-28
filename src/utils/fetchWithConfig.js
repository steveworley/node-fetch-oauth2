import fetch from 'node-fetch'

export default function fetchWithConfig({ uri, opts }) {
  return fetch(uri, opts)
}