import './charList.scss'
import {useState, useEffect, useRef} from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage'
import MarvelServices from '../../services/MarvelService'

const CharList = (props) => {
    const [arrayOfCharacters, setArrayOfCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [requestLoading, setRequestLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [end, setEnd] = useState(false)
    const characterRefs = useRef([])
    const characters = new MarvelServices()
    useEffect(() => {
        onLoading()
        onRequest()
    }, [] )
    const onRequest = (offset) => {
        onRequestLoading()
        characters.getAllCharacters(offset)
            .then(onLoad)
            .catch(onError)
    }
    function onRequestLoading() {
        setRequestLoading(true)
    }
    const  onLoad = (result) => {
        let stop
        if (result.length < 9) {
            stop = true
        }
        setArrayOfCharacters(arrayOfCharacters =>  [...arrayOfCharacters, ...result])
        setLoading(false)
        setRequestLoading(false)
        setOffset(offset + 9)
        setEnd(stop)
    }
    function onError() {
        setLoading(false)
        setError(true)
        }
    const onLoading = () => {
        setLoading(true)
    }
    const focusOnLi = (index) => {
        characterRefs.current.forEach(li => li.classList.remove('char__item_selected'))
        characterRefs.current[index].classList.add('char__item_selected')
        characterRefs.current[index].focus()
    }
    function makeLi(array) {
        // array = array.slice(1)
        const list = array.map((li, index) => {
            const liStyle = li.thumbnail.includes('image_not_available') ? { 'objectFit': 'fill' } : { 'objectFit': 'cover' }
            return (
                <li className="char__item"
                    tabIndex={0}
                    key={li.id}
                    ref={li => characterRefs.current[index] = li}
                    onClick={() => {
                    props.upStateForCharacter(li.id)
                    focusOnLi(index)
                }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Tab') {
                            e.preventDefault()
                            props.upStateForCharacter(li.id)
                            focusOnLi(index)
                        }
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

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const contant = errorMessage ? errorMessage : spinner ? spinner : makeLi(arrayOfCharacters)
    return (
        <div className="char__list">
            {contant}
            <button className="button button__main button__long"
                disabled={requestLoading}
                onClick={() => onRequest(offset) }
                style={end ? {display: 'none'} : {display: 'block'}}
            >
                <div className="inner">load more</div>  
            </button>
        </div>
    )
}


export default CharList;