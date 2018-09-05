import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Toast from '../components/toast'
import './sign-up.css'

@inject('stores')
@observer
class SignUp extends Component {
    constructor() {
        super()
        this.state = { submitting: false, userInfo: { name: '', password: '', phone: '', email: '' } }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.jumpToSignInPage = this.jumpToSignInPage.bind(this)
    }

    getSignUpBtnContent() {
        const { submitting } = this.state
        if (submitting) {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-loading" />
                </svg>
            )
        }
        return <span>注册</span>
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
            } else if (password.length < 6) {
                Toast.warning('请至少输入6位密码')
            } else {
                this.setState({ submitting: true })
                const { stores: { userStore } } = this.props
                const { userInfo } = this.state
                userStore.signUp(userInfo).then((result) => {
                    this.setState({ submitting: false })
                    if (result.status > 0) {
                        Toast.success('注册成功，赶快登录吧')
                        const { history } = this.props
                        history.push('/signin')
                    } else {
                        Toast.error('用户名已被占用')
                    }
                })
            }
        }
    }

    jumpToSignInPage() {
        const { history } = this.props
        history.push('/signin')
    }

    render() {
        const { userInfo: { name, password, phone, email } } = this.state
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
                    <button type="submit" className="sign-up-btn">
                        {this.getSignUpBtnContent()}
                    </button>
                    <button type="button" className="sign-in-btn" onClick={this.jumpToSignInPage}>已有账号？马上登录！</button>
                </form>
            </div>
        )
    }
}

export default SignUp