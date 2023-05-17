//! clean JS
class MarvelServices {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiRey = 'apikey=f1a00c9aefc1b72256ac8e8a4fb5af16'
  getService = async (url) => {
    const result = await fetch(url)
    if (!result.ok) {
      throw new Error (`Could not  ${url}, status : ${result.status}`)
    }
    return await result.json()
  }
  getAllCharacters = () => {
    return this.getService(`${this._apiBase}characters?limit=9&offset=210&${this._apiRey}`)
  }
  getOneCharacter = (character) => {
  return this.getService(`${this._apiBase}characters/${character}?${this._apiRey}`)
}
}
export default MarvelServices