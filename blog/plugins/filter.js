import Vue from 'vue'

Vue.filter('timeDate', val => {
    return val.toString().substr(0,10)
})