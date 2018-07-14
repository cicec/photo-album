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
        this.jumpToSignInPage = this.jumpToSignInPage.bind(this)
    }

    handleChange(event) {
        const { target } = event
        this.setState({ [target.name]: target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { name, password } = this.state
        if (!name || !password) return
        const { stores: { userStore } } = this.props
        userStore.signUp(this.state).then((result) => {
            console.log(result)
        })
    }

    jumpToSignInPage() {
        const { history } = this.props
        history.push('/signin')
    }

    render() {
        const { name, password, phone, email } = this.state
        return (
            <div className="sign-up">
                <form className="clearfix" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-user" />
                        </svg>
                        <input type="text" name="name" id="name" placeholder="请输入用户名" value={name} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码（不少于6位）" value={password} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="phone">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mobile" />
                        </svg>
                        <input type="text" name="phone" id="phone" placeholder="请输入手机号（可选）" value={phone} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="email">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-mail" />
                        </svg>
                        <input type="text" name="email" id="email" placeholder="请输入邮箱（可选）" value={email} onChange={this.handleChange} />
                    </label>
                    <button type="submit" className="signupBtn">注册</button>
                    <button type="button" className="signinBtn" onClick={this.jumpToSignInPage}>已有账号？马上登录！</button>
                </form>
            </div>
        )
    }
}

export default SignUp