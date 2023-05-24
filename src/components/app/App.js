import AppHeader from "../appHeader/AppHeader"
import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import { Component } from "react"

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedCharacter: null
    }
    onSelectedCharacter = (id) => {
        this.setState({selectedCharacter: id})
    }
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList upStateForCharacter={this.onSelectedCharacter}/>
                        <CharInfo getIdCharacterFromState={this.state.selectedCharacter}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )

    }
}

export default App;