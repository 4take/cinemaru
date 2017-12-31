import {ActionType} from './config'

export default class DispatchActions {
    private dispatch: (action: any) => any;

    constructor(dispatch: (action: any) => any) {
        this.dispatch = dispatch
    }

    public showMessage(message: string) {
        this.dispatch({type: ActionType.SHOW_MESSAGE, message: message})
    }

    public hideMessage() {
        this.dispatch({type: ActionType.HIDE_MESSAGE})
    }

    public showErrorMessage(message: string) {
        this.dispatch({type: ActionType.SHOW_ERROR_MESSAGE, message: message})
    }

    public hideErrorMessage() {
        this.dispatch({type: ActionType.HIDE_ERROR_MESSAGE})
    }

    public setUser(user: any) {
        this.dispatch({type: ActionType.SET_SIGNED_USER, user: user})
    }

    public setOrganization(organization: any) {
        this.dispatch({type: ActionType.SET_ORGANIZATION, organization: organization})
    }

    public showAlert(alert: { message?: string, onClose?: () => void }) {
        this.dispatch({
            type: ActionType.SHOW_ALERT,
            alert: {message: alert.message, onClose: alert.onClose, show: true}
        })
    }

    public hideAlert() {
        this.dispatch({type: ActionType.HIDE_ALERT, alert: {message: '', onClose: null, show: false}})
    }

    public showConfirm(confirm: { content?: any, onClose?: (result: boolean) => void }) {
        this.dispatch({
            type: ActionType.SHOW_CONFIRM,
            confirm: {content: confirm.content, onClose: confirm.onClose, show: true}
        })
    }

    public hideConfirm() {
        this.dispatch({type: ActionType.HIDE_CONFIRM, confirm: {content: '', onClose: null, show: false}})
    }

    public showDialog(dialog: { content?: any, actions?: Array<any> }) {
        this.dispatch({
            type: ActionType.SHOW_DIALOG,
            dialog: {content: dialog.content, actions: dialog.actions}
        })
    }

    public hideDialog() {
        this.dispatch({type: ActionType.HIDE_DIALOG, dialog: {title: '', content: ''}})
    }

    public showLoading() {
        this.dispatch({
            type: ActionType.SHOW_LOADING
        })
    }

    public hideLoading() {
        this.dispatch({type: ActionType.HIDE_LOADING})
    }

    public resetLoading() {
        this.dispatch({type: ActionType.RESET_LOADING})
    }

    public setAuthenticityToken(authenticityToken: string) {
        this.dispatch({
            type: ActionType.SET_AUTHENTICITY_TOKEN,
            authenticityToken: authenticityToken
        })
    }

}
