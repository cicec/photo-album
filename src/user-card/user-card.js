import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './user-card.css'

@inject('stores')
@observer
class UserCard extends Component {
    render() {
        return (
            <div className="user-card">
                <div className="card">
                    User Card
                </div>
            </div>
        )
    }
}

export default UserCard