import { observable } from 'mobx'
import config from './config.json'

class UserStore {
    @observable user = { signed: true }
    url = config.apiUrl

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

    signOut() {
        return fetch(`${this.url}/signout`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
    }

    getUserInfo() {
        return fetch(`${this.url}/getuserinfo`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json()).then((result) => {
            if (result.status === 0) {
                this.user.signed = false
            } else {
                this.user = { ...result.user, signed: true }
            }
            return result
        })
    }

    modifyUserInfo(info) {
        return this.submitUserInfo('/modifyuserinfo', info).then((result) => {
            if (result.status > 0) {
                this.user = result.user
            }
            return result
        })
    }
}

export default new UserStore()