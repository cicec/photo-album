class UserStore {
    constructor() {
        this.url = 'http://localhost:8080'
    }

    submitUserInfo(path, info) {
        return fetch(`${this.url}${path}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
    }
}

export default new UserStore()