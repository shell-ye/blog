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
      </div>
      <div class="content">
        <h2>{{ article.title }}</h2>
        <div id="note_content"></div>
      </div>
    </section>
    <section class="note-catalog">
      <h3><i class="iconfont iconmulu"></i>目录</h3>
      <p>1.Git 安装及初始化</p>
    </section>
  </article>
</template>

<script>
import { getStrCount } from '@/utils/index'
import { article_search } from '@/axios/article'
export default {
  data () {
    return {
      article: {}
    }
  },
  async activated () {
    let that = this
    await this.search()
    let timer = setInterval(() => {
      let content = this.$refs.article.querySelector('#note_content')
      if ( content ) {
        content.innerHTML = that.article.html_content
        clearInterval( timer )
      }
    },1000);
  },
  methods: {
    async search () {
      let result = await article_search( 1,this.$route.params.id )
      if ( result.data.code == 200 ) {
        this.article = result.data.data
        let count = getStrCount( this.article.html_content, '<pre>' )
        if ( this.article.article_class = 'git' ) {
          for ( let prop = 0; prop < count; prop++ ) {
            this.article.html_content = this.article.html_content.replace('<pre>','<pre class="line-numbers language-bash">')
            this.article.html_content = this.article.html_content.replace('<code class="lang-','<code class="language-')
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
  padding-top: 100px;
  position: relative;
  section{ z-index: 2;}
  section.redbg{
    position: absolute;
    background: $themeBG;
    top: 0;
    width: 100%;
    height: 200px;
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