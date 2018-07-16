import uiState from './ui-state'
import userStore from './user'
import albumStore from './album'
import photoStore from './photo'

const stores = {
    uiState,
    userStore,
    albumStore,
    photoStore,
    initStore() {
        albumStore.getAlbumList().then((result) => {
            if (result && result.albumList && result.albumList.length > 0) {
                const viewedAlbum = result.albumList[0]
                uiState.changeViewedAlbumId(viewedAlbum.id)
                photoStore.getPhotoList(uiState.viewedAlbumId)
            }
        })
    }
}

export default stores