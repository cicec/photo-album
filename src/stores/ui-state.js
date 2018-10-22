import { observable } from 'mobx'

class UiState {
    @observable currentState = this.states.DEFAULT
    @observable viewedAlbumId = 0
    @observable viewedPhotoId = 0

    constructor() {
        this.states = {
            DEFAULT: 'default',
            USERINFO: 'user-info',
            ADDALBUM: 'add-album',
            VIEWDETAILS: 'view-details'
        }
    }

    changeCurrentState(state) {
        this.currentState = state
    }

    changeViewedAlbumId(id) {
        this.viewedAlbumId = id
    }

    changeViewedPhotoId(id) {
        this.viewedPhotoId = id
    }
}

export default new UiState()