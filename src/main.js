import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from './nav-bar'
import ImgViewer from './img-viewer'
import UserCard from './user-card'
import AddAlbum from './add-album'

@inject('stores')
@observer
class Main extends Component {
    render() {
        const { stores: { uiState } } = this.props
        return (
            <main>
                <NavBar />
                <ImgViewer />
                {uiState.currentState === uiState.states.USERINFO ? <UserCard /> : ''}
                {uiState.currentState === uiState.states.ADDALBUM ? <AddAlbum /> : ''}
            </main>
        )
    }
}

export default Main