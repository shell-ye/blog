import request from './request'

export const init = () => {
    return request({
        url: '/init'
    })
}