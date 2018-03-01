import { assert, expect } from 'chai'
import fetchWithConfig from '../lib/index'

describe('Oauth token generation', () => {
  let fetch;
  const host = 'http://www.mocky.io'

  it ('should generate an oauth token', () => {

    const middleware = (next) => {
      return config => {
        next(config.then(config => {
          assert.nestedInclude(config.opts.headers, {'Authorization': 'Bearer 1234'})
          return config;
        }))
      }
    }

    fetch = fetchWithConfig({ host, tokenUri: 'v2/5a9747793000006d005c1d66'}, middleware)
    return fetch('/v2')
  })
})