import { observable } from 'mobx'

class AlbumStore {
    @observable albums = []

    constructor() {
        this.albums = [
            { id: 10001, name: '人物', description: '31 June to 11 July', number: 234, cover: 'http://p4nfph69y.bkt.clouddn.com/2.jpg' },
            { id: 10002, name: '风光', description: '23 May To 5 June', number: 12, cover: 'http://p4nfph69y.bkt.clouddn.com/2.jpg' },
            { id: 10003, name: '纪实', description: 'May 1 to 15 May', number: 198, cover: 'http://p4nfph69y.bkt.clouddn.com/2.jpg' }
        ]
    }
}

export default new AlbumStore()