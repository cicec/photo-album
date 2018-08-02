import React, { Component } from 'react'

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
        this.state = { shouldClose: false }
    }

    componentDidMount() {
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
        this.clearCloseTimer()
        this.setState({ shouldClose: true })
        this.timer = setTimeout(() => {
            const { onClose } = this.props
            if (onClose) onClose()
            clearTimeout(this.timer)
        }, this.transitionTime)
    }

    render() {
        const { shouldClose } = this.state
        const { type, content } = this.props
        return (
            <div className={`toast-notice ${type} ${shouldClose ? 'leave' : ''}`}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#${this.icons[type]}`} />
                </svg>
                {content}
            </div>
        )
    }
}

export default Notice