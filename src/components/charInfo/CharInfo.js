import { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage'
import MarvelServices from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss'

class CharInfo extends Component {
    state = {
        loading: false,
        error: false,
        character: null
    }
    marvelServices = new MarvelServices()
    componentDidMount() {
        this.updateCharacter()
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.character)
        if (this.props.getIdCharacterFromState !== prevProps.getIdCharacterFromState) {
            this.updateCharacter()
        }
    }
    updateCharacter = () => {
        const { getIdCharacterFromState } = this.props
        if (!getIdCharacterFromState) return
        this.onLoading()
        this.marvelServices.getOneCharacter(getIdCharacterFromState)
            .then(this.onLoaded)
            .catch(this.onError)
    }
    onLoaded = (character) => {
    this.setState({
        character,
        loading: false
    })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    onLoading = () => {
        this.setState({
            loading:  true,
        })
    }
    render() {
        const { loading, error, character } = this.state
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
}
const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = character
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

export default CharInfo;