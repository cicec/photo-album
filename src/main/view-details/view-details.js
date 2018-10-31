import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import popupCard from '../popup-card'
import Modal from '../../components/modal'
import './view-details.css'

@inject('stores')
@observer
class UserCard extends Component {
    constructor() {
        super()
        this.removeSelf = this.removeSelf.bind(this)
        this.state = { photoUrl: '' }
    }

    removeSelf() {
        const { stores: { uiState, photoStore } } = this.props
        const photoId = uiState.viewedPhotoId
        const { closeCard } = this.props
        Modal.confirm({
            contentText: '确定要删除吗？',
            onOk() {
                photoStore.removePhoto({ id: photoId }).then((result) => {
                    if (result.status > 0) {
                        closeCard()
                        photoStore.getPhotoList(uiState.viewedAlbumId)
                    }
                })
            }
        })
    }

    render() {
        const { stores: { uiState: { viewedPhotoId }, photoStore: { getPhotoById } } } = this.props
        getPhotoById(viewedPhotoId).then((photo) => {
            this.setState({ photoUrl: photo.photo })
        })
        const { photoUrl } = this.state
        return (
            <div className="view-details">
                <div className="menu-bar">
                    <button type="button">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-edit" />
                        </svg>
                    </button>
                    <button type="button">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-share" />
                        </svg>
                    </button>
                    <button type="button" onClick={this.removeSelf}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-delete" />
                        </svg>
                    </button>
                    <button type="button">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-ellipsis" />
                        </svg>
                    </button>
                </div>

                <div className="img-wrapper">
                    <img src={photoUrl} alt="" />
                </div>
            </div>
        )
    }
}

export default popupCard(UserCard)