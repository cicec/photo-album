import { observable, action } from 'mobx'

class UserStore {
    @observable signedUser = {}

    @action
    submitSigninInfo(info) {
        return fetch('http://localhost:8080/signin', {
            method: 'POST',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
    }
}

export default new UserStore()