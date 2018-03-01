import * as middleware from './middleware'
import fetchWithMiddleware from './fetchWithMiddleware'
import tokenStorage from './tokenStorage'

export let defaults = {
  fetchToken: () => {
    return !!tokenStorage.token ? Promise.resolve(tokenStorage.token) : Promise.reject('Generate token')
  },
  generateToken: (host, config = {}, uri = 'oauth/token') => {
    uri = uri.startsWith('/') ? uri : `/${uri}`
    return async () => {
      const body = Object.entries(config).map(([key, val]) => `${key}=${val}`).join('&')

      const response = await fetchWithMiddleware()(host+uri, { 
        method: 'post',
        body,
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        }
      })

      if (response.ok) {
        const token = await response.json()
        tokenStorage.token = token
        return token
      }
      
      const { message } = await response.json()
      throw new Error(`[Unable to generate token] ${message}`)
    }
  },
  host: false,
  headers: [],
  tokenConfig: {},
  tokenUri: 'oauth/token'
}

export default function(params, ...middlewares) {
  params = {...defaults, ...params}
  
  let { host, headers, initialToken, fetchToken, generateToken, tokenConfig, tokenUri } = params

  generateToken = generateToken(host, tokenConfig, tokenUri)

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