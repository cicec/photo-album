import { observable, action } from 'mobx'

class UiState {
    @observable currentState = this.states.DEFAULT
    @observable viewedAlbum = 0

    constructor() {
        this.states = {
            DEFAULT: 'default',
            USERINFO: 'user-info',
            ADDALBUM: 'add-album'
        }
    }

    @action
    changeCurrentState(state) {
        this.currentState = state
    }

    @action
    changeViewedAlbum(albumId) {
        this.viewedAlbum = albumId
    }
}

export default new UiState()