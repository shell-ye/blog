import { init } from '@/axios/web'

const state = () => ({
    token: '',
    userData: {},
    isMobile: false,
    webside: {
        article_count: 0,
        article_likes_count: 0,
        views_count: 0,
        tell: '暂无公告',
        create_time: '',
        tags_count: {
            'HTML+CSS': 0,
            Javascript: 0,
            Node: 0,
            Vue: 0,
            Axios: 0,
            Git: 0,
            Windows: 0
        }
    }
})

const mutations = {
    setToken ( state, data ) {
        state.token = data
    },
    logout ( state ) {
        state.token = ''
        state.userData = {}
    },
    setUserData ( state, data ) {        
        if ( data && data.head_img ) { data.head_img = AXIOS_URL + data.head_img }
        state.userData = data
    },
    setWebsideInfo ( state, data ) {
        state.webside = data
    },
    changeIsMobile ( state, data ) {
        state.isMobile = data
    }
}

const getters = {
    // 网站创建时间
    create_time: state => state.webside.create_time,
    // 标签数目
    tags_count: state => state.webside.tags_count
}

const actions = {
    async getWebsideInfo ( store ) {
        let result = await init()
        if ( result.data.code == 200 ) {
            store.commit( 'setWebsideInfo', result.data.data )
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}