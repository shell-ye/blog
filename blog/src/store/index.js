import Vue from 'vue'
import Vuex from 'vuex'

const config = require('./../../../config.json')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        userData: {},
        article_id: '',
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
    },
    mutations: {
        setUserData ( state,data ) {        
            if ( data && data.head_img ) { data.head_img = config.server_URL + data.head_img }
            state.userData = data
        },
        setToken ( state, data ) {
            state.token = data
        },
        changeArticleID ( state, data ) {
            state.article_id = data
        },
        logout ( state ) {
            state.token = ''
            state.userData = {}
        },
        setWebsideInfo ( state, data ) {
            state.webside = data
        }
    },
    getters: {
        create_time ( state ) {
            return state.webside.create_time
        },
        tags_count ( state ) {
            return state.webside.tags_count
        }
    },
    actions: {
        async getUserData ( store ) {
            
        }
    }
})

export default store