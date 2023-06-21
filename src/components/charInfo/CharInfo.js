import { useState, useEffect, useMemo } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage'
import MarvelServices from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss'
import PropTypes from 'prop-types'

const CharInfo = (props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [character, setCharacter] = useState(null)
    const marvelServices = useMemo(()=> new MarvelServices(), []) 
    useEffect(() => {
        const updateCharacter = () => {
        const { getIdCharacterFromState } = props
            if (!getIdCharacterFromState) return
            onLoading()
        marvelServices.getOneCharacter(getIdCharacterFromState)
        .then(onLoaded)
        .catch(onError)
        }
        updateCharacter()
    }, [marvelServices, props])
    const onLoaded = (character) => {
        setCharacter(character)
        setLoading(false)
    }
    const onLoading = () => {
        setLoading(true)
    }
    const onError = () => {
    setLoading(false)
    setError(true)
    }
    const skeleton = loading || error || character ? null : <Skeleton/>
    const spinner = loading ? <Spinner /> : null
    const errorMessage = error ? <ErrorMessage /> : null
    const contant = character ? <View character={character} /> : null
    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {contant}
        </div>
    )
}
function View({ character }) {
    const { name, description, thumbnail, homepage, wiki, comics } = character
    console.log(comics)
    const style = thumbnail.includes('image_not_available') ? { 'objectFit': 'fill' } :  { 'objectFit': 'cover' }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="name" style={style}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description ? description: 'There is no description for this character'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'No comics for this character!' : null}
                {
                    comics.map((object, index) => {
                        return (
                            <li key={index} className="char__comics-item">
                                {object.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}
CharInfo.propTypes = {
    getIdCharacterFromState: PropTypes.number
}
export default CharInfo