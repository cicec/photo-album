import { observable } from 'mobx'

class UserStore {
    @observable user = { signed: true }

    constructor() {
        this.url = '/api'
        this.user = {
            ...this.user,
            name: 'CC',
            avatar: 'http://p4nfph69y.bkt.clouddn.com/2018-06-01-avatar.jpg',
            description: '简单介绍一下自己',
            phone: '15545562242',
            email: 'clancysong@gmail.com',
        }
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
                this.user.signed = false
            } else {
                this.user = { ...result.user, signed: true }
            }
            return result
        })
    }
}

export default new UserStore()