import * as React from 'react'
import {Modal, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTitle} from 'react-modal-bootstrap'
import * as ReactRedux from 'react-redux'
import {connect} from 'react-redux'
import Youtubes from 'react-youtube'
import {ComponentProps, ComponentState, mapDispatchToProps, mapStateToProps} from '../redux/config'
import store from '../redux/store'
import {request} from '../request'
import BaseComponent from './shared/base-component'
import Providers = ReactRedux.Provider
import Layout from './shared/layout'
import Switchs from "react-switch"
const Switch = Switchs as any
import cookie from 'react-cookies'

const Youtube: any = Youtubes

const Provider = Providers as any

const CATEGORIES = [
    {id: 1, name: 'アニメ'},
    {id: 2, name: '邦画'},
    {id: 3, name: '洋画'}
]

interface Props extends ComponentProps {
}

interface State extends ComponentState {
    movies: Array<any>
    index: number
    noResults: boolean
}

class CinemaruCmp extends BaseComponent<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            index: null,
            noResults: false
        }

    }

    componentDidMount() {
        this.props.actions.showLoading()

        const categories = CATEGORIES.filter(category=> {
            return cookie.load(`cinemaru-${category.id}`) != 'false'
        }).map(category => category.id)
        setTimeout(()=> {
            request.get('/movies')
                   .query(categories.map(c=> `categories[]=${c}`).join('&'))
                   .end((error, res) => {
                       this.dispose(error, res, () => {
                           this.setState({
                               movies: res.body,
                               index: 0,
                               noResults: res.body.length == 0
                           }, ()=> {
                               this.props.actions.hideLoading()
                           })
                       })
                   })
        }, 2000)
    }

    next() {
        const newIndex = this.state.index + 1
        this.setState({
            index: newIndex == this.state.movies.length ? 0 : newIndex
        })
    }

    prev() {
        this.setState({
            index: this.state.index == 0 ? this.state.movies.length - 1 : this.state.index - 1
        })
    }

    showInquiry() {
        this.props.actions.showDialog({content: <div>
            <Layout align="center center" className="mt-3" direction="column">
                <h4>
                    ご意見・ご要望ありましたらこちらまで
                </h4>
                <div>
                    ※ 別画面へ遷移します。
                </div>
                <a className="btn btn-dark depth-1 mt-3"
                   href="https://goo.gl/forms/mTQ1yxp6K7PA7MZw2"
                   target="_blank"
                   onClick={()=> this.props.actions.hideDialog()}>
                    お問い合わせ
                </a>
            </Layout>
        </div>})
    }

    filter() {
        this.props.actions.showDialog({content: <div>
            <Layout align="center center">
            {
                CATEGORIES.map((category, index) => <Layout key={index} align="center center" className="mx-2">
                        <span style={{width: 60}}>{category.name}</span>
                        <Switch
                            checked={cookie.load(`cinemaru-${category.id}`) != 'false' }
                            onChange={checked=> cookie.save(`cinemaru-${category.id}`, checked)}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                        />
                </Layout>)
            }
            </Layout>
            <Layout align="center center" className="mt-3">
                <button type="button" className="btn btn-dark depth-1 mt-3" onClick={()=> window.location.reload()}>すぐ反映する</button>
            </Layout>
        </div>})
    }

    get filterElement() {
        return <div className="player-navigation-right">
            <Layout align="center center">
                {/*TODO: データ整合取り次第開放*/}
                {/*<button type="button" className="btn mx-1 py-0 px-1 btn-link white" onClick={()=> this.filter()}>*/}
                    {/*<i className="mi mi-filter-list mi-36" />*/}
                {/*</button>*/}
                <button type="button" className="btn mx-1 py-0 px-1 btn-link white" onClick={()=> this.showInquiry()}>
                    <i className="mi mi-mail mi-36" />
                </button>
            </Layout>
        </div>
    }

    render() {
        const movie = this.state.movies[this.state.index]
        return (
            movie ?
                <div>
                    <Youtube
                        videoId={movie.video_id}
                        opts={
                            {
                                width: `${window.innerWidth}px`,
                                height: `${window.innerHeight - 56}px`,
                                playerVars: {
                                    autoplay: 1,
                                    showinfo: 0,
                                    rel: 0,
                                    modestbranding: 1
                                }
                            }
                        }
                        onEnd={() => this.next()}
                        onError={()=> this.next()}
                    >
                    </Youtube>
                    <div className="player-navigation">
                        <Layout align="center center">
                            <button type="button" className="btn mx-1 py-0 px-1 btn-link white" onClick={()=> this.prev()}>
                                <i className="mi mi-skip-previous mi-36" style={{top: 3}}/>
                            </button>
                            <button type="button" className="btn mx-1 py-0 px-1 btn-link white" onClick={()=> this.next()}>
                                <i className="mi mi-skip-next mi-36" style={{top: 3}}/>
                            </button>
                        </Layout>
                    </div>
                    {
                        this.filterElement
                    }
                </div>
                :
                this.state.noResults ?
                    <h3 className="white">
                        結果がありませんでした...
                        絞り込みすぎぃ！
                        {
                            this.filterElement
                        }
                    </h3>
                    :
                    <div></div>
        )
    }
}

const CinemaruComponent: any = connect<{}, {}, Props>(mapStateToProps, mapDispatchToProps)(CinemaruCmp)

export default class Cinemaru extends React.Component<Props, {}> {
    render() {
        return (
            <Provider store={store}>
                <CinemaruComponent/>
            </Provider>
        );
    }
}