import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './pics-viewer.css'

@inject('stores')
@observer
class PicsViewer extends Component {
    constructor() {
        super()
        this.uploadPics = this.uploadPics.bind(this)
    }

    uploadPics(event) {
        const { target } = event
        const { stores: { uiState, photoStore } } = this.props
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
                    console.log(result)
                })
            })(target.files[i])
            reader.readAsDataURL(target.files[i])
        }
    }

    render() {
        const { stores: { photoStore: { photos } } } = this.props
        return (
            <div className="pics-viewer">
                <div className="header">
                    <h2>人物</h2>
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
                            photos.map(photo => (
                                <li key={photo.id}>
                                    <img src={photo.photo} alt="" />
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