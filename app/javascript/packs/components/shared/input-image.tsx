import * as React from 'react'
import {CSSProperties} from 'react'
import Random from '../../random'
import Image from './image'
import Layout from './layout'

export interface LoadedImage {
    type?: string
    url?: string
    file?: File
}

interface Props {
    value?: LoadedImage
    multiple?: boolean
    onChange?: (value: LoadedImage | Array<LoadedImage>) => void
    style?: CSSProperties
    className?: string
}

interface State {
    id?: string
    hovered?: boolean
}

export default class InputImage extends React.Component<Props, State> {
    public static defaultProps = {
        value: {},
        onChange: () => {
        },
        style: {},
        className: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            id: `input-image-${Random.createAlphanumeric()}`
        }
    }

    componentDidMount() {
        document.getElementById(this.state.id).addEventListener('change', e => {
            const files: FileList = (e.target as any).files
            this.changeImage(files)
        })
    }

    changeImage(files: FileList) {
        let loadedFiles: Array<LoadedImage> = []
        this.loadFile(files, (file, e) => {
            loadedFiles.push({type: file.type, url: e.target.result, file: file})
            if (loadedFiles.length == files.length) {
                this.props.onChange(this.props.multiple ? loadedFiles : loadedFiles[0])
            }
        })
    }

    loadFile(files: FileList, onLoad: (file: File, e: any) => void) {
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                let fileReader = new FileReader()
                fileReader.onload = (e) => {
                    onLoad(file, e)
                }
                fileReader.readAsDataURL(file)
            }
        }
    }

    handleClick() {
        if (this.props.multiple) {
            document.getElementById(this.state.id).click()
        } else {
            if (this.props.value.url) {
                this.props.onChange({})
                document.getElementById(`#${this.state.id}`).setAttribute('value', '')
            } else {
                document.getElementById(this.state.id).click()
            }
        }
    }

    handleDragOver(e: any) {
        e.dataTransfer.dropEffect = 'copy'
        e.stopPropagation()
        e.preventDefault()
        this.setState({hovered: true})
    }

    handleDragLeave(e: any) {
        e.stopPropagation()
        e.preventDefault()
        this.setState({hovered: false})
    }

    handleDrop(e: any) {
        e.stopPropagation()
        e.preventDefault()
        this.setState({hovered: false})

        let files = e.dataTransfer.files
        this.changeImage(files)
    }

    render() {
        return (
            <div className={`input-image ${this.props.className}`} style={this.props.style}>
                {
                    this.props.multiple ?
                        <div>
                            <input type="file" id={this.state.id} multiple accept="image/*" className="collapse"/>
                            <button className="btn btn-warning" onClick={(e) => this.handleClick()}>ファイルを複数選択</button>
                        </div>
                        :
                        <Layout direction="column" align="center center" className="w-100 h-100">
                            <input type="file" id={this.state.id} accept="image/*" className="collapse"/>
                            <div
                                className={`input-image-zone ${this.props.value.url ? 'has-image' : ''} ${this.state.hovered ? 'image-drag-over' : ''}`}
                                onDragOver={(e) => this.handleDragOver(e)} onDragLeave={(e) => this.handleDragLeave(e)}
                                onDrop={(e) => this.handleDrop(e)}>
                                {
                                    this.props.value.url ?
                                        <Image src={this.props.value.url}
                                               className="d-flex justify-content-center align-items-center h-100 w-100"/>
                                        :
                                        <div>
                                            <div className="text-center" style={{width: '95px'}}>ファイルをドラッグドロップ</div>
                                        </div>
                                }
                            </div>
                            <button className="btn btn-secondary mt-3 w-100"
                                    onClick={(e) => this.handleClick()}>{this.props.value.url ? 'ファイルを削除' : 'ファイルを選択'}</button>
                        </Layout>
                }
            </div>
        )
    }
}