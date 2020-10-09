import Vue from 'vue'
import Vuex from 'vuex'

// modules
import webside from './modules/webside'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        webside,
        article
    }
})

export default store