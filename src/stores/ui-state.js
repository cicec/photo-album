import { observable, action } from 'mobx'

class UiState {
    states = {
        signIn: 'sign-in',
        signUp: 'sign-up',
        signed: 'signed'
    }

    @observable currentState = this.states.signIn
    @observable viewedGallery = 0

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