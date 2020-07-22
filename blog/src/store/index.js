import Vue from 'vue'
import Vuex from 'vuex'

const config = require('./../../../config.json')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        userData: {},
        article_id: ''
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
        }
    },
    actions: {
        async getUserData ( store ) {
            
        }
    }
})

export default store