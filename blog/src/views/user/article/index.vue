<template>
  <section id="user_article">
    <div class="head">      
      <div>
        <span>编辑模式: </span>
        <el-select v-model="type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="submit">发布</el-button>
    </div>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </section>
</template>

<script>
import bus from '@/utils/bus'
export default {
  data () {
    return {
      options: [
        { value: 'manage', label: '博客管理'},
        { value: 'write', label: '写博客'},
        { value: 'update', label: '修改博客'}
      ],
      type: 'manage'
    }
  },
  mounted () {
    this.url()
  },
  watch: {
    type () {
      if ( this.type == 'write' ) {
        if ( this.$route.path == '/user/article/write' ) { return }
        this.$router.push('/user/article/write')
      } else if ( this.type == 'update' ) {
        if ( this.$route.path == '/user/article/update' ) { return }
        this.$router.push('/user/article/update')
      } else if ( this.type == 'manage' ) {
        if ( this.$route.path == '/user/article/manage' ) { return }
        this.$router.push('/user/article/manage')
      }
    },
    $route () {
      this.url()
    }
  },
  methods: {
    submit () {
      if ( this.type == 'write' ) {
        bus.$emit('write_submit')
      } else if ( this.type == 'update' ) {
        bus.$emit('update_submit')
      }
    },
    url () {
      if ( this.$route.path == '/user/article/manage' ) {
        this.type = 'manage'
      } else if ( this.$route.path == '/user/article/write' ) {
        this.type = 'write'
      } else if ( this.$route.path == '/user/article/update' ) {
        this.type = 'update'
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
#user_article{
  > div{
    max-width: 1300px;
    margin: 0 auto;
    z-index: 1;
  }
  .head{
    width: calc( 100% + 80px );
    max-width: 10000px;
    margin-left: -40px;
    margin-top: -40px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    box-sizing: border-box;
    align-items: center;
    height: 80px;
    background: white;
    button{
      align-self: center;
      height: auto;
    }
  }
}
</style>