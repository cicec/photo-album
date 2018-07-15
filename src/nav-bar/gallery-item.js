import React, { Component } from 'react'

class GalleryItem extends Component {
    render() {
        const { albumInfo: { cover, title, description, picsNumber } } = this.props
        return (
            <li>
                <div className="logo">
                    <img src={cover} alt="" />
                </div>
                <div className="info">
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
                <div className="number">
                    <h4>{picsNumber}</h4>
                    <p>pics</p>
                </div>
            </li>
        )
    }
}

export default GalleryItem