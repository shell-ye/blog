<template>
    <nav id="nav" :class="{nav_shadow: show_shadow}">
        <!-- PC -->
        <div class="pc" v-if="!isMobile">
            <a href="/" class="logo">
                <img src="@/assets/img/logo.png" alt=""><span>夏叶博客</span>
            </a>
            <ul>
                <li><router-link to="/" tag="a"><i class="iconfont iconfangzi"></i>首页</router-link></li>
                <li><router-link :to="{name: 'search'}" tag="a"><i class="el-icon-search"></i>搜索</router-link></li>
                <li><router-link :to="{name: 'categories'}" tag="a"><i class="iconfont iconshuben"></i>文章分类</router-link></li>
                <!-- <li>
                    <router-link to="/notes" tag="a"><i class="iconfont iconbi"></i>学习笔记</router-link>
                    <div class="arrow"></div>
                    <div class="list notes">
                        <p @click="notes('vue')">
                            <svg t="1594346872640" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6139" width="128" height="128"><path d="M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z" fill="#41B883" p-id="6140"></path><path d="M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z" fill="#34495E" p-id="6141"></path>
                            </svg>
                            Vue.js
                        </p>
                        <p @click="notes('nuxt')">
                            <svg t="1594346933505" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6391" width="128" height="128"><path d="M841.568 864.928l0.992-1.92c0.8-1.408 1.568-3.072 2.208-4.768l0.064-0.224 0.096-0.224a48.544 48.544 0 0 0 2.24-26.208l0.032 0.288 0.032 0.288a76.768 76.768 0 0 0-10.208-26.912l0.192 0.32 0.224 0.352-226.848-399.072-34.656-60.576-261.152 459.648a77.44 77.44 0 0 0-8.64 25.312l-0.064 0.448-0.032 0.48a53.632 53.632 0 0 0 3.552 30.752l-0.128-0.352-0.128-0.352c0.704 1.696 1.408 3.136 2.208 4.512l-0.096-0.16-0.096-0.16c6.816 11.744 21.344 25.696 53.344 25.696h422.304c6.688 0 39.456-1.376 54.56-27.232z m-265.696-397.472l207.328 364.704H368.64z m437.28 338.528l-299.36-527.36c-3.072-5.536-20.352-33.568-50.432-33.568-13.536 0-32.928 5.76-48.736 33.504l-38.688 67.84 34.432 60.576 53.344-94.368 296.16 519.68h-112.64a50.496 50.496 0 0 1-2.56 26.272l0.128-0.352 0.128-0.352c-0.736 2.08-1.568 3.84-2.528 5.536l0.096-0.16 0.096-0.16-0.992 1.92c-15.136 25.824-47.872 27.168-54.272 27.168h176.16c6.496 0 39.136-1.376 54.272-27.168 6.688-11.744 11.52-31.456-4.576-59.008zM311.648 866.432a35.2 35.2 0 0 1-1.824-3.648l-0.096-0.288-0.096-0.256a51.712 51.712 0 0 1-3.52-30.688l-0.064 0.32-0.032 0.288H64.064L423.712 199.328l118.048 207.52 34.208-60.576-102.912-181.28c-2.848-5.216-20.256-33.152-50.208-33.152-13.536 0-32.928 5.856-48.736 33.568L9.824 805.92c-3.072 5.536-18.144 34.656-3.2 60.448 6.816 11.744 21.344 25.696 53.344 25.696h305.12c-31.776 0-46.496-13.728-53.408-25.632z" fill="#00C58E" p-id="6392"></path></svg>
                            Nuxt.js
                        </p>
                        <p @click="notes('node')">
                            <svg t="1594346925119" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6264" width="128" height="128"><path d="M512 917.504c-10.752 0-21.504-2.048-31.744-8.704l-100.352-59.904c-14.848-8.704-8.704-10.752-2.048-12.8 19.456-6.144 23.552-8.704 45.056-21.504 2.048-2.048 4.096 0 6.144 0l76.8 45.056c2.048 2.048 6.144 2.048 8.704 0l296.448-170.496c2.048-2.048 4.096-4.096 4.096-8.704V341.504c0-4.096-2.048-6.144-4.096-8.704l-296.448-170.496c-2.048-2.048-6.144-2.048-8.704 0L208.896 332.8c-2.048 2.048-4.096 4.096-4.096 8.704v341.504c0 4.096 2.048 6.144 4.096 8.704l80.896 47.104c44.544 21.504 70.656-4.096 70.656-29.696V369.152c0-4.096 4.096-8.704 8.704-8.704h38.4c4.096 0 8.704 4.096 8.704 8.704v338.944c0 59.904-31.744 91.648-87.552 91.648-16.896 0-29.696 0-68.096-19.456l-76.8-45.056c-19.456-10.752-29.696-29.696-29.696-53.248V341.504c0-21.504 12.8-42.496 32.256-53.248L482.816 117.76c19.456-10.752 44.544-10.752 61.952 0l296.448 170.496c19.456 10.752 31.744 31.744 31.744 53.248v341.504c0 21.504-12.8 42.496-31.744 53.248l-296.448 170.496c-11.264 8.704-22.016 10.752-32.768 10.752z m239.104-337.408c0-64-42.496-80.896-134.144-93.696s-102.4-19.456-102.4-40.448c0-16.896 8.704-42.496 76.8-42.496 61.952 0 83.456 12.8 93.696 53.248 0 4.096 4.096 6.144 8.704 6.144h38.4c2.048 0 4.096 0 6.144-2.048 2.048-2.048 2.048-4.096 2.048-6.144-6.144-70.656-53.248-104.448-149.504-104.448-85.504 0-134.144 36.352-134.144 96.256 0 64 51.2 83.456 132.096 91.648 98.304 8.704 104.448 23.552 104.448 42.496 0 34.304-27.648 47.104-89.6 47.104-78.848 0-96.256-19.456-102.4-59.904 0-4.096-4.096-6.656-8.704-6.656h-38.4c-4.096 0-8.704 4.096-8.704 8.704 0 49.152 27.648 108.544 157.696 108.544 94.208 2.048 147.968-34.304 147.968-98.304z" fill="#FF6A00" p-id="6265"></path></svg>
                            Node.js
                        </p>
                        <p @click="notes('git')">
                            <svg t="1594350841771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4469" width="128" height="128"><path d="M110.933333 451.84L357.546667 204.8l72.106666 72.533333c-10.24 36.266667 6.4 75.946667 39.68 95.146667v236.373333c-25.6 14.506667-42.666667 42.24-42.666666 73.813334a85.333333 85.333333 0 0 0 85.333333 85.333333 85.333333 85.333333 0 0 0 85.333333-85.333333c0-31.573333-17.066667-59.306667-42.666666-73.813334V401.493333l88.32 89.173334c-2.986667 6.4-2.986667 13.653333-2.986667 21.333333a85.333333 85.333333 0 0 0 85.333333 85.333333 85.333333 85.333333 0 0 0 85.333334-85.333333 85.333333 85.333333 0 0 0-85.333334-85.333333c-7.68 0-14.933333 0-21.333333 2.986666L594.346667 320a84.48 84.48 0 0 0-49.066667-99.84c-18.346667-6.826667-37.546667-8.533333-54.613333-3.84L418.133333 144.213333l33.706667-33.28c33.28-33.706667 87.04-33.706667 120.32 0l340.906667 340.906667c33.706667 33.28 33.706667 87.04 0 120.32l-340.906667 340.906667c-33.28 33.706667-87.04 33.706667-120.32 0L110.933333 572.16c-33.706667-33.28-33.706667-87.04 0-120.32z" fill="#E64A19" p-id="4470"></path></svg>
                            git
                        </p>
                    </div>
                </li> -->
                <li><router-link :to="{name: 'friends'}" tag="a"><i class="iconfont iconlianjie1"></i>友情链接</router-link></li>
                <li><router-link :to="{name: 'author'}" tag="a"><i class="iconfont iconzuozhe"></i>关于我</router-link></li>
                <li v-if="!this.userData || !this.userData.email"><router-link to="/login" tag="a"><i class="iconfont iconzuozhe-"></i>登录</router-link></li>
                <li v-if="this.userData && this.userData.email" class="user"><router-link to="/user/center" tag="a"><img :src="userData.head_img" alt=""><span>{{ userData.name }}</span></router-link><a @click="logout">退出</a></li>
            </ul>
        </div>

        <!-- Mobile -->
        <div class="mobile" :class="{fill: mobile_user}" v-if="isMobile">
            <i class="iconfont iconcaidan-" @click="mobile_menu = true"></i>
            <a href="/" class="logo">
                <img v-if="!mobile_user" src="~@/assets/img/logo.png" alt="">
                <img v-if="mobile_user" src="~@/assets/img/color_logo.png" alt="">
                <span>夏叶博客</span>
            </a>
            <router-link tag="i" to="/search" class="iconfont iconfangdajing"></router-link>
        </div>

        <!-- Mobile Menu -->
        <el-drawer
            title="我是标题"
            :visible.sync="mobile_menu"
            direction="ltr"
            size="60%"
            :append-to-body="true"
            :with-header="false">
            <div class="mobile-menu">
                <div class="about-blog">
                    <img src="@/assets/img/color_logo.png" alt="">
                    <div class="name">本站概况</div>
					<div class="data">
						<p>
							<span>{{ webside.article_count }}</span>
							<span>文章</span>
						</p>
						<p>
							<span>{{ webside.views_count }}</span>
							<span>浏览量</span>
						</p>
						<p>
							<span>{{ webside.article_likes_count }}</span>
							<span>点赞</span>
						</p>
					</div>
                </div>
                <!-- 主菜单 -->
                <ul class="menu" @click="mobile_menu = false" v-if="!mobile_user">
                    <router-link v-if="this.userData && this.userData.email" tag="li" to="/mobile/user/center"><img :src="userData.head_img" alt=""><span>{{ userData.name }}</span></router-link>
                    <router-link tag="li" to="/"><i class="iconfont iconfangzi"></i>首页</router-link>
                    <router-link tag="li" to="/search"><i class="iconfont iconfangdajing"></i>搜索</router-link>
                    <router-link tag="li" to="/categories"><i class="iconfont iconshuben"></i>文章分类</router-link>
                    <router-link tag="li" to="/friends"><i class="iconfont iconlianjie1"></i>友情链接</router-link>
                    <router-link tag="li" to="/author"><i class="iconfont iconzuozhe"></i>关于我</router-link>
                    <router-link  v-if="!this.userData || !this.userData.email" tag="li" to="/mobile/login"><i class="iconfont iconzuozhe-"></i>登录</router-link>
                    <li v-if="this.userData && this.userData.email" tag="li" @click="logout"><i class="iconfont icontuichu1"></i>退出</li>
                </ul>

                <!-- 会员中心菜单 -->
                <ul class="menu" @click="mobile_menu = false" v-if="mobile_user">
                    <router-link tag="li" to="/"><i class="iconfont iconfangzi"></i>首页</router-link>
                    <router-link tag="li" to="/mobile/user/center"><i class="iconfont iconzuozhe-"></i>个人信息</router-link>
                    <router-link tag="li" to="/mobile/user/likes"><i class="iconfont iconxinaixin" style="font-size: 16px; margin-right: 4px;"></i>我点赞的</router-link>
                    <li v-if="this.userData && this.userData.email" tag="li" @click="logout"><i class="iconfont icontuichu1"></i>退出</li>
                </ul>
            </div>
        </el-drawer>
    </nav>
