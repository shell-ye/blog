import request from '@/axios/request'
import { getCookie } from '@/utils/cookie'
let token = getCookie('token')

export const article_add = ( title,article_class,article_tags,skill_tag,content,html_content ) => {
    return request({
        url: '/article/add',
        method: 'POST',
        data: {
            token,
            title,
            article_class,
            article_tags,
            skill_tag,
            content,
            html_content
        }
    })
}

export const article_list = ( type,pages,page_count,article_class ) => {
    // type: 1-查询全部     2-按类查询
    let p = {}
    if ( type == 1 ) {
        p = { token,type,pages,page_count}
    } else if ( type == 2 ) {
        p = { token,type,pages,page_count,article_class}
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
            article_class: param
        }
    }
    return request({
        url: '/article/search',
        params
    })
}

export const article_update = ( id,title,article_class,article_tags,skill_tag,content,html_content ) => {
    return request({
        url: '/article/update',
        method: 'POST',
        data: {
            token,
            id,
            title,
            article_class,
            article_tags,
            skill_tag,
            content,
            html_content
        }
    })
}