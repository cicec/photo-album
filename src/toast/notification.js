import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Notice from './notice'

class Notification extends Component {
    static reWrite(props) {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const notification = ReactDOM.render(<Notification {...props} />, div)
        return {
            addNotice(noticeProps) {
                notification.addNotice(noticeProps)
            },
            removeNotice(key) {
                notification.removeNotice(key)
            },
            destroy() {
                ReactDOM.unmountComponentAtNode(div)
                document.body.removeChild(div)
            }
        }
    }

    constructor() {
        super()
        this.state = { notices: [] }
    }

    getNoticeKey() {
        const { notices } = this.state
        return `notification-${new Date().getTime()}-${notices.length}`
    }

    addNotice(notice) {
        const { notices } = this.state
        const key = this.getNoticeKey()
        if (notices.every(item => item.key !== key)) {
            notices.push(notice)
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
                    notices.map((notice) => {
                        const closeCallBack = () => {
                            this.removeNotice(notice.key)
                            if (notice.onClose) notice.onClose()
                        }
                        return <Notice key={notice.key} onClose={closeCallBack} {...notice} />
                    })
                }
            </div>
        )
    }
}

export default Notification