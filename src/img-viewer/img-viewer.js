import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class ImgViewer extends Component {
    render() {
        const { uiState } = this.props.stores
        return (
            <div className="img-viewer">
                Img viewer for gallery: {uiState.viewedGallery}.
            </div>
        )
    }
}

export default ImgViewer