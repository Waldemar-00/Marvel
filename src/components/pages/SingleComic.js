import './singleComic.scss'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import Spinner from '../spinner/Spinner'
import MarvelServices from '../../services/MarvelService'
import useHttp from "../../hooks/http.hook"
import NoMatch from './NoMatch'

const SingleComic = () => {
  const { comicId } = useParams()
  const [comic, setComic] = useState(null)
  const [spinner, setSpinner] = useState(true)
  const [error, setError] = useState(false)
  const {clearError} = useHttp()
  useEffect(() => {
      const services = new MarvelServices()
      const updateComic = () => {
      services.getComic(comicId)
      .then(onLoaded)
      .catch(onError)
    }
      clearError()
      updateComic()
  }, [])
  const onLoaded = (comic) => {
      setComic(comic)
      setSpinner(false)
  }
  const onError = () => {
    setSpinner(false)
    setError(true)
  }
  const loadSpinner = spinner ? <Spinner /> : null
  const errorMessage = error ? <NoMatch /> : null
  const contant = comic ? <View comic={comic} /> : null
  return (
    <>
      {loadSpinner} 
      {errorMessage}
      {contant}
    </>
    )
}
const View = ({ comic }) => {
  const {title, description, pageCount, thumbnail, language, price} = comic
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
          <h2 className="single-comic__name">{ title }</h2>
          <p className="single-comic__descr">{ description }</p>
          <p className="single-comic__descr">{ pageCount }</p>
          <p className="single-comic__descr">Language: { language } </p>
          <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">Back to all comics</Link>
    </div>
  )
}

export default SingleComic;