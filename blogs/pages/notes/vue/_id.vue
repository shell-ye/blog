<template>
    <section id="git-install" class="container note-content">
        <!-- <div class="head">
        <p><nuxt-link tag="span" :to="{ path: '/notes', query: { article_class: 'git'} }" class="tags-3">Git</nuxt-link></p>
        <p class="class"><i class="iconfont iconmark"></i>基本技能</p>
        </div>
        <div class="time">
        <p class="start"><i class="iconfont iconriqi"></i>发布时间：2020-07-10</p>
        <p class="new"><i class="iconfont iconriqi"></i>更新时间：2020-07-13</p>
        </div>
        <div class="content">
        <h2>Git 安装及初始化</h2>
        <pre>
            <code id="code"></code>
        </pre>
        </div> -->
        <!-- {{ article }} -->
  </section>
</template>

<script>
import { article_search } from '@/axios/no_base'
export default {
    async asyncData ( content ) {
        let result = await article_search( 1,content.params.id,content.app.store.state.token )
        if ( result.data.code == 200 ) {
            // let res = {}
            // res.article = result.data.data
            // return res
        }
            return result
    }
    // data () {
    //     return {
    //         article: {}
    //     }
    // },
    // async mounted ( content ) {
    //     let result = await article_search( 1,this.$route.params.id )
    //     if ( result.data.code == 200 ) {
    //         console.log( result )
    //         this.article = result.data.data
    //     }
    // }
}
</script>

<style lang="scss" scoped>
#git-install{
  background: white;
  .head{
    p.class{
      display: flex;
      align-items: center;
    }
  }
}
</style>