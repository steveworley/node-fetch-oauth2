import { assert, expect } from 'chai'
import fetchWithConfig from '../lib/index'

describe('Node Fetch Oauth', () => {

  let fetch;
  const host = 'http://www.mocky.io'

  it('should automatically set the host', () => {
    fetch = fetchWithConfig({ host, tokenUri: 'v2/5a9747793000006d005c1d66' })    
    fetch('/get').then(res => {
      assert(res.url === `${host}/get`, 'Host could not be set.')
    }).catch(err => assert.fail('Error', 'Response', err))
  })

  it('should allow custom headers to be appended', () => {
    fetch = fetchWithConfig({ host, tokenUri: 'v2/5a9747793000006d005c1d66', headers: [['Accept', 'application/json']] }, (next) => {
      return config => {
        next(config.then(config => {
          assert.nestedInclude(config.opts.headers, {'Accept': 'application/json'})
          return config;
        }))
      }
    })
    fetch('/get')
  })

  it('should allow custom middlewares', () => {
    let middleware = false

    fetch = fetchWithConfig({ host, tokenUri: 'v2/5a9747793000006d005c1d66' }, (next) => {
      middleware = true
      return config => next(config)
    })

    fetch('/get').then(res => {
      assert(middleware, true, 'The middleware was not called')
    })
  })
})