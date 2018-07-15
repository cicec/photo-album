import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('stores')
@observer
class AlbumItem extends Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { stores: { uiState }, albumInfo: { id } } = this.props
        uiState.changeViewedAlbumId(id)
    }

    render() {
        const { stores: { uiState }, albumInfo: { id, cover, title, description, picsNumber } } = this.props
        const isViewed = (id === uiState.viewedAlbumId)
        return (
            <li className={isViewed ? 'active' : ''} onClick={this.handleClick}>
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

export default AlbumItem