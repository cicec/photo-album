import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './index.css'

@inject('stores')
@observer
class Admin extends Component {
    componentDidMount() {
        const { stores: { userStore } } = this.props
        userStore.getAllUserInfo()
    }

    render() {
        const { stores: { userStore: { allUserInfo } } } = this.props
        return (
            <div className="admin">
                <main>
                    <div className="side-nav-bar">
                        <ul>
                            <li>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-user" />
                                </svg>
                            </li>
                        </ul>
                    </div>

                    <div className="content">
                        <ul className="user-list">
                            {
                                allUserInfo.map(user => (
                                    <li key={user.id}>
                                        <img src={user.avatar} alt="" />
                                        <h2>{user.name}</h2>
                                        <p>
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref="#icon-folder-fill" />
                                            </svg>
                                            {user.albumNumber}
                                        </p>
                                        <p>
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref="#icon-image-fill" />
                                            </svg>
                                            {user.photoNumber}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </main>
            </div>
        )
    }
}

export default Admin