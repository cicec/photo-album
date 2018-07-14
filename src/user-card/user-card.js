import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './user-card.css'

@inject('stores')
@observer
class UserCard extends Component {
    constructor() {
        super()
        this.state = { isChanged: false, name: '', description: '', phone: '', email: '' }
        this.handleChange = this.handleChange.bind(this)
        this.closeCard = this.closeCard.bind(this)
    }

    componentWillMount() {
        const { stores: { userStore: { user } } } = this.props
        this.setState({
            name: user.name,
            description: user.description,
            phone: user.phone,
            email: user.email
        })
    }

    handleChange(event) {
        const { target } = event
        if (target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = (event1) => {
                this.setState({ [target.name]: event1.target.result, isChanged: true })
            }
            reader.readAsDataURL(target.files[0])
        } else {
            this.setState({ [target.name]: target.value, isChanged: true })
        }
    }

    checkEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            event.returnValues = false
        }
    }

    handleSubmit() {
        fetch(`${this.url}/updateuserinfo`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json()).then((result) => {
            if (result.status === 0) {
                this.user.signed = false
            } else {
                this.user = { ...result.user, signed: true }
                this.user.avatar = 'http://p4nfph69y.bkt.clouddn.com/2018-06-01-avatar.jpg'
            }
            return result
        })
    }

    closeCard() {
        const { stores: { uiState } } = this.props
        uiState.changeCurrentState(uiState.states.DEFAULT)
    }

    render() {
        const { isChanged, name, description, phone, email } = this.state
        const { stores: { userStore } } = this.props
        return (
            <div className="user-card">
                <div className="card">
                    <button type="button" className="close" onClick={this.closeCard}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                    <label htmlFor="avatar-input" className="avatar-label">
                        <div className="avatar">
                            <img src={userStore.user.avatar} alt="" />
                        </div>
                    </label>
                    <input type="file" accept="image/*" name="avatar" id="avatar-input" className="avatar-input" onChange={this.handleChange} />
                    <input type="text" className="name" name="name" value={name} onChange={this.handleChange} />
                    <textarea rows="3" maxLength="40" type="text" className="desription" name="desription" value={description} onChange={this.handleChange} onKeyDown={this.checkEnter} />
                    <label htmlFor="phone" className="phone-label">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobile" />
                        </svg>
                        <input type="text" className="phone" name="phone" value={phone} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="email" className="email-label">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mail" />
                        </svg>
                        <input type="text" className="email" name="email" value={email} onChange={this.handleChange} />
                    </label>
                    {isChanged ? <button type="button" className="save">保存</button> : ''}
                </div>
            </div>
        )
    }
}

export default UserCard