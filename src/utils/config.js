import deepmerge from 'deepmerge'

export default class Config {

  constructor({uri = '', opts = {}} = {}) {
    this.uri = uri;
    this.opts = opts;
  }

  setHeader(name, value) {
    const uri = this.uri
    const opts = deepmerge(this.opts, { 
      headers: {
        [name]: value
      }
    })

    return new Config({uri, opts})
  }

  setAccessToken({token_type, access_token}) {
    return this.setHeader('Authorization', `${token_type} ${access_token}`);
  }

  updateUri(fn) {
    return new Config({opts: this.opts, uri: fn(this.uri)});
  }
}
