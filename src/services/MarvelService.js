//! clean JS
//https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=bd8673ecbff251cdb59ed3a0d89b43e2
//https://gateway.marvel.com:443/v1/public/characters/110456?apikey=bd8673ecbff251cdb59ed3a0d89b43e2
class MarvelServices { 
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=bd8673ecbff251cdb59ed3a0d89b43e2'
  _baseOffset = 210
  getAllComics = async (offset = 0) => {
		const result = await this.getResource(`${this._apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${this._apiKey}`)
		return result.data.results.map(this._transformComics)
	}
  getResource = async (url) => {
    const result = await fetch(url)
    if (!result.ok) {
      throw new Error (`Could not  ${url}, status : ${result.status}`)
    }
    return await result.json()
  }
  getAllCharacters = async (offset = this._baseOffset) => {
    const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
    return result.data.results.map(this._transformCharacter)
  }
  getOneCharacter = async (characterId) => {
    const result = await this.getResource(`${this._apiBase}characters/${characterId}?${this._apiKey}`)
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
  _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		}
	}
}
export default MarvelServices