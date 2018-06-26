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
        console.log(2)
        const { uiState } = this.props.stores
        uiState.changeCurrentState(uiState.states.signed)
    }
    render() {
        return (
            <div className="sign-in">
                登录组件
                <button onClick={this.signIn}>登录</button>
            </div>
        )
    }
}

export default SignIn