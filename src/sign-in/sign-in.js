import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './sign-in.css'

@inject('stores')
@observer
class SignIn extends Component {
    constructor() {
        super()
        this.changeToSignupState = this.changeToSignupState.bind(this)
    }

    changeToSignupState() {
        const { uiState } = this.props.stores
        uiState.changeCurrentState(uiState.states.signUp)
    }

    render() {
        return (
            <div className="sign-in">
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
                        <input type="password" name="password" id="password" placeholder="请输入密码" />
                    </label>
                    <button className="signinBtn">登录</button>
                    <button className="signupBtn" onClick={this.changeToSignupState}>没有账号？现在注册！</button>
                </form>
            </div>
        )
    }
}

export default SignIn