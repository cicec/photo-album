import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './user-card.css'

@inject('stores')
@observer
class UserCard extends Component {
    constructor() {
        super()
        this.state = { isChanged: false, userInfo: {} }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeCard = this.closeCard.bind(this)
    }

    handleChange(event) {
        const { target } = event
        const { userInfo } = this.state
        if (target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = (event1) => {
                this.setState({ isChanged: true, userInfo: { ...userInfo, [target.name]: event1.target.result } })
            }
            reader.readAsDataURL(target.files[0])
            console.log(target.files[0])
        } else {
            this.setState({ isChanged: true, userInfo: { ...userInfo, [target.name]: target.value } })
        }
    }

    checkEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
        }
    }

    handleSubmit() {
        const { stores: { userStore } } = this.props
        const { userInfo } = this.state
        userStore.modifyUserInfo(userInfo).then((result) => {
            console.log(result)
        })
    }

    closeCard() {
        const { stores: { uiState } } = this.props
        uiState.changeCurrentState(uiState.states.DEFAULT)
    }

    render() {
        const { isChanged } = this.state
        const { stores: { userStore: { user: { avatar, name, description, phone, email } } } } = this.props
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
                            <img src={avatar} alt="" />
                        </div>
                    </label>
                    <input type="file" accept="image/*" name="avatar" id="avatar-input" className="avatar-input" onChange={this.handleChange} />
                    <input type="text" className="name" name="name" defaultValue={name} onChange={this.handleChange} />
                    <textarea rows="3" maxLength="40" type="text" className="description" name="description" defaultValue={description} onChange={this.handleChange} onKeyDown={this.checkEnter} />
                    <label htmlFor="phone" className="phone-label">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobile" />
                        </svg>
                        <input type="text" className="phone" name="phone" defaultValue={phone} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="email" className="email-label">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mail" />
                        </svg>
                        <input type="text" className="email" name="email" defaultValue={email} onChange={this.handleChange} />
                    </label>
                    {isChanged ? <button type="button" className="save" onClick={this.handleSubmit}>保存</button> : ''}
                </div>
            </div>
        )
    }
}

export default UserCard