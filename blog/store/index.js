import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  () => {
    return new Vuex.Store({
        state: {
            userData: {}
        },
        mutations: {
            setUserData ( state,data ) {
                state.userData = data
            }
        },
        actions: {
            
        }
    })
}

export default store