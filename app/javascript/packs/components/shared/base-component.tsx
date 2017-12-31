import * as React from 'react'
import * as _ from 'underscore'
import {ComponentProps, ComponentState} from '../../redux/config'

export default class BaseComponent<P extends ComponentProps, S extends ComponentState> extends React.Component<P, S> {
    constructor(props) {
        super(props)
        this.state = _.extend(this.state, {errors: {}})
    }

    get baseUrl(): string {
        return `/${this.props.global.organization.code}`
    }

    protected dispose(error, res, success: () => void) {
        if (error) {
            if (res.status == 422) {
                this.setState({errors: res.body})
                this.props.actions.showAlert(res.body)
                window.scrollTo(0, 0)
            } else {
                this.serverError(error)
            }
        } else {
            success()
        }
    }

    protected serverError(error: any) {
        this.props.actions.showAlert({message: '通信エラーが発生しました。しばらくしてから再度お試しください。'})
    }

    protected get isPc(): boolean {
        return 768 <= window.outerWidth
    }

    protected get isMiniPc(): boolean {
        return this.isPc && window.outerWidth <= 991
    }

    protected get isMobile(): boolean {
        return window.outerWidth <= 767
    }

    protected get isTablet(): boolean {
        return this.isMobile && 426 <= window.outerWidth
    }

    protected get isSmartPhone(): boolean {
        return window.outerWidth <= 425
    }

    protected get headerHeight(): number {
        return 64
    }

    protected get appHeight(): number {
        return window.innerHeight - this.headerHeight
    }


}