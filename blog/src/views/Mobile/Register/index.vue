<template>
    <article id="mobile-register">
        <section class="body">
            <div class="title">注册</div>
            <div class="input">
                <i class="iconfont iconzuozhe-"></i>
                <input type="text" placeholder="请输入邮箱" v-model="user">
            </div>
            <div class="input">
                <i class="iconfont iconanquan"></i>
                <input type="text" placeholder="请输入验证码" v-model="code">
                <button @click="send" ref="sendEmail">获取验证码</button>
            </div>
            <div class="input">
                <i class="iconfont iconsuo"></i>
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <button @click="register">注册</button>
        </section>
        <section class="balck"></section>
    </article>
</template>

<script>
import { sendEmail, user_register } from '@/axios/user'
export default {
    name: 'MobileRegister',
    data () {
        return {
            user: '',
            code: '',
            password: '',
            timer: ''
        }
    },
    methods: {
        async send () {
            if ( !this.user ) {
                this.$message({
                    type: 'error',
                    message: '请输入邮箱'
                })
            } else {
                let result = await sendEmail( this.user )
                if ( result.data.code == 200 ) {
                    let second = 60
                    this.timer = setInterval(() => {
                        this.$refs.sendEmail.innerHTML = second + '秒'
                        this.$refs.sendEmail.disabled = 'disabled'
                        second--
                        if ( second == 0 ) {
                            clearInterval(this.timer)
                            this.$refs.sendEmail.disabled = ''
                            this.$refs.sendEmail.innerHTML = '发送'
                        }
                    }, 1000)
                    this.$message({
                        type: 'success',
                        message: '验证码已发送'
                    })
                }
            }
        },
        async register () {
            if ( !this.user || !this.code || !this.password ) {
                this.$message({
                    type: 'error',
                    message: '请输入邮箱'
                })
            } else {
                let result = await user_register( this.user, this.code, this.password )
                if ( result.data.code == 200 ) {
                    this.$message({
                        type: 'success',
                        message: '注册成功'
                    })
                    this.$router.go(-1)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#mobile-register {
    div, button, input, a {
        font-family: "Microsoft Yahei"!important;
    }
    color: white;
    width: 100%;
    height: 100vh;
    background-image: url(~@/assets/img/mobile_register.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    section.body {
        z-index: 2;
        width: 100%;
        height: 60%;
        margin-top: 60px;
        > * {
            width: 90%;
            margin: 20px auto;
        }
        div.title {
            text-align: center;
            margin-bottom: 40px;
            font-size: 18px;
        }
        div.input {
            height: 40px;
            display: flex;
            justify-content: center;
            position: relative;
            input {
                color: white;
                width: 100%;
                background: transparent;
                border-color: transparent transparent white transparent;
                padding-left: 30px;
            }
            i {
                position: absolute;
                left: 0;
                transform: translateY(10px);
                font-size: 22px;
            }
            button {
                position: absolute;
                right: 0;
                font-size: 14px;
                padding: 6px 12px;
                bottom: 6px;
                background: rgb(73, 125, 254);
                color: white;
                border-radius: 20px;
                box-shadow: 0 0 10px gray;
            }
        }
        > button {
            height: 40px;
            border-radius: 20px;
            background: rgb(73, 125, 254);
            color: white;
            box-shadow: 0 0 10px gray;
            margin-left: 5%;
        }
    }
    section.balck {
        z-index: 1;
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .2);
    }
}
</style>