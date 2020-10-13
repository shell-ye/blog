<template>
    <article id="mobile-user-center">
        <h3>个人信息</h3>
        <ul>
            <li class="head">
                <p>头像</p>
                <img :src="userData.head_img" alt="">
                <span>支持 .jpg .jpeg .png .gif 格式 500kb 以内的图片</span>
                <label><input type="file" @change="change($event)"></label>
            </li>
            <li>
                <p>昵称</p>
                <input type="text" v-model="user.name">
            </li>
            <li>
                <p>签名</p>
                <input type="text" v-model="user.saying">
            </li>
            <li>
                <p>QQ</p>
                <input type="text" v-model="user.qq">
            </li>
            <li>
                <p>Git</p>
                <input type="text" v-model="user.git">
            </li>
            <li>
                <p>微博</p>
                <input type="text" v-model="user.weibo">
            </li>
            <li>
                <p>bilibili</p>
                <input type="text" v-model="user.bilibili">
            </li>
            <li class="btn-list">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="changeInfo">重置</el-button>
            </li>
        </ul>
    </article>
</template>

<script>
import user from '@/mixin/user'
import { mapState } from 'vuex'
import { upload_head_img, update_user_info } from '@/axios/user'
export default {
    name: 'MobileUserCenter',
    mixins: [user],
    data () {
        return {
            user: {
                name: '',
                saying: '',
                qq: '',
                git: '',
                weibo: '',
                bilibili: ''
            }
        }
    },
    mounted () {
        this.changeInfo()
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    methods: {
        async change ( e ) {
            let params = new FormData()
            params.append( 'head_img', e.target.files[0] )
            params.append( 'token', this.$store.state.webside.token )
            let result = await upload_head_img( params )
            if ( result.data.code == 200 ) {
                this.$store.commit('webside/setUserData', result.data.data)
                this.$message({ message: '更换成功'})
            }
        },
        async save () {
            let result = await update_user_info( this.user.name, this.user.saying, this.user.qq, this.user.git, this.user.weibo, this.user.bilibili )
            if ( result.data.code == 200 ) {
                this.$store.commit('webside/setUserData', result.data.data)
                this.$message({ message: '更新成功'})
                this.changeInfo()
                this.edit_user = false
            }
        },
        changeInfo () {
            Object.assign(this.user, this.userData)
        }
    }
}
</script>

<style lang="scss" scoped>
$padding: 20px;
#mobile-user-center {
    background: white;
    padding-top: 50px;
    h3 {
        width: 100%;
        font-size: 24px;
        line-height: 60px;
        padding-left: $padding;
        box-sizing: border-box;
    }
    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 $padding;
        box-sizing: border-box;
        li {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-top: 1px solid #ccc;
            padding: 20px 0px;
            p {
                width: 60px;
            }
            input {
                height: 40px;
                width: 100%;
                border: none;
            }
        }
        li.head {
            img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                margin: 0 10px;
            }
            label {
                height: 26px;
                width: 100px;
                background-image: url(~@/assets/img/select_img.png);
                background-size: cover;
                input {
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            span {
                color: gray;
                font-size: 12px;
            }
        }
        li.btn-list {
            justify-content: space-between!important;
        }
    }
}
</style>