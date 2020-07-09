<template>
    <nav id="nav" class="container animate__animated animate__bounceInDown" v-show="showBool" :class="{nav_shadow: show_shadow == 1}">
        <div class="container">
            <a href="/" class="logo"><img src="data:image/png;base64,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" alt=""></a>
            <ul>
                <li><nuxt-link to="/" tag="a"><i class="iconfont iconfangzi"></i>首页</nuxt-link></li>
                <li><nuxt-link to="/" tag="a"><i class="iconfont iconbiaoqian"></i>技能标签</nuxt-link></li>
                <li><nuxt-link to="/" tag="a"><i class="iconfont iconshuben"></i>学习笔记</nuxt-link></li>
                <li><nuxt-link to="/" tag="a"><i class="iconfont iconzuozhe"></i>关于我</nuxt-link></li>
                <li v-if="!this.userData.email"><nuxt-link to="/login" tag="a"><i class="iconfont iconzuozhe-"></i>登录</nuxt-link></li>
                <li v-if="this.userData && this.userData.email"><nuxt-link to="/login" tag="a"><i class="iconfont iconzuozhe-" style="font-size: 20px;"></i>{{ userData.email }}</nuxt-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
    // name: 'nav',
    data () {
        return {
            showBool: true,
            show_shadow: false
        }
    },
    mounted () {
        this.route()
        window.addEventListener('scroll',() => {
            this.show_shadow = window.scrollY ? true : false
        })
    },
    computed: {
        ...mapState(['userData'])
    },
    watch: {
        $route () {
            this.route()
        }
    },
    methods: {
        route () {
            if ( this.$route.name == 'login' ) {
                this.showBool = false
            } else {
                this.showBool = true
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/theme.scss';
$height: 60px;
#nav{
    z-index: 999;
    position: sticky;
    top: 0;
    background: $redBG;
    width: 100%;
    div{
        display: flex;
        justify-content: space-between;
        height: $height;
        a.logo {
            height: $height;
            outline: none;
            img {
                height: $height;
            }
        }
        ul {
            display: flex;
            justify-content: flex-start;
            line-height: $height;
            li{
                width: 120px;
                text-align: center;
                display: flex;
                justify-content: center;
                color: white;
                a{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: $height;
                    color: white;
                    outline: none;
                    transition: .2s;
                    &:hover{
                        color: black;
                    }
                    i{ margin-right: 4px;}
                }
                &:hover{ animation: shake 1s .2s ease both infinite;}
            }
        }
    }
} 

#nav.nav_shadow{ box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);}
</style>
