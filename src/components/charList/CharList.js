import './charList.scss'
import { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage'
import MarvelServices from '../../services/MarvelService'
class CharList extends Component {
    state = {
        arrayOfCharacters: [],
        loading: true,
        error: false,
    }
    characters = new MarvelServices()
    componentDidMount() {
        this.onLoading()
        this.characters.getAllCharacters()
            .then(this.onLoad)
            .catch(this.onError)
    }
    onLoad = (result) => {
        this.setState({
            arrayOfCharacters: result,
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
    makeLi = (array) => {
        const list = array.map(li => {
            const liStyle = li.thumbnail.includes('image_not_available') ? { 'objectFit': 'fill' } : { 'objectFit': 'cover' }
            return (
                <li className="char__item" key={li.id} onClick={() => this.props.upStateForCharacter(li.id)}>
                    <img src={li.thumbnail} alt={li.name} style={liStyle}/>
                    <div className="char__name">{li.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {list}
            </ul>
        )
    }
    render() {
        const { arrayOfCharacters, loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const contant = errorMessage ? errorMessage : spinner ? spinner : this.makeLi(arrayOfCharacters)
        return (
            <div className="char__list">
                {contant}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;