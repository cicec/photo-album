import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './popup-card.css'

function popupCard(WrappedComponent) {
    @inject('stores')
    @observer
    class PopupCard extends Component {
        constructor(props) {
            super(props)
            this.closeCard = this.closeCard.bind(this)
        }

        closeCard() {
            const { stores: { uiState } } = this.props
            uiState.changeCurrentState(uiState.states.DEFAULT)
        }

        render() {
            return (
                <div className="popup-card-wrapper">
                    <div className="popup-card">
                        <button type="button" className="close" onClick={this.closeCard}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-close" />
                            </svg>
                        </button>
                        <WrappedComponent {...this.props} />
                    </div>
                </div>
            )
        }
    }
    return PopupCard
}

export default popupCard