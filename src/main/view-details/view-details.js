import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './view-details.css'

@inject('stores')
@observer
class UserCard extends Component {
    constructor() {
        super()
        this.closeCard = this.closeCard.bind(this)
    }

    closeCard() {
        const { stores: { uiState } } = this.props
        uiState.changeCurrentState(uiState.states.DEFAULT)
    }

    render() {
        const { stores: { uiState: { viewedPhotoId } } } = this.props
        return (
            <div className="view-details">
                <div className="card">
                    <button type="button" className="close" onClick={this.closeCard}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>

                    <h1>这是图</h1>
                </div>
            </div>
        )
    }
}

export default UserCard