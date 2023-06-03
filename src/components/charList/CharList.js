import './charList.scss'
import React from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage'
import MarvelServices from '../../services/MarvelService'
import PropesTypes from 'prop-types'
class CharList extends React.Component {
    state = {
        arrayOfCharacters: [],
        loading: true,
        error: false,
        requestLoading: false,
        offset: 210,
        end: false
    }
    characterRefs = []
    characters = new MarvelServices()
    componentDidMount() {
        this.onLoading()
        this.onRequest()
    }
    onRequest = (offset) => {
        this.onRequestLoading()
        this.characters.getAllCharacters(offset)
            .then(this.onLoad)
            .catch(this.onError)
    }
    onRequestLoading = () => {
        this.setState({ requestLoading: true })
    }
    onLoad = (result) => {
        let stop
        if (result.length < 9) {
            stop = true
        }
        let newArray = []
        if (JSON.stringify(result) === JSON.stringify(this.state.arrayOfCharacters)) {
            newArray = [...result ]
        } else {
            newArray = [...this.state.arrayOfCharacters, ...result ]
        }
        this.setState(({offset}) => ({
            arrayOfCharacters: newArray,
            loading: false,
            requestLoading: false,
            offset: offset + 9,
            end: stop
        }))
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
    setRef = (li) => {
        this.characterRefs.push(li)
    }
    changeStyle = (index) => {
        this.characterRefs.forEach((li) => li.classList.remove('char__item_selected'))
        this.characterRefs[index].classList.add('char__item_selected')
        this.characterRefs[index].focus()
    }
    makeLi = (array) => {
        const list = array.map((li, index) => {
            const liStyle = li.thumbnail.includes('image_not_available') ? { 'objectFit': 'fill' } : { 'objectFit': 'cover' }
            return (
                <li className="char__item" key={li.id} ref={this.setRef} onClick={() => {
                    this.props.upStateForCharacter(li.id)
                    this.changeStyle(index)
                }}>
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
        const {  requestLoading, offset, arrayOfCharacters, loading, error, end } = this.state
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const contant = errorMessage ? errorMessage : spinner ? spinner : this.makeLi(arrayOfCharacters)
        return (
            <div className="char__list">
                {contant}
                <button className="button button__main button__long"
                    disabled={requestLoading}
                    onClick={() => { this.onRequest(offset) }}
                    style={end ? {display: 'none'} : {display: 'block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
CharList.propsTypes = {
    upStateForCharacter: PropesTypes.func.isRequired
}

export default CharList;