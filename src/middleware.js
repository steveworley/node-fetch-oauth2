import fetchWithConfig from './utils/fetchWithConfig'

export async function setOauth2Authorisation({getToken}) {
  const token = await getToken()
  return next => async configPromise => {
    const config = await configPromise
    return next(config.setOauth2Authorisation(token))
  }
}

export async function authorisationChallengeHandler({refreshToken}) {
  const token = await refreshToken()
  return next => async configPromise => {
    const repsonse = await next()
    const config = await configPromise

    if (response.status === 401) {
      config.setAccsesToken(token)
      return fetchWithConfig(config)
    }

    return response
  }
}

export function setHost(host) {
  return next => async configPromise => {
    const config = await configPromise
    return next(config.setHost(uri => {
      uri = uri.startsWith('/') ? uri : `/${uri}`
      return host + uri
    }))
  }
}

export function setHeaders(header, value) {
  return next => async configPromise => {
    const config = await configPromise
    return next(config.setHeaders(header, value))
  }
}