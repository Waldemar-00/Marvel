//! clean JS
class MarvelServices {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiRey = 'apikey=f1a00c9aefc1b72256ac8e8a4fb5af16'
  getResource = async (url) => {
    const result = await fetch(url)
    if (!result.ok) {
      throw new Error (`Could not  ${url}, status : ${result.status}`)
    }
    return await result.json()
  }
  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiRey}`)
  }
  getOneCharacter = async (characterId) => {
    const result = await this.getResource(`${this._apiBase}characters/${characterId}?${this._apiRey}`)
    return this._transformCharacter(result)
  }
  _transformCharacter = (result) => {
    return {
      name: result.data.results[0].name,
      description: result.data.results[0].description,
      thumbnail: result.data.results[0].thumbnail.path + '.' + result.data.results[0].thumbnail.extension,
      homepage: result.data.results[0].urls[0].url,
      wiki: result.data.results[0].urls[1].url
    }
  }
}
export default MarvelServices