import request from '@/axios/request'
import { getCookie } from '@/utils/cookie'
let token = getCookie('token')

export const article_add = ( title, article_tags, skill_tag, content,html_content ) => {
    return request({
        url: '/article/add',
        method: 'POST',
        data: {
            token,
            title,
            article_tags,
            skill_tag,
            content,
            html_content
        }
    })
}

export const article_list = ( type, pages, page_count, article_tags ) => {
    // type: 1-查询全部     2-按类查询
    let p = {}
    if ( type == 1 ) {
        p = { token, type, pages, page_count}
    } else if ( type == 2 ) {
        p = { token, type, pages, page_count, article_tags}
    }
    return request({
        url: '/article/list',
        params: p
    })
}

export const article_delete = ( id ) => {
    return request({
        url: '/article/del',
        params: {
            token,
            id
        }
    })
}

export const article_search = ( type,param ) => {
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
            article_tags: param
        }
    }
    return request({
        url: '/article/search',
        params
    })
}

export const article_update = ( id,title,article_tags,skill_tag,content,html_content ) => {
    return request({
        url: '/article/update',
        method: 'POST',
        data: {
            token,
            id,
            title,
            article_tags,
            skill_tag,
            content,
            html_content
        }
    })
}

export const article_like = ( type,article_id,bool,user_id ) => {
    // type:    1-无用户id  2-有用户id
    let p = type == 1 ? { token,type,article_id,bool } : { token,type,article_id,bool,user_id }
    return request({
        url: '/article/like',
        params: p
    })
}

export const article_user_like = ( type,user_id,article_id ) => {
    // type:    1-查询喜欢列表  2-查询单个
    let p = type == 1 ? { token,type,user_id } : { token,type,user_id,article_id }
    return request({
        url: '/article/user-like',
        params: p
    })
}