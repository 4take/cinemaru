import * as React from 'react'
import {CSSProperties} from 'react'

interface Props {
    direction?: string
    align?: string
    wrap?: boolean
    style?: CSSProperties
    className?: string
}

interface State {
}

export default class Layout extends React.Component<Props, State> {
    static defaultProps = {
        direction: 'row',
        align: 'start start',
        wrap: false,
        style: {},
        className: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return <div
            style={this.props.style}
            className={`flex-${this.props.direction} justify-content-${this.props.align.split(' ')[0]} align-items-${this.props.align.split(' ')[1]} ${this.props.wrap ? 'flex-wrap' : 'flex-nowrap'} ${this.props.className}`}>
            {this.props.children}
        </div>
    }
}