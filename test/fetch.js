import { assert, expect } from 'chai'
import AcquiaFetch from '../src/index'

describe('Acquia Oauth Fetch', () => {

  let fetch;
  const host = 'https://httpbin.org'

  it('should automatically set the host', () => {
    fetch = AcquiaFetch({ host })    
    fetch('/get').then(res => {
      assert(res.url === `${host}/get`, 'Host could not be set.')
    }).catch(err => assert.fail('Error', 'Response', err))
  })

  it('should allow custom headers to be appended', () => {
    fetch = AcquiaFetch({ host, headers: [['Accept', 'application/json']] }, (next) => {
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

    fetch = AcquiaFetch({ host }, (next) => {
      middleware = true
      return config => next(config)
    })
    
    fetch('/get').then(res => {
      assert(middleware, true, 'The middleware was not called')
    })
  })
})