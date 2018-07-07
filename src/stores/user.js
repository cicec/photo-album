import { observable } from 'mobx'

class UserStore {
    @observable userInfo = { isSigned: true }

    constructor() {
        this.url = 'http://localhost:8080'
    }

    submitUserInfo(path, info) {
        return fetch(`${this.url}${path}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
    }

    signIn(info) {
        return this.submitUserInfo('/signin', info)
    }

    signUp(info) {
        return this.submitUserInfo('/signup', info)
    }

    getUserInfo() {
        return fetch(`${this.url}/getuserinfo`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json()).then((result) => {
            if (result.status === 0) {
                this.userInfo.isSigned = false
            } else {
                this.userInfo.isSigned = true
            }
            return result
        })
    }
}

export default new UserStore()