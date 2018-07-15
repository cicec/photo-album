import { observable } from 'mobx'

class PhotoStore {
    url = 'http://localhost:8080/photo-album/api'

    @observable photos = []

    getPhotoList(albumId) {
        return fetch(`${this.url}/getphotolist/${albumId}`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then((result) => {
                if (result.status > 0) {
                    this.photos = result.photoList
                }
                return result
            })
    }

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