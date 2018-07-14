import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './add-album.css'

@inject('stores')
@observer
class AddAlbum extends Component {
    render() {
        return (
            <div className="add-album">
                <div className="card">
                    <button type="button" className="close" onClick={this.closeCard}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                    <h2>新建相册</h2>
                    <label htmlFor="cover-input" className="cover-label">
                        <div className="cover">
                            <img src="http://localhost:8080/photo-album/api/image/album-cover-default.jpg" alt="" ref={(e) => { this.avatarImage = e }} />
                        </div>
                        （挑一张喜欢的图片作为相册的封面吧）
                    </label>
                    <input type="file" accept="image/*" name="avatar" id="cover-input" className="cover-input" onChange={this.handleChange} />
                    <input type="text" id="title" className="title" name="title" placeholder="起个名字" />
                    <input type="text" id="title" className="title" name="title" placeholder="相册描述了解一下" />
                    <button type="button" className="submit" onClick={this.handleSubmit}>就这样</button>
                </div>
            </div>
        )
    }
}

export default AddAlbum