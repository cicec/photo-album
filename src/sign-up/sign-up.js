import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './sign-up.css'

@inject('stores')
@observer
class SignUp extends Component {
    constructor() {
        super()
        this.changeToSigninState = this.changeToSigninState.bind(this)
    }

    changeToSigninState() {
        const { uiState } = this.props.stores
        uiState.changeCurrentState(uiState.states.signIn)
    }

    render() {
        return (
            <div className="sign-up">
                <form className="clearfix">
                    <label htmlFor="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-people" />
                        </svg>
                        <input type="text" name="username" id="username" placeholder="请输入用户名" />
                    </label>
                    <label htmlFor="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码（不少于6位）" />
                    </label>
                    <label htmlFor="phone">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobilephone" />
                        </svg>
                        <input type="text" name="phone" id="phone" placeholder="请输入手机号（可选）" />
                    </label>
                    <label htmlFor="email">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mail" />
                        </svg>
                        <input type="text" name="email" id="email" placeholder="请输入邮箱（可选）" />
                    </label>
                    <button className="signupBtn">注册</button>
                    <button className="signinBtn" onClick={this.changeToSigninState}>已有账号？马上登录！</button>
                </form>
            </div>
        )
    }
}

export default SignUp