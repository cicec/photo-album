import { observable, action } from 'mobx'

class UiState {
    @observable viewedGallery = 0

    @action
    changeViewedGallery(galleryId) {
        this.viewedGallery = galleryId
    }
}

export default new UiState()