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
        console.log(getIdCharacterFromState)
        this.marvelServices.getOneCharacter(getIdCharacterFromState)
            .then(this.onLoad)
            .catch(this.onError)
    }
    onLoad = (character) => {
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
    const {name, description, thumbnail, homepage, wiki} = character
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="name"/>
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
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
                <li className="char__comics-item">
                    Alpha Flight (1983) #50
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #503
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #504
                </li>
                <li className="char__comics-item">
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Vengeance (2011) #4
                </li>
                <li className="char__comics-item">
                    Avengers (1963) #1
                </li>
                <li className="char__comics-item">
                    Avengers (1996) #1
                </li>
            </ul>
        </>
    )
}

export default CharInfo;