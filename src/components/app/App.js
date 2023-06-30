import AppHeader from "../appHeader/AppHeader"
import {Main, Comics, NoMatch} from '../pages'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path='/' element={ <Main/> } /> 
            <Route path='/comics' element={<Comics />} />
            <Route path='*' element={<NoMatch/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;