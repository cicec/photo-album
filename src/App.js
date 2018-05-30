import React, { Component } from 'react'
import stores from './stores'
import NavBar from './nav-bar'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar store={stores.navBarStore} />
            </div>
        )
    }
}

export default App