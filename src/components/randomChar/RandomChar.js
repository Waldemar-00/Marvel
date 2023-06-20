import { useState, useEffect } from 'react'
import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelServices from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage'

const RandomChar = () => {
    const [character, setCharacter] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const characters = new MarvelServices()
    useEffect(() => {
        updateCharacters()
        const timerId = setInterval(updateCharacters, 4000)
        return () => clearInterval(timerId)
    }, [])
    const onCharChange = (character) => {
        if (!character.description) {
            character.description = 'No description about this character!'
        }
        if (character.description.length > 188) {
            character.description = character.description.slice(0, 186) + '...'
        }
        setCharacter(character)
        setLoading(false)
    }
    const onError = () => {
        setLoading(false)
        setError(true)
    }
    const updateCharacters = () => {
        characters.getOneCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(onCharChange)
            .catch(onError)
    }
    const onClickUpdate = () => {
        setError(false)
        setLoading(true)
        updateCharacters()
    }
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = errorMessage ? <ErrorMessage /> : spinner ? <Spinner /> : <View character={character} />
    return (
        <div className="randomchar">
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={onClickUpdate}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}
function View({character}) {
    const { name, description, thumbnail, homepage, wiki } = character
    const styleImg = thumbnail.includes('image_not_available') ? { objectFit: 'fill' } : null
    const styleName = name.length > 22 ? {fontSize: '18px'} : null
    return (
        <div className="randomchar__block">
            <img src={ thumbnail } style={styleImg} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name" style={styleName}>{ name }</p>
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