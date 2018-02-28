import * as middleware from './middleware'
import fetchWithMiddleware from './fetchWithMiddleware'
import tokenStorage from './tokenStorage'
import fetch from 'cross-fetch'

const defaults = {
  fetchToken: () => {
    return Promise.resolve('1234')
  },
  generateToken: (config, host, uri = 'oauth/token') => {
    uri = uri.startsWith('/') ? uri : `/${uri}`
    return async () => {
      const body = Object.entries(config).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')
      const response = await fetch(host+uri)
      const token = await response.json()
      return token
    }
  },
  host: false,
  headers: []
}

export default function(params, ...middlewares) {
  params = {...defaults, ...params}
  
  const { host, headers, initialToken, fetchToken, generateToken } = params
  const storage = tokenStorage({ initialToken, fetchToken, generateToken })

  if (host) {
    middlewares.push(middleware.addHost(host))
  }

  headers.map(header => middlewares.push(middleware.addHeaders(header)))

  // middlewares.push(middleware.authorisationChallengeHandler(storage))
  middlewares.push(middleware.setOAuth2Authorization(storage))

  middlewares = middlewares.reverse()

  return fetchWithMiddleware(...middlewares)
}