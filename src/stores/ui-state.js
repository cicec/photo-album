import { observable, action } from 'mobx'

class UiState {
    @observable currentState = this.states.DEFAULT
    @observable viewedGallery = 0

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
    changeViewedGallery(galleryId) {
        this.viewedGallery = galleryId
    }
}

export default new UiState()