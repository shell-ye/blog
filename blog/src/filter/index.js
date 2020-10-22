import Vue from 'vue'

Vue.filter('timeDate', value => {
    // if ( typeof value != 'string' ) { value = value.toString() }
    let result = value.substr(0,10)
    return result
})

Vue.filter('firstUpcase', value => {
    if ( typeof value != 'string' ) { value = value.toString() }
    let result = value.substring(0, 1).toUpperCase() + value.substring(1, value.length)
    return result
})

Vue.filter('articleTag', value => {
    if ( value == 'WeiXinMiniProgram' ) {
        return '微信小程序'
    } else if ( value == 'MiniProgram' ) {
        return '小程序'
    } else {
        return value
    }
})