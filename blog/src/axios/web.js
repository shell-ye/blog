import request from './request'
import { getCookie } from '@/utils/cookie'
let token = getCookie('token')

export const init = () => {
    return request({
        url: '/init'
    })
}