import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import './style/style.scss'
// import MarvelServices from './services/MarvelService'
// const characters = new MarvelServices()
// characters.getAllCharacters().then(result => console.log(result))
// characters.getAllCharacters().then(result => {
  // result.data.results.forEach(object => {
    // console.log(object.name)
  // })
// })
// characters.getOneCharacter(1011052).then(result => console.log(result))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

