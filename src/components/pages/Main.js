import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import decoration from '../../resources/img/vision.png'
import { PropTypes } from "prop-types"
import { useState } from "react"
const Main = () => {
  const [character, setCharacter] = useState(null)
  const onSelectedCharacter = (id) => {
    setCharacter(id)
  }
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList upStateForCharacter={onSelectedCharacter} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo getIdCharacterFromState={character} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}
CharList.propsTypes = {
    upStateForCharacter: PropTypes.func.isRequired
}
export default Main