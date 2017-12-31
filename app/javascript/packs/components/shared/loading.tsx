import * as React from 'react'
import * as ReactRedux from 'react-redux'
import {connect} from 'react-redux'
import * as ReactSVG from 'react-svg'
import {ComponentProps, mapDispatchToProps, mapStateToProps} from '../../redux/config'
import store from '../../redux/store'
import Providers = ReactRedux.Provider

const Provider = Providers as any

interface Props extends ComponentProps {
}

interface State {
}

class LoadingCmp extends React.Component<Props, State> {
    public static defaultProps = {}

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            this.props.global.loading.counter ?
                <div className="loading">
                    <ReactSVG path="/images/loading.svg"/>
                </div>
                :
                <div></div>
        );
    }
}

const LoadingComponent: any = connect<{}, {}, Props>(mapStateToProps, mapDispatchToProps)(LoadingCmp)

export default class Loading extends React.Component<Props, {}> {
    render() {
        return (
            <Provider store={store}>
                <LoadingComponent/>
            </Provider>
        );
    }
}