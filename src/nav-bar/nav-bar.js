import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import GalleryItem from './gallery-item'
import './nav-bar.css'

@inject('stores')
@observer
class NavBar extends Component {
    render() {
        const store = this.props.stores.navBarStore
        return (
            <div className="nav-bar">
                <div className="user-info">
                    <div className="avatar">
                        <img src="http://p4nfph69y.bkt.clouddn.com/2018-06-01-avatar.jpg" alt="" />
                    </div>
                    <div className="info">
                        <h4>Amanda Lorrense</h4>
                        <p>daughter, bloger, traveler</p>
                    </div>
                </div>
                <div className="add-gallery">
                    <button>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-add" />
                        </svg>
                    </button>
                </div>
                <div className="gallery-list">
                    <ul>
                        {
                            store.gallerys.map(gallery => <GalleryItem key={gallery.id} galleryInfo={gallery} />)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavBar