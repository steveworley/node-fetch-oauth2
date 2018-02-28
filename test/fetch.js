import { assert, expect } from 'chai'
import fetchWithConfig from '../lib/index'

describe('Node Fetch Oauth', () => {

  let fetch;
  const host = 'https://httpbin.org'

  it('should automatically set the host', () => {
    fetch = fetchWithConfig({ host })    
    fetch('/get').then(res => {
      assert(res.url === `${host}/get`, 'Host could not be set.')
    }).catch(err => assert.fail('Error', 'Response', err))
  })

  it('should allow custom headers to be appended', () => {
    fetch = fetchWithConfig({ host, headers: [['Accept', 'application/json']] }, (next) => {
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

    fetch = fetchWithConfig({ host }, (next) => {
      middleware = true
      return config => next(config)
    })

    fetch('/get').then(res => {
      assert(middleware, true, 'The middleware was not called')
    })
  })
})