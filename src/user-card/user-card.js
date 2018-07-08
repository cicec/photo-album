import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './user-card.css'

@inject('stores')
@observer
class UserCard extends Component {
    constructor() {
        super()
        this.state = { avatar: '' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
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

    render() {
        const user = this.props.stores.userStore.userInfo
        return (
            <div className="user-card">
                <div className="card">
                    <input type="file" name="avatar" accept="image/*" onChange={this.handleChange} />
                    <div className="avatar">
                        <img src="http://p4nfph69y.bkt.clouddn.com/2018-06-01-avatar.jpg" alt="" />
                    </div>
                    <h2 className="name">{user.name}</h2>
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
                    </p>
                </div>
            </div>
        )
    }
}

export default UserCard