import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './user-card.css'

@inject('stores')
@observer
class UserCard extends Component {
    constructor() {
        super()
        this.state = { isChanged: false, avatar: '', name: '', desription: '', phone: '', email: '' }
        this.handleChange = this.handleChange.bind(this)
        this.closeCard = this.closeCard.bind(this)
    }

    componentWillMount() {
        const { user } = this.props.stores.userStore
        this.setState({
            ...this.state,
            name: user.name,
            desription: user.description,
            phone: user.phone,
            email: user.email
        })
    }

    handleChange(event) {
        const { target } = event
        if (target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = (event1) => {
                this.setState({ ...this.state, [target.name]: event1.target.result, isChanged: true })
            }
            reader.readAsDataURL(target.files[0])
        } else {
            this.setState({ ...this.state, [target.name]: target.value, isChanged: true })
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
        const { uiState } = this.props.stores
        uiState.changeCurrentState(uiState.states.DEFAULT)
    }

    render() {
        return (
            <div className="user-card">
                <div className="card">
                    <button className="close" onClick={this.closeCard}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                    <label htmlFor="avatar-input" className="avatar-label">
                        <div className="avatar">
                            <img src={this.props.stores.userStore.user.avatar} alt="" />
                        </div>
                    </label>
                    <input type="file" accept="image/*" name="avatar" id="avatar-input" className="avatar-input" onChange={this.handleChange} />
                    <input type="text" className="name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <textarea rows="3" maxLength="40" type="text" className="desription" name="desription" value={this.state.desription} onChange={this.handleChange} onKeyDown={this.checkEnter} />
                    <label htmlFor="phone" className="phone-label">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobile" />
                        </svg>
                        <input type="text" className="phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="email" className="email-label">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mail" />
                        </svg>
                        <input type="text" className="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    {this.state.isChanged ? <button className="save">保存</button> : ''}
                </div>
            </div>
        )
    }
}

export default UserCard