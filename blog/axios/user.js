import request from './request'

export const sendEmail = ( email ) => {
    return request({
        url: '/user/register/email',
        method: 'POST',
        data: {
            email
        }
    })
}

export const user_register = ( email,password ) => {
    return request({
        url: '/user/register',
        method: 'POST',
        data: {
            email,
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