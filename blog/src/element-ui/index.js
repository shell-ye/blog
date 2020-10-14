import Vue from 'vue'
import { 
    Button,
    Message,
    Dialog,Input,
    Select,
    Option,
    Checkbox,
    Pagination,
    InputNumber,
    Tag,
    Icon,
    Tooltip,
    Progress,
    Drawer,
    Backtop
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const Mess = ({type,message,duration}) => {
    Message({
        type: type || 'success',
        message,
        duration: duration || 1000
    })
}

Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(Pagination);
Vue.use(InputNumber);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Tooltip);
Vue.use(Progress);
Vue.use(Drawer);
Vue.use(Backtop);
Vue.component(Button.name, Button)
Vue.prototype.$message = Mess