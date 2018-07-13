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
            avatar: user.avatar,
            name: user.name,
            desription: user.description,
            phone: user.phone,
            email: user.email
        })
    }

    handleChange(event) {
        if (!this.state.isChanged) this.setState({ ...this.state, isChanged: true })
        const { target } = event
        if (target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = (event1) => {
                this.setState({ ...this.state, [target.name]: event1.target.result })
            }
            reader.readAsDataURL(target.files[0])
        } else {
            this.setState({ ...this.state, [target.name]: target.value })
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
                    {/* <form onSubmit={this.handleSubmit}>
                        <input type="file" accept="image/*" />
                    </form> */}
                    <button className="close" onClick={this.closeCard}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                    <div className="avatar">
                        <img src={this.state.avatar} alt="" />
                    </div>
                    {/* <h2 className="name">{user.name}</h2>
                    <p className="desription">{user.description}</p>
                    <p className="phone">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobile" />
                        </svg>
                        {user.phone}
                    </p>
                    <p className="email">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mail" />
                        </svg>
                        {user.email}
                    </p> */}
                    <input type="text" className="name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <textarea rows="3" maxLength="40" type="text" className="desription" name="desription" value={this.state.desription} onChange={this.handleChange} />
                    <label htmlFor="phone">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobile" />
                        </svg>
                        <input type="text" className="phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="email">
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