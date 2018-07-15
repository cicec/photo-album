import { observable } from 'mobx'

class UiState {
    @observable currentState = this.states.DEFAULT
    @observable viewedAlbum = null

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

    changeViewedAlbum(album) {
        this.viewedAlbum = album
    }
}

export default new UiState()