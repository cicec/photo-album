import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import GalleryItem from './gallery-item'
import './nav-bar.css'

@inject('stores')
@observer
class NavBar extends Component {
    constructor() {
        super()
        this.viewUserInfo = this.viewUserInfo.bind(this)
    }

    viewUserInfo() {
        const { stores: { uiState } } = this.props
        uiState.changeCurrentState(uiState.states.VIEWUSERINFO)
    }

    render() {
        const { stores: { userStore, albumStore } } = this.props
        const { user } = userStore
        return (
            <div className="nav-bar">
                <div className="user-info">
                    <button type="button" className="avatar" onClick={this.viewUserInfo}>
                        <img src={user.avatar} alt="" />
                    </button>
                    <div className="info">
                        <h4>{user.name}</h4>
                        <p>{user.description}</p>
                    </div>
                </div>
                <div className="add-gallery">
                    <button type="button">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-plus" />
                        </svg>
                    </button>
                </div>
                <div className="gallery-list">
                    <ul>
                        {
                            albumStore.albums.map(album => <GalleryItem key={album.id} galleryInfo={album} />)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavBar