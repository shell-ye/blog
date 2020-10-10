<template>
    <article id="search" :class="{
        search: search_bool,
        text: text_bool
    }">
        <section class="top">
            <div class="title">站内搜索</div>
            <div class="bar">
                <input type="text" v-model="article_key">
                <div class="icon" @click="search_bool = true">
                    <i class="el-icon-search"></i>
                    <span class="small"></span>
                    <span class="small animate"></span>
                    <span class="small animate_2"></span>
                    <span class="middle"></span>
                </div>
            </div>
        </section>
        <section class="article-list clear-scroll-bar">
            <ImgCard :shape="isMobile ? 'square' : 'long'" v-for="item in article" :key="item.id" :article="item"></ImgCard>
        </section>
    </article>
</template>

<script>
import { article_list } from '@/axios/article'
import ImgCard from '@/components/article/ImgCard'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            search_bool: false,
            text_bool: false,
            article_key: '',
            article: []
        }
    },
    components: {
        ImgCard
    },
    computed: {
        ...mapState({
            'isMobile': state => state.webside.isMobile
        })
    },
    watch: {
        async article_key () {
            if ( !this.article_key ) {
                this.article.length = 0
                this.article = []
                this.text_bool = false
                return
            }
            let result = await article_list( 3, this.article_key )
            if ( result.data.code == 200 ) {
                if ( result.data.data.length )  this.text_bool = true
                this.article = result.data.data
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#search {
    width: 100%;
    height: 100vh;
    background-image: url(~@/assets/img/search_BG.jpg);
    background-size: cover;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    section.top {
        transition: 1s;
        div.title {
            transition: 1s;
            color: white;
            font-size: 48px;
            letter-spacing: 10px;
            opacity: 0;
        }
        div.bar {
            transition: 1s;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
                transition: 1s;
                transform: scale(.6);
                position: absolute;
                opacity: 0;
                height: 90px;
                width: 900px;
                border: none;
                border-radius: 45px;
                font-size: 45px;
                padding-left: 40px;
                box-sizing: border-box;
            }
            div.icon {
                transition: 1s;
                position: relative;
                font-size: 120px;
                cursor: pointer;
                color: white;
                i {
                    z-index: 4;
                }
                span {
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, .4);
                }
                span.small {
                    z-index: 3;
                    transform: scale(1.2);
                }
                span.small.animate {
                    z-index: 2;
                    animation: search_bg 2s ease infinite;
                }
                span.small.animate_2 {
                    z-index: 2;
                    animation: search_bg 1s ease 2s infinite;
                }
                span.middle {
                    z-index: 1;
                    transform: scale(1.6);
                }
            }
        }
    }
    section.article-list {
        transition: 1s;
        opacity: 0;
        position: absolute;
        overflow-y: scroll;
        width: 100%;
        height: 50%;
        transform: translateY(400px);
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        position: absolute;
        bottom: 0;
        > div {
            margin: 10px 200px;
        }
    }
}

article.search {
    div.title {
        opacity: 1!important;
        margin-bottom: 60px;
    }
    div.bar {
        input {
            transform: scale(1)!important;
            opacity: .6!important;
        }
        div.icon {
            transform: translateX(390px) scale(.4);
            color: black!important;
            span {
                display: none;
            }
        }
    }
}

article.text {
    section.top {
        transform: translateY(-170px);
        div.title {
            margin-bottom: 20px!important;
            font-size: 60px!important;
        }
        div.bar {
            transform: scale(.8)!important;
        }
    }
    section.article-list {
        opacity: 1!important;
        transform: translateY(200px)!important;
        bottom: unset!important;
    }
}

@keyframes search_bg {
    0% {
        opacity: 1;
        transform: scale(1.2);
    }
    100% {
        opacity: 0;
        transform: scale(1.6);
    }
}

@media screen and (max-width: 1377px) {
    article.text {
        section.top {
            transform: translateY(-120px)!important;
        }
        section.article-list {
            transform: translateY(180px)!important;
        }
    }
}

@media screen and (max-width: 1024px) {
    #search {
        section.top {
            width: 100%;
            div.title {
                font-size: 36px!important;
                text-align: center;
            }
            input {
                width: 80%!important;
            }
        }
        section.article-list {
            height: 56%!important;
        }
    }
    article.search div.bar div.icon[data-v-7d459965] {
        transform: translateX(100px) scale(0.4)!important;
    }
    #search.text {
        section.top {
            div.title {
                font-size: 48px!important;
            }
        }
        section.article-list {
            transform: translateY(140px)!important;
        }
    }
}
</style>