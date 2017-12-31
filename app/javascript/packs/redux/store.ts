import {combineReducers, createStore} from 'redux'
import {alert, authenticityToken, confirm, dialog, errorMessage, loading, message, organization, user} from './reducer'

export default createStore(
    combineReducers({
        message,
        errorMessage,
        user,
        organization,
        alert,
        confirm,
        dialog,
        loading,
        authenticityToken
    })
)