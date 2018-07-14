import { observable } from 'mobx'

class AlbumStore {
    @observable albums = []

    constructor() {
        this.url = 'http://localhost:8080/photo-album/api'
    }

    getAlbumList() {
        return fetch(`${this.url}/getalbumlist`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then((result) => {
                console.log(result)
            })
    }

    addAlbum(info) {
        return fetch(`${this.url}/addalbum`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
    }
}

export default new AlbumStore()