import axios from 'axios'

export const getToken = () => {
    return axios.get(`${ config.server_URL }/user/token`)
}

export const getUser = ( token ) => {
    return axios.get(`${ config.server_URL }/user/info`,{
        params: {
            token
        }
    })
}