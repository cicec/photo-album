import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Toast from '../../components/toast'
import './pics-viewer.css'

@inject('stores')
@observer
class PicsViewer extends Component {
    constructor() {
        super()
        this.uploadPics = this.uploadPics.bind(this)
        this.viewDetails = this.viewDetails.bind(this)
    }

    uploadPics(event) {
        const { target } = event
        const { stores: { uiState, photoStore } } = this.props
        if (uiState.viewedAlbumId > 0) {
            for (let i = 0; i < target.files.length; i++) {
                const reader = new FileReader()
                reader.onload = (file => (event1) => {
                    const photo = {
                        albumId: uiState.viewedAlbumId,
                        photo: event1.target.result,
                        name: file.name,
                        modified: file.lastModified,
                        size: file.size,
                        type: file.type
                    }
                    photoStore.addPhoto(photo).then((result) => {
                        if (result.status > 0) {
                            photoStore.getPhotoList(uiState.viewedAlbumId)
                        }
                    })
                })(target.files[i])
                reader.readAsDataURL(target.files[i])
            }
        } else {
            Toast.warning('没有相册被选中')
        }
    }

    viewDetails(id) {
        const { stores: { uiState } } = this.props
        uiState.changeViewedPhotoId(id)
        uiState.changeCurrentState(uiState.states.VIEWDETAILS)
    }

    render() {
        const { stores: { photoStore } } = this.props
        return (
            <div className="pics-viewer">
                <div className="header">
                    <h2>我的图片</h2>
                    <label htmlFor="upload-pics">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-cloud-upload" />
                        </svg>
                    </label>
                    <input type="file" accept="image/*" id="upload-pics" className="upload-pics" multiple onChange={this.uploadPics} />
                </div>
                <div className="imgs">
                    <ul>
                        {
                            photoStore.photos.map(item => (
                                <li key={item.id} onClick={() => { this.viewDetails(item.id) }}>
                                    <div className="inner">
                                        <div className="img-wrapper">
                                            <img src={item.photo} alt="" />
                                        </div>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-eye" />
                                        </svg>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default PicsViewer