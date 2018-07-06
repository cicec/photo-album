import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import stores from './stores'
import SignIn from './sign-in'
import SignUp from './sign-up'
import NavBar from './nav-bar'
import ImgViewer from './img-viewer'
import UserCard from './user-card'
import './icons'

@observer
class App extends Component {
    render() {
        const MainPage = () => (
            <main>
                {/* <button
                    onClick={() => {
                        fetch('http://localhost:8080/signout', {
                            method: 'GET',
                            credentials: 'include',
                        }).then(response => response.json())
                            .then((result) => {
                                console.log(result)
                            })
                    }}
                >退出登录
                </button> */}
                <NavBar />
                <ImgViewer />
                <UserCard />
            </main>
        )
        return (
            <Router>
                <Provider stores={stores}>
                    <div className="App">
                        <Switch>
                            <Route path="/signin" component={SignIn} />
                            <Route path="/signup" component={SignUp} />
                            <Route
                                path="/"
                                render={(props) => {
                                    const { userStore } = stores
                                    stores.userStore.authUserInfo().then(() => {
                                        if (!userStore.userInfo.isSigned) {
                                            props.history.push('/signin')
                                        }
                                    })
                                    return <MainPage />
                                }}
                            />
                        </Switch>
                    </div>
                </Provider>
            </Router>
        )
    }
}

export default App