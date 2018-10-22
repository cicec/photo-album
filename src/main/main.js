import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import NavBar from './nav-bar'
import PicsViewer from './pics-viewer'
import UserCard from './user-card'
import AddAlbum from './add-album'
import ViewDetails from './view-details'

@inject('stores')
@observer
class Main extends Component {
    componentWillMount() {
        const { stores: { initStore } } = this.props
        initStore()
    }

    render() {
        const { stores: { uiState: { currentState, states } } } = this.props
        return (
            <main>
                <NavBar />
                <PicsViewer />
                {currentState === states.USERINFO ? <UserCard /> : ''}
                {currentState === states.ADDALBUM ? <AddAlbum /> : ''}
                {currentState === states.VIEWDETAILS ? <ViewDetails /> : ''}
            </main>
        )
    }
}

export default Main