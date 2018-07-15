import { observable } from 'mobx'

class PhotoStore {
    url = 'http://localhost:8080/photo-album/api'

    @observable albums = []

    addPhoto(photo) {
        return fetch(`${this.url}/addphoto`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(photo),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
    }
}

export default new PhotoStore()