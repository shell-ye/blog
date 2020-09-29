<template>
  <article id="categories">
      <HeadBackground text="文章分类" type="categories"></HeadBackground>
        <section class="white-card container animate__animated animate__slideInUp categories">
            <p class="title"><i class="iconfont iconshuben"></i>文章分类</p>
            <div class="tags">
                <!-- <span v-for="(item, index) in article_tags" :key="index" class="tags-2" :class="{select_article: article == item.value}" @click="article = item.value">{{ item.value }}</span> -->
                <span v-for="(item, index) in tags_count" :key="index" class="tags-2" :class="{select_article: article == index}" @click="article = index">
                    {{ index }} &nbsp;&nbsp;&nbsp;&nbsp; {{ item }}
                </span>
            </div>
        </section>
        <section class="article-list container animate__animated animate__slideInUp">
            <SquareImgCard v-for="(item, index) in list" :key="index" :article="item"></SquareImgCard>
        </section>
        <section class="paging container" v-if="list && list.length && max_pages != 1">
            <p class="circle left" @click="pages--" :class="{disabled: decreaseBool}"><i class="el-icon-arrow-left"></i></p>
            <p class="page">{{ pages }} / {{ max_pages }}</p>
            <p class="circle right" @click="pages++" :class="{disabled: increaseBool}"><i class="el-icon-arrow-right"></i></p>
        </section>
  </article>
</template>

<script>
import bus from '@/utils/bus'
import { article_list } from '@/axios/article'
import defaults from '@/defaults'
import HeadBackground from '@/components/article/HeadBackground'
import SquareImgCard from '@/components/article/SquareImgCard'
import { mapGetters } from 'vuex'
export default {
    name: 'categories',
    data () {
        return {
            article: 'HTML+CSS',
            article_tags: [],
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
        this.article_tags = defaults.article_tags
    },
    activated () {
        if ( this.$route.query && this.$route.query.class ) {
            this.article = this.$route.query.class
        }
        this.search()
        this.pageBools()
    },
    computed: {
        ...mapGetters(['tags_count'])
    },
    components: {
        HeadBackground, SquareImgCard
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
#categories{
    section.categories{
        margin: 40px auto;
        .title {
            margin-bottom: 40px;
        }
        div.tags{
            margin-bottom: 20px;
            > span:nth-child(1){ background: #F5EEF8;}
            > span:nth-child(2){ background: #F9EBEA;}
            > span:nth-child(3){ background: #D7BDE2;}
            > span:nth-child(4){ background: #FEF9E7;}
            > span:nth-child(5){ background: #D2FAC8;}
            > span:nth-child(6){ background: #6A6226;}
            > span:nth-child(7){ background: #1AF2F6;}
            > span:nth-child(8){ background: #ACC156;}

            .select_article{
                background: linear-gradient(to bottom right,#ff5e3a 0,#ff2a68 100%)!important;
                box-shadow: 2px 5px 10px #aaa!important;
                color: white;
            }
        }
    }
    section.article-list{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>