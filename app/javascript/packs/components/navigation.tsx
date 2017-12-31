import * as React from 'react'
import {Modal, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTitle} from 'react-modal-bootstrap'
import * as ReactRedux from 'react-redux'
import {connect} from 'react-redux'
import {ComponentProps, ComponentState, mapDispatchToProps, mapStateToProps} from '../redux/config'
import store from '../redux/store'
import BaseComponent from './shared/base-component'
import Layout from './shared/layout'
import Providers = ReactRedux.Provider
import Loading from './shared/loading'

const Provider = Providers as any

interface Props extends ComponentProps {
    message: string
    alert: string
    user: any
    authenticityToken: string
}

interface State extends ComponentState {
}

class NavigationCmp extends BaseComponent<Props, State> {

    constructor(props) {
        super(props)
        this.state = {}

        if (this.props.user) {
            this.props.actions.setUser(this.props.user)
        }
        if (this.props.message) {
            this.props.actions.showMessage(this.props.message)
        }
        if (this.props.alert) {
            this.props.actions.showAlert({message: this.props.alert})
        }
        this.props.actions.setAuthenticityToken(this.props.authenticityToken)
    }

    componentDidMount() {
    }

    handleCloseConfirm(result: boolean) {
        if (this.props.global.confirm.onClose) {
            this.props.global.confirm.onClose(result)
        }
        this.props.actions.hideConfirm()
    }

    handleCloseAlert() {
        if (this.props.global.alert.onClose) {
            this.props.global.alert.onClose()
        }
        this.props.actions.hideAlert()
    }

    handleCloseErrorMessage() {
        this.props.actions.hideErrorMessage()
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-bottom navbar-expand-lg navbar-dark bg-black" style={{height: 56}}>
                    <a className="navbar-brand" href="/">Cinemaru</a>
                </nav>
                {
                    (this.props.global.dialog.values || []).map((dialog, index) =>
                        <Modal key={index} isOpen={true} onRequestHide={() => this.props.actions.hideDialog()}
                               className="dynamic-dialog">
                            <div className="text-right px-2">
                                <ModalClose onClick={() => this.props.actions.hideDialog()}/>
                            </div>
                            <ModalBody>
                                {dialog.content}
                            </ModalBody>
                            {
                                dialog.actions ?
                                    <ModalFooter>
                                        {dialog.actions}
                                    </ModalFooter>
                                    :
                                    ''
                            }
                        </Modal>
                    )
                }

                <Modal isOpen={this.props.global.confirm.show} onRequestHide={() => this.handleCloseConfirm(false)}>
                    <ModalHeader>
                        <ModalClose onClick={() => this.handleCloseConfirm(false)}/>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.global.confirm.content}
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-secondary' onClick={() => this.handleCloseConfirm(false)}>
                            Cancel
                        </button>
                        <button className='btn btn-primary' onClick={() => this.handleCloseConfirm(true)}>
                            OK
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.props.global.alert.show} onRequestHide={() => this.handleCloseAlert()}>
                    <ModalBody>
                        <ModalClose onClick={() => this.handleCloseAlert()}/>
                        {this.props.global.alert.message}
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-secondary' onClick={() => this.handleCloseAlert()}>
                            Close
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.props.global.errorMessage.show}
                       onRequestHide={() => this.handleCloseErrorMessage()}>
                    <ModalHeader>
                        エラーです
                        <ModalClose onClick={() => this.handleCloseErrorMessage()}/>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            {this.props.global.errorMessage.value}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-secondary' onClick={() => this.handleCloseErrorMessage()}>
                            Close
                        </button>
                    </ModalFooter>
                </Modal>

                <Loading/>
            </div>
        )
    }
}

const NavigationComponent: any = connect<{}, {}, Props>(mapStateToProps, mapDispatchToProps)(NavigationCmp)

export default class Navigation extends React.Component<Props, {}> {
    render() {
        return (
            <Provider store={store}>
                <NavigationComponent message={this.props.message}
                                     alert={this.props.alert}
                                     user={this.props.user}
                                     authenticityToken={this.props.authenticityToken}/>
            </Provider>
        );
    }
}