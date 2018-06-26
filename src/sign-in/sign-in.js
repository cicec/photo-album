import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './sign-in.css'

@inject('stores')
@observer
class SignIn extends Component {
    constructor() {
        super()
        this.signIn = this.signIn.bind(this)
    }

    signIn() {
        const { uiState } = this.props.stores
        uiState.changeCurrentState(uiState.states.signed)
    }
    render() {
        return (
            <div className="sign-in">
                <form>
                    <label htmlFor="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-people" />
                        </svg>
                        <input type="text" name="username" id="username" placeholder="请输入邮箱或手机号" />
                    </label>
                    <label htmlFor="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码" />
                    </label>
                    <button>登录</button>
                </form>
            </div>
        )
    }
}

export default SignIn