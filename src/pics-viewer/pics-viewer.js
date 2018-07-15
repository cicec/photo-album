import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './pics-viewer.css'

@inject('stores')
@observer
class PicsViewer extends Component {
    render() {
        return (
            <div className="pics-viewer">
                <div className="header">
                    <h2>人物</h2>
                    <button type="button">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-cloud-upload" />
                        </svg>
                    </button>
                </div>
                <div className="imgs">
                    <ul>
                        <li>
                            <img src="http://p4nfph69y.bkt.clouddn.com/2.jpg" alt="" />
                        </li>
                        <li>
                            <img src="http://p4nfph69y.bkt.clouddn.com/2.jpg" alt="" />
                        </li>
                        <li>
                            <img src="http://p4nfph69y.bkt.clouddn.com/2.jpg" alt="" />
                        </li>
                        <li>
                            <img src="http://p4nfph69y.bkt.clouddn.com/2.jpg" alt="" />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default PicsViewer