import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import decoration from '../../resources/img/vision.png'
import CharSearchForm from "../charSearchForm/CharSearchForm"
import { PropTypes } from "prop-types"
import { useState } from "react"
import {Helmet} from 'react-helmet'
const Main = () => {
  const [character, setCharacter] = useState(null)
  const onSelectedCharacter = (id) => {
    setCharacter(id)
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Marvel information"
        />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList upStateForCharacter={onSelectedCharacter} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo getIdCharacterFromState={character} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm/>
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}
CharList.propsTypes = {
    upStateForCharacter: PropTypes.func.isRequired
}
export default Main