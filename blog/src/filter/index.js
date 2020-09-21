import Vue from 'vue'

Vue.filter('timeDate', value => {
    console.log( typeof value )
    // if ( typeof value != 'string' ) { value = value.toString() }
    let result = value.substr(0,10)
    return result
})

Vue.filter('firstUpcase', value => {
    if ( typeof value != 'string' ) { value = value.toString() }
    let result = value.substring(0, 1).toUpperCase() + value.substring(1, value.length)
    return result
})