import request from './request'
import { getCookie } from '@/utils/cookie'
let token = getCookie('token')

export const getToken = () => {
    return request({
        url: '/user/token',
    })
}

export const sendEmail = ( email ) => {
    return request({
        url: '/user/register/email',
        method: 'POST',
        data: {
            email
        }
    })
}

export const user_register = ( email,emailms,password ) => {
    return request({
        url: '/user/register',
        method: 'POST',
        data: {
            email,
            emailms,
            password
        }
    })
}

export const user_login = ( email,password ) => {
    return request({
        url: '/user/login',
        method: 'POST',
        data: {
            token,
            email,
            password
        }
    })
}

export const user_info = () => {
    return request({
        url: '/user/info',
        params: {
            token
        }
    })
}

export const log_out = () => {
    return request({
        url: '/user/logout',
        params: {
            token
        }
    })
}

export const upload_head_img = ( params ) => {
    return request({
        url: '/user/upload/heads',
        method: 'POST',
        data: params
    })
}

export const update_user_info = ( name,saying,qq,git,weibo,bilibili ) => {
    return request({
        url: '/user/update',
        method: 'POST',
        data: {
            token,
            name,
            saying,
            qq,
            git,
            weibo,
            bilibili
        }
    })
}