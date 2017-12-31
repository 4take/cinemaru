import {Dispatch} from 'react-redux'
import DispatchActions from './action'
import {CSSProperties} from 'react'

export namespace ActionType {
    export const SHOW_MESSAGE = 'SHOW_MESSAGE'
    export const HIDE_MESSAGE = 'HIDE_MESSAGE'
    export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE'
    export const HIDE_ERROR_MESSAGE = 'HIDE_ERROR_MESSAGE'
    export const SET_SIGNED_USER = 'SET_SIGNED_USER'
    export const SET_ORGANIZATION = 'SET_ORGANIZATION'
    export const SHOW_ALERT = 'SHOW_ALERT'
    export const HIDE_ALERT = 'HIDE_ALERT'
    export const SHOW_CONFIRM = 'SHOW_CONFIRM'
    export const HIDE_CONFIRM = 'HIDE_CONFIRM'
    export const SHOW_DIALOG = 'SHOW_DIALOG'
    export const HIDE_DIALOG = 'HIDE_DIALOG'
    export const SHOW_LOADING = 'SHOW_LOADING'
    export const HIDE_LOADING = 'HIDE_LOADING'
    export const RESET_LOADING = 'RESET_LOADING'
    export const SET_AUTHENTICITY_TOKEN = 'SET_AUTHENTICITY_TOKEN'
}

export interface ComponentProps {
    global?: {
        message: {
            value: any
            show: boolean
        }
        errorMessage: {
            value: any
            show: boolean
        }
        user: any
        organization: any
        alert: {
            message: any
            onClose?: () => void
            show: boolean
        }
        confirm: {
            content: any
            onClose?: (result: boolean) => void
            show: boolean
        }
        dialog: {
            values: Array<{
                content: any
                actions: Array<any>
            }>
        },
        loading: {
            counter: number
        }
        authenticityToken: {
            value: string
        }
    }
    actions?: DispatchActions
    style?: CSSProperties
    className?: string
}

export interface ComponentState {
    errors?: Array<string>
}

export function mapStateToProps(store: any) {
    return {global: store}
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {actions: new DispatchActions(dispatch)}
}