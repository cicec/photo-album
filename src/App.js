import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import stores from './stores'
import NavBar from './nav-bar'
import './App.css'

class App extends Component {
    render() {
        return (
            <Provider stores={stores}>
                <NavBar />
            </Provider>
        )
    }
}

export default App