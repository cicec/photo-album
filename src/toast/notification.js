import React, { Component } from 'react'
import Notice from './notice'

class Notification extends Component {
    constructor() {
        super()
        this.state = { notices: [] }
    }

    getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }

    addNotice(notice) {
        const { notices } = this.state
        notice.key = this.getNoticeKey()
        if (notices.every(item => item.key !== notice.key)) {
            notices.push(notice)
            this.setState({ notices })
        }
    }

    removeNotice(key) {
        this.setState(previousState => ({
            notices: previousState.notices.filter(notice => notice.key !== key)
        }))
    }

    render() {
        const { notices } = this.state
        return (
            <div className="toast-notification">
                {
                    notices.map(notice => <Notice key={notice.key} {...notice} />)
                }
            </div>
        )
    }
}

export default Notification