import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import popupCard from '../popup-card'
import Toast from '../../components/toast'
import './add-album.css'

@inject('stores')
@observer
class AddAlbum extends Component {
    constructor() {
        super()
        this.state = { title: '', description: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { target } = event
        if (target.name === 'cover') {
            const reader = new FileReader()
            reader.onload = (event1) => {
                this.setState({ [target.name]: event1.target.result })
                this.coverImage.src = event1.target.result
            }
            reader.readAsDataURL(target.files[0])
        } else {
            this.setState({ [target.name]: target.value })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const { title, description } = this.state
        if (!title || !description) {
            Toast.warning('信息填写不完整')
            return
        }
        const { closeCard, stores: { albumStore } } = this.props
        albumStore.addAlbum(this.state).then((result) => {
            if (result.status > 0) {
                Toast.success('相册创建成功')
                closeCard()
                albumStore.getAlbumList()
            }
        })
    }

    render() {
        const { title, description } = this.state
        return (
            <div className="add-album">
                <h2>新建相册</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="cover-input" className="cover-label">
                        <div className="cover">
                            <div className="img-wrapper">
                                <img src="http://localhost:8080/photo-album/api/image/album-cover-default.jpg" alt="" ref={(e) => { this.coverImage = e }} />
                            </div>
                        </div>
                        （挑一张喜欢的图片作为相册的封面吧）
                    </label>
                    <input type="file" accept="image/*" name="cover" id="cover-input" className="cover-input" onChange={this.handleChange} />
                    <input type="text" id="title" className="title" name="title" placeholder="起个名字" value={title} onChange={this.handleChange} />
                    <input type="text" id="description" className="description" name="description" placeholder="相册描述了解一下" value={description} onChange={this.handleChange} />
                    <button type="submit" className="submit" onClick={this.handleSubmit}>就这样</button>
                </form>
            </div>
        )
    }
}

export default popupCard(AddAlbum)