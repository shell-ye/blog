import Vue from 'vue'

import { Message } from 'element-ui'

const Mess = ({type,message,duration}) => {
    Message({
        type: type || 'success',
        message,
        duration: duration || 1000
    })
}

Vue.prototype.$message = Mess