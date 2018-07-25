import { observable } from 'mobx'
import config from './config.json'

class AlbumStore {
    @observable albums = []
    url = config.apiUrl

    submitAlbumInfo(path, info) {
        return fetch(`${this.url}${path}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }).then(response => response.json())
    }

    getAlbumList() {
        return fetch(`${this.url}/getalbumlist`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
            .then((result) => {
                if (result.status > 0) {
                    this.albums = result.albumList
                }
                return result
            })
    }

    addAlbum(info) {
        return this.submitAlbumInfo('/addalbum', info)
    }

    removeAlbum(info) {
        return this.submitAlbumInfo('/removealbum', info)
    }

    getAlbumForId(id) {
        return this.albums.filter(album => album.id === id)[0]
    }
}

export default new AlbumStore()