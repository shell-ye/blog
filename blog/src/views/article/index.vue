<template>
  <article id="article" ref="article" v-if="article && article.title">
    <section class="redbg"></section>
    <section class="container note-content">
      <div class="head">
        <p><router-link tag="span" :to="{ path: '/notes', query: { article_class: article.article_class} }" class="tags-3">{{ article.article_class | firstUpcase }}</router-link></p>
        <p class="class"><i class="iconfont iconmark"></i>{{ article.skill_tag }}</p>
      </div>
      <div class="time">
        <p class="start"><i class="iconfont iconriqi"></i>发布时间：{{ article.publish_time | timeDate }}</p>
        <p class="new"><i class="iconfont iconriqi"></i>更新时间：{{ article.update_time | timeDate }}</p>
        <p class="likes">
          <i class="iconfont iconLike-selected" :class="{liked: !likedBool}" @click="likedHandler"></i>
          <i class="iconfont iconxinaixin" :class="{liked: likedBool}" @click="likedHandler"></i>
          点赞次数 : {{ article.likes_count }}
        </p>
      </div>
      <div class="content">
        <h2>{{ article.title }}</h2>
        <div id="note_content" v-if="article && article.html_content" v-html="article.html_content"></div>
      </div>
    </section>
    <section class="note-catalog">
      <h3><i class="iconfont iconmulu"></i>目录</h3>
      <ul v-if="catalog && catalog.length">
        <li v-for="(item,index) in catalog" :key="index" @click="search( item.id )">{{ index + 1 }} . {{ item.title }}</li>
      </ul>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { getStrCount } from '@/utils/index'
import { article_search,article_catalog,article_like,article_user_like } from '@/axios/article'
export default {
  data () {
    return {
      article: {},
      catalog: {},
      likedBool: false
    }
  },
  async activated () {
    let that = this
    await this.search()
    await this.getCatalog()
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    async search ( id ) {
      let result = id ? await article_search( 1,id ) : await article_search( 1,this.$route.params.id )
      if ( result.data.code == 200 ) {
        this.article = result.data.data
        let pre_count = getStrCount( this.article.html_content, '<pre>' )
        if ( this.article.article_class == 'git' ) {
          for ( let prop = 0; prop < pre_count; prop++ ) {
            this.article.html_content = this.article.html_content.replace('<pre>','<pre class="line-numbers language-bash">')
            this.article.html_content = this.article.html_content.replace('<code class="lang-','<code class="language-')
          }
        } else if ( this.article.article_class == 'vue' || this.article.article_class == 'nuxt' || this.article.article_class == 'node' ) {
          for ( let prop = 0; prop < pre_count; prop++ ) {
            this.article.html_content = this.article.html_content.replace('<pre>','<pre class="line-numbers language-javascript">')
            this.article.html_content = this.article.html_content.replace('<code class="lang-','<code class="language-')
          }
        }
      }
      this.checkUserLike()
    },
    async getCatalog () {    
      let result = await article_catalog( this.article.article_class )
      if ( result.data.code == 200 ) {
        this.catalog = result.data.data == null ? 0 : result.data.data
      }
    },
    async likedHandler () {
      let result = {}
      if ( this.userData && this.userData.id ) {
        result = await article_like( 2,this.article.id,!this.likedBool,this.userData.id )
      } else {
        result = await article_like( 1,this.article.id,!this.likedBool )
      }
      if ( result.data.code == 200 ) {
        if ( !this.likedBool ) {
          this.$message({message: '成功添加喜欢'})
        }
        this.article.likes_count = result.data.data
        this.likedBool = !this.likedBool
      }
    },
    async checkUserLike () {
      if ( this.userData && this.userData.id ) {
        let result = await article_user_like( 2,this.userData.id,this.article.id )
        if ( result.data.code == 200 ) {
          if ( result.data.data.length ) { 
            this.likedBool = true 
          } else {
            this.likedBool = false 
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#article{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 200px;
  position: relative;
  section{ z-index: 2;}
  section.redbg{
    position: absolute;
    background: $themeBG;
    top: 0;
    width: 100%;
    height: 300px;
    z-index: 1;
  }
  section.note-content{
    background: white;
    margin: 0;
    .head{
      p.class{
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>