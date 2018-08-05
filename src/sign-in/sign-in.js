import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Toast from '../toast'
import './sign-in.css'

@inject('stores')
@observer
class SignIn extends Component {
    constructor() {
        super()
        this.state = { submitting: false, userInfo: { name: '', password: '' } }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.jumpToSignUpPage = this.jumpToSignUpPage.bind(this)
    }

    handleChange(event) {
        const { target } = event
        const { userInfo } = this.state
        this.setState({ userInfo: { ...userInfo, [target.name]: target.value } })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { submitting } = this.state
        if (!submitting) {
            const { userInfo: { name, password } } = this.state
            if (!name || !password) {
                if (!name) {
                    Toast.warning('请输入用户名')
                } else if (!password) {
                    Toast.warning('请输入密码')
                }
            } else {
                this.setState({ submitting: true })
                const { stores: { userStore } } = this.props
                const { userInfo } = this.state
                userStore.signIn(userInfo).then((result) => {
                    this.setState({ submitting: false })
                    if (result.status > 0) {
                        Toast.success('登录成功！')
                        const { history } = this.props
                        history.push('/')
                    } else {
                        Toast.error(result.message)
                    }
                })
            }
        }
    }

    jumpToSignUpPage() {
        const { history } = this.props
        history.push('/signup')
    }

    render() {
        const { userInfo: { name, password } } = this.state
        return (
            <div className="sign-in">
                <form className="clearfix" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-user" />
                        </svg>
                        <input type="text" name="name" id="name" placeholder="请输入用户名" value={name} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码" value={password} onChange={this.handleChange} />
                    </label>
                    <button type="submit" className="signinBtn">登录</button>
                    <button type="button" className="signupBtn" onClick={this.jumpToSignUpPage}>没有账号？现在注册！</button>
                </form>
            </div>
        )
    }
}

export default SignIn