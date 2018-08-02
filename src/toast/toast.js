import React from 'react'
import ReactDOM from 'react-dom'
import Notification from './notification'
import './toast.css'

function createNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const notification = ReactDOM.render(<Notification />, div)
    return {
        addNotice(notice) {
            notification.addNotice(notice)
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

let notification
const notice = (type, content, duration = 3000, onClose) => {
    if (!notification) notification = createNotification()
    notification.addNotice({ type, content, duration, onClose })
}

export default {
    info(content, duration, onClose) {
        return notice('info', content, duration, onClose)
    },
    success(content, duration, onClose) {
        return notice('success', content, duration, onClose)
    },
    warning(content, duration, onClose) {
        return notice('warning', content, duration, onClose)
    },
    error(content, duration, onClose) {
        return notice('error', content, duration, onClose)
    }
}