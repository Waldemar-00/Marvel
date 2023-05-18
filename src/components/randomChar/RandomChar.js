import { Component } from 'react'
import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelServices from '../../services/MarvelService'

class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.updateCharacters()
    }
    state = {
        name: null,
        description: null,
        thumbnail: null, 
        homepage: null,
        wiki: null
    }
    characters = new MarvelServices()
    updateCharacters = () => {
        this.characters.getOneCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000 ))
            .then(result => {
                this.setState(result)
            })
        this.characters.getAllCharacters().then(result => console.log(result))
    }
    render() {
        const {name, description, thumbnail, homepage, wiki} = this.state
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={ thumbnail } alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{ name }</p>
                        <p className="randomchar__descr">
                            { description }
                        </p>
                        <div className="randomchar__btns">
                            <a href={ homepage } className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={ wiki } className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;