import request from '@/axios/request'

export const article_add = ( title,article_class,article_tags,skill_tag,content,html_content ) => {
    return request({
        url: '/article/add',
        method: 'POST',
        data: {
            token: $nuxt.$store.state.token,
            title,
            article_class,
            article_tags,
            skill_tag,
            content,
            html_content
        }
    })
}

export const article_list = ( article_class ) => {
    let p = article_class ? { token: $nuxt.$store.state.token,article_class} : { token: $nuxt.$store.state.token}
    return request({
        url: '/article/list',
        params: p
    })
}

export const article_delete = ( id ) => {
    return request({
        url: '/article/del',
        params: {
            token: $nuxt.$store.state.token,
            id
        }
    })
}

export const article_search = ( type,param ) => {
    // 1-id 2-article_tag-时间排序6条
    let params ={}
    if ( type == 1 ) {
        params = {
            token: $nuxt.$store.state.token,
            type,
            id: param
        }
    } else if ( type == 2 ) {
        params = {
            token: $nuxt.$store.state.token,
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
            token: $nuxt.$store.state.token,
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