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
    return this._transformCharacter(result.data.results[0])
  }
  _transformCharacter = (character) => {
    return {
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url
    }
  }
}
export default MarvelServices