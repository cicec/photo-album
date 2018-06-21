import React, { Component } from 'react'

class GalleryItem extends Component {
    render() {
        const { galleryInfo } = this.props
        return (
            <li>
                <div className="logo">
                    <img src={galleryInfo.cover} alt="" />
                </div>
                <div className="info">
                    <h4>{galleryInfo.name}</h4>
                    <p>{galleryInfo.description}</p>
                </div>
                <div className="number">
                    <h4>{galleryInfo.number}</h4>
                    <p>pics</p>
                </div>
            </li>
        )
    }
}

export default GalleryItem