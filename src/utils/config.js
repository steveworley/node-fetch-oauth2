export default class Config {

  constructor({ uri, opts } = { opts: {} }) {
    this.uri = uri
    this.opts = opts
  }

  setAccessToken({token_type, access_token}) {
    return this.setHeader('Authorization', `${token_type} ${access_token}`)
  }

  setHeader(name, value) {
    const { headers, ...opts } = this.opts
    return new Config({uri: this.uri, opts: { ...opts, headers: { ...headers, [name]: value }}})
  }

  setHost(fn) {
    return new Config({opts: this.opts, uri: fn(this.uri)})
  }

}