import { observable } from 'mobx'

class UiState {
    @observable currentState = this.states.DEFAULT
    @observable viewedAlbumId = 0

    constructor() {
        this.states = {
            DEFAULT: 'default',
            USERINFO: 'user-info',
            ADDALBUM: 'add-album'
        }
    }

    changeCurrentState(state) {
        this.currentState = state
    }

    changeViewedAlbumId(albumId) {
        this.viewedAlbumId = albumId
    }
}

export default new UiState()