</template>

<script>
import bus from '@/bus'
import { mapState } from 'vuex'
import { log_out } from '@/axios/user'
export default {
    name: 'navigation',
    data () {
        return {
            // 导航阴影
            show_shadow: false,

            // 移动端侧栏
            mobile_menu: false,

            // 移动端会员中心
            mobile_user: false
        }
    },
    mounted () {
        window.addEventListener('scroll', e => {
            // window.scrollY - Chrome
            // window.pageYOffset - IE 9 + / safari
            // document.documentElement.scrollTop - IE 6 7 8
            this.show_shadow = window.scrollY || window.pageYOffset || document.documentElement.scrollTop  ? true : false
        })
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData,
            'isMobile': state => state.webside.isMobile,
            'webside': state => state.webside.webside
        })
    },
    watch: {
        $route () {
            this.mobile_user = this.$route.path.indexOf('/mobile/user') != -1
        }
    },
    methods: {
        async logout () {
            let result = await log_out()
            if ( result.data.code == 200 ) {
                this.$store.commit( 'webside/setUserData', {} )
                if ( window.location.href.indexOf('/user') != -1 ) { this.$router.push('/') }
            }
        },
        notes ( info ) {
            bus.$emit('notes', info)
            if ( this.$route.path == '/notes' ) { return }
            this.$router.push('/notes')
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/theme.scss';
$height: 50px;
#nav{
    z-index: 3;
    position: fixed;
    top: 0;
    width: 100%;
    transition: .2s;
    div.pc {
        display: flex;
        justify-content: space-between;
        height: $height;
        padding: 0 40px;
        a.logo {
            height: $height;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                color: white;
                font-size: 30px;
                margin-left: 20px;
                margin-top: -4px;
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
                position: relative;
                &:hover{
                    div.arrow{ display: block;}
                    div.list.notes{ height: calc( 4 * 40px );}
                }
                a{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    height: 100%;
                    text-align: center;
                    line-height: $height;
                    color: white;
                    outline: none;
                    transition: .2s;
                    &:hover{
                        color: black;
                        animation: shake 1s .2s ease both infinite;
                    }
                    i{ margin-right: 4px;}
                    img{
                        width: 24px;
                        height: 24px;
                        border-radius: 12px;
                        margin-right: 6px;
                    }
                }
                div.arrow{
                    width: 0;
                    height: 0;
                    border: 10px solid white;
                    border-color: transparent transparent white transparent;
                    position: absolute;
                    top: 40px;
                    display: none;
                    transition: .2s;
                }
                div.list{
                    height: 0;
                    position: absolute;
                    overflow: hidden;
                    background: white;
                    width: 100%;
                    color: black;
                    text-align: center;
                    top: 60px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    transition: .2s;
                    p{
                        width: 100%;
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        transition: .2s;
                        cursor: pointer;
                        display: flex;
                        justify-content: left;
                        align-items: center;
                        padding-left: 24px;
                        &:hover{
                            background: $gray;
                        }
                        svg{
                            width: 16px;
                            height: 16px;
                            margin-right: 4px;
                            margin-left: -6px;
                        }
                    }
                }
            }
            li.user {
                width: auto;
                a {
                    &:first-child {
                        width: auto;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    div.mobile {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 16px;
        a.logo {
            color: white;
            display: flex;
            justify-content: center;
            font-size: 20px;
            img {
                width: 24px;
                height: 24px;
                margin-right: 10px;
            }
        }
        i {
            font-size: 24px;
            color: white;
        }
    }
    div.mobile.fill {
        // background: white;
        background: rgba(171, 171, 171, .2)!important;
        box-shadow: 0 4px 4px rgba(0,21,41,.08);
        * {
            color: black!important;
        }
    }
} 
.mobile-menu {
    div.about-blog {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        text-align: center;
        background-image: linear-gradient(to right,#0bb7fbd6 0,#0e91d0 100%);
        padding: 20px 0;
        color: white;
        img {
            width: 64px;
            height: 64px;
        }
        .name {
            font-size: 20px;
            margin: 20px 0px 20px 0px;
        }
        .data {
            width: 100%;
            display: flex;
            justify-content: center;
            p {
                display: flex;
                flex-direction: column;
                &:nth-child(2) {
                    margin: 0px 40px;
                }
                span {
                    &:first-child {
                        margin-bottom: 10px;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    ul.menu {
        width: 100%;
        li {
            width: 100%;
            box-sizing: border-box;
            padding-left: 20px;
            height: 40px;
            line-height: 40px;
            i {
                margin-right: 10px;
                font-size: 20px;
                align-items: center;
            }
            img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 6px;
            }
        }
    }
}

#nav.nav_shadow{ 
    background: rgba(171, 171, 171, .3);
    backdrop-filter: saturate(300%) blur(10px);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2); 
}

// IE 不支持毛玻璃效果
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    #nav.nav_shadow{ 
        background: rgba(171, 171, 171, .9)!important;
    }
}
</style>
