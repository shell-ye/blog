<template>
  <section id="git-install" class="container note-content">
    <div class="head">
      <p><nuxt-link tag="span" :to="{ path: '/notes', query: { article_class: 'git'} }" class="tags-3">Git</nuxt-link></p>
      <p class="class"><i class="iconfont iconmark"></i>基本技能</p>
    </div>
    <div class="time">
      <p class="start"><i class="iconfont iconriqi"></i>发布时间：2020-07-10</p>
      <p class="new"><i class="iconfont iconriqi"></i>更新时间：2020-07-13</p>
    </div>
    <div class="content">
      <h2>Git 安装及初始化</h2>
      <!-- <Code></Code> -->
      <pre>
        <code id="code"></code>
      </pre>
    </div>
  </section>
</template>

<script>
import Code from '@/components/code'
import axios from 'axios'
export default {
  name: 'git-ditch',
  components: {
    Code
  },
  async mounted () {
    let result = await axios.get('http://127.0.0.1:3002/article')
    if ( result.data.code == 200 ) {
      console.log( result.data.data.content )
      document.querySelector('#code').innerHTML = result.data.data.content
    }
  }
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