import { observable } from 'mobx'
import config from './config.json'

class PhotoStore {
    @observable photos = []
    url = config.apiUrl

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

    submitPhotoInfo(path, info) {
        return fetch(`${this.url}${path}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
    }

    addPhoto(photo) {
        return this.submitPhotoInfo('/addphoto', photo)
    }

    removePhoto(photo) {
        return this.submitPhotoInfo('/removephoto', photo)
    }
}

export default new PhotoStore()