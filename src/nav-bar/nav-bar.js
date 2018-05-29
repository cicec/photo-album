import React, { Component } from 'react'
import GalleryItem from './gallery-item'

class NavBar extends Component {
    render() {
        const gallerys = [
            { id: 10001, name: '人物', description: '31 June to 11 July' },
            { id: 10002, name: '风光', description: '23 May To 5 June' },
            { id: 10003, name: '纪实', description: 'May 1 to 15 May' }
        ]
        return (
            <div>
                <div className="user-info">
                    <div className="avatar">
                        <img src="./img/avatar.jpg" alt="" />
                    </div>
                    <h4>Amanda Lorrense</h4>
                    <p>daughter, bloger, traveler</p>
                </div>
                <div className="add-gallery">
                    <button>+</button>
                </div>
                <div className="gallery-list">
                    <ul>
                        {
                            gallerys.map(gallery => <GalleryItem key={gallery.id} galleryInfo={gallery} />)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavBar