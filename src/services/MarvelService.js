//! clean JS
//https://gateway.marvel.com:443/v1/public/characters?limit=210&offset=9&apikey=16f6e7914a2a9cc7ff5b20c2b6739ada
class MarvelServices { 
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiRey = 'apikey=16f6e7914a2a9cc7ff5b20c2b6739ada'
  _baseOffset = 210
  getResource = async (url) => {
    const result = await fetch(url)
    if (!result.ok) {
      throw new Error (`Could not  ${url}, status : ${result.status}`)
    }
    return await result.json()
  }
  getAllCharacters = async (offset = this._baseOffset) => {
    const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiRey}`)
    return result.data.results.map(this._transformCharacter)
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
      wiki: character.urls[1].url,
      id: character.id,
      comics: character.comics.items
    }
  }
}
export default MarvelServices