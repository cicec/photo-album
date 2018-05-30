import React, { Component } from 'react'
import { observer } from 'mobx-react'
import GalleryItem from './gallery-item'

@observer
class NavBar extends Component {
    render() {
        const { gallerys } = this.props.store
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