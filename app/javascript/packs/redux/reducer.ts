import * as _ from 'underscore'
import {ActionType} from './config'

export function message(state = {message: '', show: false}, action) {
    switch (action.type) {
        case ActionType.SHOW_MESSAGE:
            return _.extend({}, state, {
                value: action.message,
                show: true
            })
        case ActionType.HIDE_MESSAGE:
            return _.extend({}, state, {
                value: '',
                show: false
            })
        default:
            return state
    }
}

export function errorMessage(state = {message: '', show: false}, action) {
    switch (action.type) {
        case ActionType.SHOW_ERROR_MESSAGE:
            return _.extend({}, state, {
                value: action.message,
                show: true
            })
        case ActionType.HIDE_ERROR_MESSAGE:
            return _.extend({}, state, {
                value: '',
                show: false
            })
        default:
            return state
    }
}

export function user(state = null, action) {
    switch (action.type) {
        case ActionType.SET_SIGNED_USER:
            return _.extend({}, state, action.user)
        default:
            return state
    }
}

export function organization(state = null, action) {
    switch (action.type) {
        case ActionType.SET_ORGANIZATION:
            return _.extend({}, state, action.organization)
        default:
            return state
    }
}

export function alert(state = {title: '', message: '', show: false}, action) {
    switch (action.type) {
        case ActionType.SHOW_ALERT:
            return _.extend({}, state, action.alert)
        case ActionType.HIDE_ALERT:
            return _.extend({}, state, action.alert)
        default:
            return state
    }
}

export function confirm(state = {title: '', content: null, show: false}, action) {
    switch (action.type) {
        case ActionType.SHOW_CONFIRM:
            return _.extend({}, state, action.confirm)
        case ActionType.HIDE_CONFIRM:
            return _.extend({}, state, action.confirm)
        default:
            return state
    }
}

export function dialog(state = {values: []}, action) {
    switch (action.type) {
        case ActionType.SHOW_DIALOG:
            return _.extend({}, state, {values: state.values.concat([action.dialog])})
        case ActionType.HIDE_DIALOG:
            return _.extend({}, state, {values: state.values.slice(0, state.values.length - 1)})
        default:
            return state
    }
}

export function loading(state = {counter: 0}, action) {
    switch (action.type) {
        case ActionType.SHOW_LOADING:
            return _.extend({}, state, {counter: state.counter + 1})
        case ActionType.HIDE_LOADING:
            return _.extend({}, state, {counter: state.counter > 0 ? state.counter - 1 : 0})
        case ActionType.RESET_LOADING:
            return _.extend({}, state, {counter: 0})
        default:
            return state
    }
}

export function authenticityToken(state = {value: ''}, action) {
    switch (action.type) {
        case ActionType.SET_AUTHENTICITY_TOKEN:
            return _.extend({}, state, {value: action.authenticityToken})
        default:
            return state
    }
}
