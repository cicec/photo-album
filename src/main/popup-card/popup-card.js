import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { CSSTransition } from 'react-transition-group'
import './popup-card.css'

function popupCard(WrappedComponent) {
    @inject('stores')
    @observer
    class PopupCard extends Component {
        constructor(props) {
            super(props)
            this.closeCard = this.closeCard.bind(this)
            this.transitionTime = 300
            this.state = { showCard: false }
        }

        componentDidMount() {
            this.setState({ showCard: true })
        }

        closeCard() {
            this.setState({ showCard: false })
            setTimeout(() => {
                const { stores: { uiState } } = this.props
                uiState.changeCurrentState(uiState.states.DEFAULT)
            }, this.transitionTime)
        }

        render() {
            const { showCard } = this.state
            return (
                <CSSTransition
                    in={showCard}
                    timeout={this.transitionTime}
                    classNames="popup-card-wrapper-transition"
                >
                    <div className={`popup-card-wrapper ${showCard ? 'active' : ''}`}>
                        <CSSTransition
                            in={showCard}
                            timeout={this.transitionTime}
                            classNames="popup-card-transition"
                        >
                            <div className="popup-card">
                                <button type="button" className="close" onClick={this.closeCard}>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-close" />
                                    </svg>
                                </button>
                                <WrappedComponent closeCard={this.closeCard} {...this.props} />
                            </div>
                        </CSSTransition>
                    </div>
                </CSSTransition>
            )
        }
    }
    return PopupCard
}

export default popupCard