//! clean JS
//https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=bd8673ecbff251cdb59ed3a0d89b43e2
//https://gateway.marvel.com:443/v1/public/characters/110456?apikey=bd8673ecbff251cdb59ed3a0d89b43e2
class MarvelServices { 
  _apiBase = 'https://gateway.marvel.com:443/v1/public/characters'
  _apiKey = 'apikey=bd8673ecbff251cdb59ed3a0d89b43e2'
  _baseOffset = 210
  getResource = async (url) => {
    const result = await fetch(url)
    if (!result.ok) {
      throw new Error (`Could not  ${url}, status : ${result.status}`)
    }
    return await result.json()
  }
  getAllCharacters = async (offset = this._baseOffset) => {
    const result = await this.getResource(`${this._apiBase}?limit=9&offset=${offset}&${this._apiKey}`)
    return result.data.results.map(this._transformCharacter)
  }
  getOneCharacter = async (characterId) => {
    const result = await this.getResource(`${this._apiBase}/${characterId}?${this._apiKey}`)
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