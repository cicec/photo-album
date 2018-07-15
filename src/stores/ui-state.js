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

    changeViewedAlbumId(id) {
        this.viewedAlbumId = id
    }
}

export default new UiState()