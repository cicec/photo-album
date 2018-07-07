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
        this.setState(...this.state, { [target.name]: target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        if (!this.state.name || !this.state.password) return
        const store = this.props.stores.userStore
        store.signUp(this.state).then((result) => {
            console.log(result)
        })
    }

    jumpToSignInPage() {
        this.props.history.push('/signin')
    }

    render() {
        return (
            <div className="sign-up">
                <form className="clearfix" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-user" />
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
                            <use xlinkHref="#icon-mobile" />
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
                    <button className="signinBtn" onClick={this.jumpToSignInPage}>已有账号？马上登录！</button>
                </form>
            </div>
        )
    }
}

export default SignUp