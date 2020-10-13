import request from './request'
import { getCookie } from '@/utils/cookie'
let token = getCookie('token')

// 初始数据
export const init = () => {
    return request({
        url: '/init'
    })
}

// 获取友链
export const friendLinks = () => {
    return request({
        url: '/friend/links'
    })
}

// 添加友链
export const uploadFriendLink = ( classes, name, remarks, href ) => {
    return request({
        url: '/friend/add',
        method: 'POST',
        data: {
            token,
            classes, 
            name, 
            remarks, 
            href
        }
    })
}

// 友链头像
export const uploadFriendHead = ( params ) => {
    return request({
        url: '/friend/add/head',
        method: 'POST',
        data: params
    })
}

// 删除友链
export const delFriendLink = ( id ) => {
    return request({
        url: '/friend/del',
        params: {
            token,
            id
        }
    })
}

// 修改友链
export const changeFriendLink = ( classes, name, remarks, href ) => {
    return request({
        url: '/friend/change',
        method: 'POST',
        data: {
            token,
            classes, 
            name, 
            remarks, 
            href
        }
    })
}