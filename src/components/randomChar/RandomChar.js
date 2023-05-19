import { Component } from 'react'
import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelServices from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage'

class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.updateCharacters()
    }
    state = {
        character: {},
        loading: true,
        error: false
    }
    onCharChange = (character) => {
        if (!character.description) {
            character.description = 'No description about this character!'
        }
        if (character.description.length > 188) {
            character.description = character.description.slice(0, 186) + '...'
        }
        this.setState({
            character,
            loading: false, 
        })
    }
    characters = new MarvelServices()
    onError = () => {
    this.setState({
            loading: false,
            error: true
        })
}
    updateCharacters = () => {
        this.characters
            .getOneCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(this.onCharChange)
            .catch(this.onError)
    }
    render() {
        const { character, loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = errorMessage ? <ErrorMessage /> : spinner ? <Spinner /> : <View character={character} />
        return (
            <div className="randomchar">
                {/* {errorMessage} */}
                {/* {spinner} */}
                {content}
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
const View = ({character}) => {
    const { name, description, thumbnail, homepage, wiki } = character
    return (
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
    )
}

export default RandomChar;