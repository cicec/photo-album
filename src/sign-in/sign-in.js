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
                <form className="clearfix">
                    <label htmlFor="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-people" />
                        </svg>
                        <input type="text" name="username" id="username" placeholder="请输入邮箱或手机号" />
                    </label>
                    <label htmlFor="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码" />
                    </label>
                    <button className="signinBtn">登录</button>
                    <button className="signupBtn">没有账号？马上注册！</button>
                </form>
            </div>
        )
    }
}

export default SignIn