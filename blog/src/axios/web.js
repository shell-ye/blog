import request from './request'

export const init = () => {
    return request({
        url: '/init'
    })
}

export const friendLinks = () => {
    return request({
        url: '/friend/links'
    })
}