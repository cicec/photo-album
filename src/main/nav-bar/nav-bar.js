import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Modal from '../../components/modal'
import Toast from '../../components/toast'
import AlbumItem from './album-item'
import './nav-bar.css'

@inject('stores')
@observer
class NavBar extends Component {
    constructor() {
        super()
        this.viewUserInfo = this.viewUserInfo.bind(this)
        this.addAlbum = this.addAlbum.bind(this)
        this.removeAlbum = this.removeAlbum.bind(this)
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

    removeAlbum(id) {
        const { stores: { albumStore, initStore } } = this.props
        Modal.confirm({
            contentText: '这将删除您的整个相册，确定吗？',
            onOk() {
                albumStore.removeAlbum({ id }).then((result) => {
                    if (result.status > 0) {
                        initStore()
                    }
                })
            }
        })
    }

    signOut() {
        const { stores: { userStore } } = this.props
        const { history } = this.props
        Modal.confirm({
            contentText: '将退出登录，确定吗？',
            onOk() {
                userStore.signOut().then((result) => {
                    if (result.status > 0) {
                        Toast.success('用户已注销')
                        history.push('/signin')
                    }
                })
            }
        })
    }

    render() {
        const { stores: { userStore, albumStore, photoStore } } = this.props
        const { user } = userStore
        return (
            <div className="nav-bar">
                <header>
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
                </header>
                <main>
                    <div className="gallery-list">
                        <ul>
                            {
                                albumStore.albums.map(album => (
                                    <AlbumItem
                                        key={album.id}
                                        albumInfo={album}
                                        picsNumber={photoStore.photos.length}
                                        removeAlbum={this.removeAlbum}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </main>
            </div>
        )
    }
}

export default withRouter(NavBar)