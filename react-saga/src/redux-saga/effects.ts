import * as effectTypes from './effect-types'

export function take(action: any) {
    return { type: effectTypes.TAKE, action}
}

export function put(action: any) {
    return { type: effectTypes.PUT, action }
}