import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from './nav-bar'
import ImgViewer from './img-viewer'
import UserCard from './user-card'

@inject('stores')
@observer
class Main extends Component {
    render() {
        const { uiState } = this.props.stores
        return (
            <main>
                <NavBar />
                <ImgViewer />
                {uiState.currentState === uiState.states.VIEWUSERINFO ? <UserCard /> : ''}
            </main>
        )
    }
}

export default Main