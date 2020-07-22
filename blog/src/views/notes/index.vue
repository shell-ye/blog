<template>
  <article id="notes">
        <section class="big-title">
            <p>学习笔记</p>
        </section>
        <section class="white-card container animate__animated animate__slideInUp notes">
            <p class="title"><i class="iconfont iconshuben"></i>文章分类</p>
            <div class="tags">
                <span class="tags-2 vue" :class="{select_article: article == 'vue'}" @click="article = 'vue'">
                    <svg t="1594352533111" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4596" width="128" height="128"><path d="M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z" fill="#41B883" p-id="4597"></path><path d="M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z" fill="#34495E" p-id="4598"></path></svg>
                    Vue
                    </span>
                <span class="tags-2 nuxt" :class="{select_article: article == 'nuxt'}" @click="article = 'nuxt'">
                    <svg t="1594352588351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4721" width="128" height="128"><path d="M841.568 864.928l0.992-1.92c0.8-1.408 1.568-3.072 2.208-4.768l0.064-0.224 0.096-0.224a48.544 48.544 0 0 0 2.24-26.208l0.032 0.288 0.032 0.288a76.768 76.768 0 0 0-10.208-26.912l0.192 0.32 0.224 0.352-226.848-399.072-34.656-60.576-261.152 459.648a77.44 77.44 0 0 0-8.64 25.312l-0.064 0.448-0.032 0.48a53.632 53.632 0 0 0 3.552 30.752l-0.128-0.352-0.128-0.352c0.704 1.696 1.408 3.136 2.208 4.512l-0.096-0.16-0.096-0.16c6.816 11.744 21.344 25.696 53.344 25.696h422.304c6.688 0 39.456-1.376 54.56-27.232z m-265.696-397.472l207.328 364.704H368.64z m437.28 338.528l-299.36-527.36c-3.072-5.536-20.352-33.568-50.432-33.568-13.536 0-32.928 5.76-48.736 33.504l-38.688 67.84 34.432 60.576 53.344-94.368 296.16 519.68h-112.64a50.496 50.496 0 0 1-2.56 26.272l0.128-0.352 0.128-0.352c-0.736 2.08-1.568 3.84-2.528 5.536l0.096-0.16 0.096-0.16-0.992 1.92c-15.136 25.824-47.872 27.168-54.272 27.168h176.16c6.496 0 39.136-1.376 54.272-27.168 6.688-11.744 11.52-31.456-4.576-59.008zM311.648 866.432a35.2 35.2 0 0 1-1.824-3.648l-0.096-0.288-0.096-0.256a51.712 51.712 0 0 1-3.52-30.688l-0.064 0.32-0.032 0.288H64.064L423.712 199.328l118.048 207.52 34.208-60.576-102.912-181.28c-2.848-5.216-20.256-33.152-50.208-33.152-13.536 0-32.928 5.856-48.736 33.568L9.824 805.92c-3.072 5.536-18.144 34.656-3.2 60.448 6.816 11.744 21.344 25.696 53.344 25.696h305.12c-31.776 0-46.496-13.728-53.408-25.632z" fill="#00C58E" p-id="4722"></path></svg>
                    Nuxt
                </span>
                <span class="tags-2 node" :class="{select_article: article == 'node'}" @click="article = 'node'">
                    <svg t="1594352607347" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4845" width="128" height="128"><path d="M512 917.504c-10.752 0-21.504-2.048-31.744-8.704l-100.352-59.904c-14.848-8.704-8.704-10.752-2.048-12.8 19.456-6.144 23.552-8.704 45.056-21.504 2.048-2.048 4.096 0 6.144 0l76.8 45.056c2.048 2.048 6.144 2.048 8.704 0l296.448-170.496c2.048-2.048 4.096-4.096 4.096-8.704V341.504c0-4.096-2.048-6.144-4.096-8.704l-296.448-170.496c-2.048-2.048-6.144-2.048-8.704 0L208.896 332.8c-2.048 2.048-4.096 4.096-4.096 8.704v341.504c0 4.096 2.048 6.144 4.096 8.704l80.896 47.104c44.544 21.504 70.656-4.096 70.656-29.696V369.152c0-4.096 4.096-8.704 8.704-8.704h38.4c4.096 0 8.704 4.096 8.704 8.704v338.944c0 59.904-31.744 91.648-87.552 91.648-16.896 0-29.696 0-68.096-19.456l-76.8-45.056c-19.456-10.752-29.696-29.696-29.696-53.248V341.504c0-21.504 12.8-42.496 32.256-53.248L482.816 117.76c19.456-10.752 44.544-10.752 61.952 0l296.448 170.496c19.456 10.752 31.744 31.744 31.744 53.248v341.504c0 21.504-12.8 42.496-31.744 53.248l-296.448 170.496c-11.264 8.704-22.016 10.752-32.768 10.752z m239.104-337.408c0-64-42.496-80.896-134.144-93.696s-102.4-19.456-102.4-40.448c0-16.896 8.704-42.496 76.8-42.496 61.952 0 83.456 12.8 93.696 53.248 0 4.096 4.096 6.144 8.704 6.144h38.4c2.048 0 4.096 0 6.144-2.048 2.048-2.048 2.048-4.096 2.048-6.144-6.144-70.656-53.248-104.448-149.504-104.448-85.504 0-134.144 36.352-134.144 96.256 0 64 51.2 83.456 132.096 91.648 98.304 8.704 104.448 23.552 104.448 42.496 0 34.304-27.648 47.104-89.6 47.104-78.848 0-96.256-19.456-102.4-59.904 0-4.096-4.096-6.656-8.704-6.656h-38.4c-4.096 0-8.704 4.096-8.704 8.704 0 49.152 27.648 108.544 157.696 108.544 94.208 2.048 147.968-34.304 147.968-98.304z" fill="#FF6A00" p-id="4846"></path></svg>
                    Node
                </span>
                <span class="tags-2 git" :class="{select_article: article == 'git'}" @click="article = 'git'">
                    <svg t="1594352626652" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4972" width="128" height="128"><path d="M110.933333 451.84L357.546667 204.8l72.106666 72.533333c-10.24 36.266667 6.4 75.946667 39.68 95.146667v236.373333c-25.6 14.506667-42.666667 42.24-42.666666 73.813334a85.333333 85.333333 0 0 0 85.333333 85.333333 85.333333 85.333333 0 0 0 85.333333-85.333333c0-31.573333-17.066667-59.306667-42.666666-73.813334V401.493333l88.32 89.173334c-2.986667 6.4-2.986667 13.653333-2.986667 21.333333a85.333333 85.333333 0 0 0 85.333333 85.333333 85.333333 85.333333 0 0 0 85.333334-85.333333 85.333333 85.333333 0 0 0-85.333334-85.333333c-7.68 0-14.933333 0-21.333333 2.986666L594.346667 320a84.48 84.48 0 0 0-49.066667-99.84c-18.346667-6.826667-37.546667-8.533333-54.613333-3.84L418.133333 144.213333l33.706667-33.28c33.28-33.706667 87.04-33.706667 120.32 0l340.906667 340.906667c33.706667 33.28 33.706667 87.04 0 120.32l-340.906667 340.906667c-33.28 33.706667-87.04 33.706667-120.32 0L110.933333 572.16c-33.706667-33.28-33.706667-87.04 0-120.32z" fill="#E64A19" p-id="4973"></path></svg>
                    git
                </span>
            </div>
        </section>
        <section class="article-list container animate__animated animate__slideInUp">
            <ul>
                <li v-for="(item,index) in list" :key="index" class="article-card" v-if="list.length">
                    <router-link tag="div" :to="item.router">
                        <img src="@/assets/img/git.jpg" alt="git" v-if="article == 'git'">
                        <img src="@/assets/img/vue.jpg" alt="git" v-if="article == 'vue'">
                        <img src="@/assets/img/nodejs.jpg" alt="git" v-if="article == 'node'">
                        <img src="@/assets/img/nuxt.jpg" alt="git" v-if="article == 'nuxt'">
                    </router-link>
                    <div class="text">
                        <div class="title">{{ item.title }}</div>
                        <div class="bottom">
                            <router-link tag="p" :to="item.router" class="time"><i class="iconfont icontime"></i>{{ item.update_time }}</router-link>
                            <p class="class"><i class="iconfont iconmark"></i>{{ item.skill_tag }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="paging container" v-if="max_pages != 1">
            <p class="circle left" @click="pages--" :class="{disabled: decreaseBool}"><i class="el-icon-arrow-left"></i></p>
            <p class="page">{{ pages }} / {{ max_pages }}</p>
            <p class="circle right" @click="pages++" :class="{disabled: increaseBool}"><i class="el-icon-arrow-right"></i></p>
        </section>
  </article>
</template>

<script>
import bus from '@/utils/bus'
import { article_list } from '@/axios/article'
export default {
    name: 'notes',
    data () {
        return {
            article: 'vue',
            pages: 1,
            max_pages: 1,
            decreaseBool: true,
            increaseBool: false,
            list: [
                { router: '/article/000001', title: 'vue基础', time: '2020-07-10', class: '前端' } // 改造后的数据样板
            ]
        }
    },
    mounted () {
        bus.$on('notes', data => {
            this.article = data
        })
    },
    activated () {
        this.search()
        this.pageBools()
    },
    watch: {
        article () {
            this.pages = 1
            this.search()
            this.pageBools()
        },
        pages () {
            this.pageBools()
            this.search()
        }
    },
    methods: {
        async search () {
            let result = await article_list( 2,this.pages,12,this.article )
            if ( result.data.code == 200 ) {
                result.data.data.forEach(item => {
                    item.router = `/article/${ item.id }`
                    item.update_time = item.update_time.substr(0,10)
                });
                this.list = result.data.data
                this.max_pages = Math.ceil( result.data.pages_info.count / 12 )
            }
        },
        pageBools () {
            if ( this.pages < 0 ) {
                this.pages = 1
            } else if ( this.pages == 1 && this.pages != this.max_pages ) {
                this.decreaseBool = true
                this.increaseBool = false
            } else if ( this.pages != 1 && this.pages == this.max_pages ) {
                this.decreaseBool = false
                this.increaseBool = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#notes{
    section.big-title{
        color: white;
        background: $themeBG;
        text-align: center;
        font-size: 60px;
        letter-spacing: 10px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    section.notes{
        margin-top: -40px;
        div.tags{
            margin-bottom: 20px;
            .vue{ background: #F5EEF8;}
            .nuxt{ background: #F9EBEA;}
            .node{ background: #D7BDE2;}
            .git{ background: #FEF9E7;}

            .select_article{
                background: linear-gradient(to bottom right,#ff5e3a 0,#ff2a68 100%)!important;
                box-shadow: 2px 5px 10px #aaa!important;
                color: white;
            }
        }
    }
    section.article-list{
        margin-top: 20px;
        ul{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            i{
                font-size: 18px;
                margin-right: 4px;
            }
        }
    }
}
</style>