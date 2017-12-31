import * as React from 'react'
import {CSSProperties} from 'react'

interface Props {
    src?: any
    style?: CSSProperties
    className?: string
}

interface State {
}

export default class Image extends React.Component<Props, State> {
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
        return (
            <div className={`image-container ${this.props.className}`} style={this.props.style}>
                <img src={this.props.src || '/images/no-image.png'}/>
            </div>
        )
    }
}