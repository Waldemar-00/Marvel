import AppHeader from "../appHeader/AppHeader"
import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import { useState } from "react"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import { PropTypes } from "prop-types"
import AppBanner from "../appBanner/AppBanner"
import ComicsList from "../comicsList/ComicsList"
import decoration from '../../resources/img/vision.png'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
const App = () => {
  const [character, setCharacter] = useState(null)
  const onSelectedCharacter = (id) => {
      setCharacter(id)
  }
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Switch>
            <Route exact path='/'>
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
            </Route>  
            <Route exact path='/comics'>
              <AppBanner />
              <ComicsList/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}
CharList.propsTypes = {
    upStateForCharacter: PropTypes.func.isRequired
}

export default App;