
const defaults = {
  initialToken: null,
  fetchToken: () => {},
  generateToken = (host) => {
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
}

export class tokenStorage {
  constructor({initialToken, fetchToken, generateToken} = defaults) {
    this._token = initialToken
    this._fetchToken = fetchToken
    this._generateToken = generateToken
  }

  getToken() {
    if (this._token) {
      return Promise.resolve(this._token)
    }
    return this.fetchToken().catch(this.generateToken())
  }

  fetchToken() {
    return this._fetchToken()
  }

  generateToken() {
    return this._generateToken()
  }
}