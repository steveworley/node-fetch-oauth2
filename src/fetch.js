function _fetchToken() {
  return tokenStorage.json
}

function _generateToken(host) {
  return async () => {
    const token = await fetchWithMiddleware()(`${host}/oauth/token`)
    const json = await token.json()

    if (json.error) {
      throw new Error(`Unable to generate token: ${json.message}`)
    }
    
    tokenStorage.token = json
    return json
  }
}

export function addHostMiddleware(host, isDrupal = false) {
  return next => config => {
    return next(config.then(config => config.updateUri(uri => {
      uri = uri.startsWith('/') ? uri : `/${uri}`
      return host + (isDrupal ? 'jsonapi' : '') + uri 
    })))
  }  
}

export function addHeaderMiddleware(header, value) {
  return next => async (config) => {
    const cfg = await config()
    return next(cfg.setHeader(header, value))
  }
}

/** 
 * Set up defaults for the fetch function. 
 */
const defaults = {
  fetchToken: _fetchToken,
  generateToken: _generateToken,
  headers: [],
  host: false
}

/**
 * Build a fetch-oauth2 instance nad return that ready for use.
 * 
 * @param {Object} params
 *   Configuration values as expected by fetch-oauth2
 * @param {Array} middlewares 
 *   All middlewares to apply to the fetch.
 */
export function AcquiaFetch(params, ...middlewares) {
  params = { ...defaults, ...params }
  const { initialToken, fetchToken, generateToken, host, headers } = params
  const storage = tokenStorage({ initialToken, fetchToken, generateToken })

  if (host) {
    middlewares.push(addHostMiddleware(host))
  }

  headers.map(header => middlewares.push(addHeaderMiddleware(header.name, header.value)))

  return fetchWithMiddleware(...middlewares)
}