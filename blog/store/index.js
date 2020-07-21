const config = require('./../../config.json')

export const state = () => ({
    userData: {},
    token: '',
    article_id: ''
})
  
export const mutations = {
    setUserData ( state,data ) {        
        if ( data && data.head_img ) { data.head_img = config.server_URL + data.head_img }
        state.userData = data
    },
    setToken ( state, data ) {
        state.token = data
    },
    changeArticleID ( state,data ) {
        state.article_id = data
    }
}