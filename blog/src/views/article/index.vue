<template>
  <article id="article" ref="article" v-if="article && article.title">
    <section class="redbg"></section>
    <section class="container note-content">
      <div class="head">
        <p v-if="tags && tags.length">
          <router-link v-for="(item, index) in tags" :key="index" tag="span" :to="{ path: '/categories', query: { article_tags: item} }" class="tags-3">{{ item }}</router-link>
        </p>
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
        <router-link v-for="(item,index) in catalog" :key="index" tag="li" :to="{ path: `/article/${ item.id }`}" @click.native="search( item.id )">{{ index + 1 }} . {{ item.title }}</router-link>
      </ul>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { getStrCount } from '@/utils/index'
import { article_search,article_like,article_user_like } from '@/axios/article'
export default {
  data () {
    return {
      article: {},
      tags: [],
      catalog: {},
      likedBool: false
    }
  },
  async activated () {
    let that = this
    await this.search()
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    async search ( id ) {
      let result = id ? await article_search( 1,id ) : await article_search( 1,this.$route.params.id )
      if ( result.data.code == 200 ) {
        this.article = result.data.data
        for ( let prop in JSON.parse( this.article.article_tags ) ) {
          this.tags.push(JSON.parse( this.article.article_tags )[prop])
        }
        this.changeHTMLStr()
      }
      this.checkUserLike()
    },
    async likedHandler () {
      let result = {}
      if ( this.userData && this.userData.id ) {
        result = await article_like( 2,this.article.id,!this.likedBool,this.userData.id )
      } else {
        if ( this.likedBool )  return
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
    },
    changeHTMLStr () {
      let pre_count = getStrCount( this.article.html_content, '<pre>' )
      if ( this.article.article_tags.indexOf('Git') != -1 ) {
          for ( let prop = 0; prop < pre_count; prop++ ) {
            this.article.html_content = this.article.html_content.replace('<pre>','<pre class="line-numbers language-bash">')
            this.article.html_content = this.article.html_content.replace('<code class="lang-','<code class="language-')
          }
        } else if ( this.article.article_tags.indexOf('Vue') != -1 || this.article.article_tags.indexOf('Nuxt') != -1 || this.article.article_tags.indexOf('Node') != -1 ) {
          for ( let prop = 0; prop < pre_count; prop++ ) {
            this.article.html_content = this.article.html_content.replace('<pre>','<pre class="line-numbers language-javascript">')
            this.article.html_content = this.article.html_content.replace('<code class="lang-','<code class="language-')
          }
        }
      let li_count = getStrCount( this.article.html_content, '<li><br>' )
      for ( let prop = 0; prop < li_count; prop++ ) {
        this.article.html_content = this.article.html_content.replace('<li><br>','<li>')
        this.article.html_content = this.article.html_content.replace('<br></li>','</li>')
        this.article.html_content = this.article.html_content.replace('<li><br />','<li>')
        this.article.html_content = this.article.html_content.replace('<br /></li>','</li>')
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