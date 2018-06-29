import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import stores from './stores'
import SignIn from './sign-in'
import SignUp from './sign-up'
import NavBar from './nav-bar'
import ImgViewer from './img-viewer'
import './icons'

class App extends Component {
    render() {
        const MainPage = () => (
            <main>
                <NavBar />
                <ImgViewer />
            </main>
        )
        return (
            <Router>
                <Provider stores={stores}>
                    <div className="App">
                        <Switch>
                            <Route path="/signin" component={SignIn} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/" component={MainPage} />
                        </Switch>
                    </div>
                </Provider>
            </Router>
        )
    }
}

export default App