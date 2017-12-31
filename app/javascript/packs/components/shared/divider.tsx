import * as React from 'react'
import {CSSProperties} from 'react'

interface Props {
    style?: CSSProperties
    className?: string
}

interface State {
}

export default class Divider extends React.Component<Props, State> {
    static defaultProps = {
        style: {},
        className: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return <div className={`divider ${this.props.className}`} style={this.props.style}>
            {this.props.children}
        </div>
    }
}