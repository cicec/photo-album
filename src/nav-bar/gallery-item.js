import React, { Component } from 'react'

class GalleryItem extends Component {
    render() {
        const { galleryInfo } = this.props
        return (
            <li>
                <div className="logo">
                    <img src={`./img/${galleryInfo.anme}`} alt="" />
                </div>
                <h4>{galleryInfo.name}</h4>
                <p>{galleryInfo.description}</p>
            </li>
        )
    }
}

export default GalleryItem