import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

class Notice extends Component {
    constructor() {
        super()
        this.icons = {
            info: 'icon-info-circle-fill',
            success: 'icon-check-circle-fill',
            warning: 'icon-warning-circle-fill',
            error: 'icon-close-circle-fill',
        }
        this.transitionTime = 300
        this.state = { entered: false }
    }

    componentDidMount() {
        this.setState({ entered: true })
        const { duration } = this.props
        if (duration > 0) {
            this.closeTimer = setTimeout(() => {
                this.close()
            }, duration - this.transitionTime)
        }
    }

    componentWillUnmount() {
        this.clearCloseTimer()
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    }

    close() {
        this.setState({ entered: false })
        this.clearCloseTimer()
        this.timer = setTimeout(() => {
            const { onClose } = this.props
            if (onClose) onClose()
            clearTimeout(this.timer)
        }, this.transitionTime)
    }

    render() {
        const { entered } = this.state
        const { type, content } = this.props
        return (
            <CSSTransition
                in={entered}
                classNames="toast-notice-wrapper notice"
                timeout={this.transitionTime}
            >
                <div className={`toast-notice ${type}`}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#${this.icons[type]}`} />
                    </svg>
                    {content}
                </div>
            </CSSTransition>
        )
    }
}

export default Notice