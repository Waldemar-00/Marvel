import AppHeader from "../appHeader/AppHeader"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from 'react'
import Spinner from '../spinner/Spinner'
const NoMatch = lazy(() => import('../pages/NoMatch'))
const Main = lazy(() => import('../pages/Main'))
const Comics = lazy(() => import('../pages/Comics'))
const SingleComic = lazy(() => import('../pages/SingleComic'))
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path='/' element={
              <Suspense fallback={<Spinner/>}>
                <Main />
              </Suspense>
            } /> 
            <Route path='/comics' element={
              <Suspense fallback={<Spinner/>}>
                <Comics />
              </Suspense>
            } />
            <Route path='/comics/:comicId' element={
              <Suspense fallback={<Spinner/>}>
                <SingleComic />
              </Suspense>
            } />
            <Route path='*' element={
              <Suspense fallback={<Spinner/>}>
                <NoMatch/>
              </Suspense>
            }/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;