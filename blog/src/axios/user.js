import request from './request'

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
            email,
            password
        }
    })
}

export const user_info = () => {
    return request({
        url: '/user/info'
    })
}

export const log_out = () => {
    return request({
        url: '/user/logout'
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
            name,
            saying,
            qq,
            git,
            weibo,
            bilibili
        }
    })
}