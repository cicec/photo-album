import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import stores from './stores'
import SignIn from './sign-in'
import SignUp from './sign-up'
import NavBar from './nav-bar'
import ImgViewer from './img-viewer'
import './icons'
import './App.css'

@observer
class App extends Component {
    render() {
        let content = null
        const { uiState } = stores
        switch (uiState.currentState) {
            case uiState.states.signIn:
                content = <div className="App"><SignIn /></div>
                break
            case uiState.states.signUp:
                content = <div className="App"><SignUp /></div>
                break
            case uiState.states.signed:
                content = (
                    <div className="App">
                        <NavBar />
                        <ImgViewer />
                    </div>
                )
                break
            default:
                break
        }
        return (
            <Provider stores={stores}>
                {content}
            </Provider>
        )
    }
}

export default App