import { assert, expect } from 'chai'
import fetchWithConfig from '../lib/index'

describe('Oauth token generation', () => {
  let fetch;
  const host = 'http://www.mocky.io'

  it ('should generate an oauth token', () => {

    const middleware = (next) => {
      return config => {
        next(config.then(config => {
          assert.nestedProperty(config, 'opts.headers.Authorization')
          assert(config.opts.headers.Authorization.startsWith('Bearer'))
          return config;
        }))
      }
    }
    
    const tokenConfig = {
      grant_type: 'password',
      client_id: 'client_id',
      client_secret: 'secret',
      username: 'user',
      password: 'pass',
    }

    const tokenUri = 'v2/5a9747793000006d005c1d66'

    fetch = fetchWithConfig({ host, tokenConfig, tokenUri }, middleware)
    return fetch('/v2')
  })
})