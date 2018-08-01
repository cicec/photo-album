import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AlbumItem from './album-item'
import './nav-bar.css'

@inject('stores')
@observer
class NavBar extends Component {
    constructor() {
        super()
        this.viewUserInfo = this.viewUserInfo.bind(this)
        this.addAlbum = this.addAlbum.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    viewUserInfo() {
        const { stores: { uiState } } = this.props
        uiState.changeCurrentState(uiState.states.USERINFO)
    }

    addAlbum() {
        const { stores: { uiState } } = this.props
        uiState.changeCurrentState(uiState.states.ADDALBUM)
    }

    signOut() {
        const { stores: { userStore } } = this.props
        userStore.signOut().then((result) => {
            console.log(result)
            if (result.status > 0) {
                const { history } = this.props
                history.push('/signin')
            }
        })
    }

    render() {
        const { stores: { userStore, albumStore, photoStore } } = this.props
        const { user } = userStore
        return (
            <div className="nav-bar">
                <div className="user-info">
                    <button type="button" className="logout" onClick={this.signOut}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-logout" />
                        </svg>
                    </button>
                    <button type="button" className="avatar" onClick={this.viewUserInfo}>
                        <img src={user.avatar} alt="" />
                    </button>
                    <div className="info">
                        <h4>{user.name}</h4>
                        <p>{user.description}</p>
                    </div>
                </div>
                <div className="add-gallery">
                    <button type="button" onClick={this.addAlbum}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-plus" />
                        </svg>
                    </button>
                </div>
                <div className="gallery-list">
                    <ul>
                        {
                            albumStore.albums.map(album => <AlbumItem key={album.id} albumInfo={album} picsNumber={photoStore.photos.length} />)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(NavBar)