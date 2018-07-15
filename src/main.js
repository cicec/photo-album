import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from './nav-bar'
import PicsViewer from './pics-viewer'
import UserCard from './user-card'
import AddAlbum from './add-album'

@inject('stores')
@observer
class Main extends Component {
    componentWillMount() {
        const { stores: { uiState, albumStore } } = this.props
        albumStore.getAlbumList().then((result) => {
            if (result.albumList || result.albumList.length > 0) {
                const viewedAlbum = result.albumList[0]
                uiState.changeViewedAlbumId(viewedAlbum.id)
            }
        })
    }

    render() {
        const { stores: { uiState } } = this.props
        return (
            <main>
                <NavBar />
                <PicsViewer />
                {uiState.currentState === uiState.states.USERINFO ? <UserCard /> : ''}
                {uiState.currentState === uiState.states.ADDALBUM ? <AddAlbum /> : ''}
            </main>
        )
    }
}

export default Main