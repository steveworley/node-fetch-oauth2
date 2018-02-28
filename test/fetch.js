import { assert, expect } from 'chai'
import { AcquiaFetch } from '../src/AcquiaFetch'

let fetch;
const host = 'https://httpbin.org/post'

describe('Acquia Oauth Fetch', () => {
  it('should automatically set the host', () => {
    fetch = AcquiaFetch({host: 'https://httpbin.org'})
    fetch('/get').then(res => console.log(res)).catch(err => console.log(err))
  })
  it('should accept custom middleware', () => {})
  it('should allow custom headers to be appended', () => {})
  
})