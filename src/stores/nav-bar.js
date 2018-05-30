import { observable } from 'mobx'

class NavBarStore {
    @observable gallerys = []

    constructor() {
        this.gallerys = [
            { id: 10001, name: '人物', description: '31 June to 11 July' },
            { id: 10002, name: '风光', description: '23 May To 5 June' },
            { id: 10003, name: '纪实', description: 'May 1 to 15 May' }
        ]
    }
}

export default new NavBarStore()