import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import stores from './stores'
import NavBar from './nav-bar'
import ImgViewer from './img-viewer'
import './icons'
import './App.css'

class App extends Component {
    render() {
        return (
            <Provider stores={stores}>
                <div className="App">
                    <NavBar />
                    <ImgViewer />
                </div>
            </Provider>
        )
    }
}

export default App