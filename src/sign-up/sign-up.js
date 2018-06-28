import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './sign-up.css'

@inject('stores')
@observer
class SignUp extends Component {
    constructor() {
        super()
        this.state = { name: '', password: '', phone: '', email: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeToSigninState = this.changeToSigninState.bind(this)
    }

    handleChange(event) {
        const { target } = event
        this.setState(...this.state, { [target.name]: target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
            .then((result) => {
                console.log(result)
            })
    }

    changeToSigninState() {
        const { uiState } = this.props.stores
        uiState.changeCurrentState(uiState.states.signIn)
    }

    render() {
        return (
            <div className="sign-up">
                <form className="clearfix">
                    <label htmlFor="name">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-people" />
                        </svg>
                        <input type="text" name="name" id="name" placeholder="请输入用户名" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码（不少于6位）" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="phone">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobilephone" />
                        </svg>
                        <input type="text" name="phone" id="phone" placeholder="请输入手机号（可选）" value={this.state.phone} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="email">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mail" />
                        </svg>
                        <input type="text" name="email" id="email" placeholder="请输入邮箱（可选）" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <button className="signupBtn">注册</button>
                    <button className="signinBtn" onClick={this.changeToSigninState}>已有账号？马上登录！</button>
                </form>
            </div>
        )
    }
}

export default SignUp