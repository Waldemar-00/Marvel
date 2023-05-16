class MarvelServices {
  getService = async (url) => {
    const result = await fetch(url)
    if (!result.ok) {
      throw new Error (`Could not  ${url}, status : ${result.status}`)
    }
    return await result.json()
  }
  getAllCharacters = () => {
    return this.getService('https://gateway.marvel.com:443/v1/public/characters?apikey=f1a00c9aefc1b72256ac8e8a4fb5af16')
  }
}