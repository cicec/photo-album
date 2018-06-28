import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './sign-in.css'

@inject('stores')
@observer
class SignIn extends Component {
    constructor() {
        super()
        this.state = { name: '', password: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeToSignupState = this.changeToSignupState.bind(this)
    }

    handleChange(event) {
        const { target } = event
        this.setState(...this.state, { [target.name]: target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:8080/signin', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
            .then((result) => {
                if (result.status > 0) {
                    const { uiState } = this.props.stores
                    uiState.changeCurrentState(uiState.states.signed)
                }
            })
    }

    changeToSignupState() {
        const { uiState } = this.props.stores
        uiState.changeCurrentState(uiState.states.signUp)
    }

    render() {
        return (
            <div className="sign-in">
                <form className="clearfix" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-people" />
                        </svg>
                        <input type="text" name="name" id="name" placeholder="请输入用户名" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <button className="signinBtn">登录</button>
                    <button className="signupBtn" onClick={this.changeToSignupState}>没有账号？现在注册！</button>
                </form>
            </div>
        )
    }
}

export default SignIn