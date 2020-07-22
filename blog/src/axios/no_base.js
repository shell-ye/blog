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

export const article_search = ( type,param,token ) => {
    // 1-id 2-article_tag-时间排序6条
    let params ={}
    if ( type == 1 ) {
        params = {
            token,
            type,
            id: param
        }
    } else if ( type == 2 ) {
        params = {
            token,
            type,
            article_class: param
        }
    }
    return axios.get(`${ config.server_URL }/article/search`,params)
}