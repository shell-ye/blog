<template>
  <article id="user-center">
      <aside>
        <section class="head-img">
          <img src="~@/static/img/default_head_img.png" alt="" v-if="!userData || !userData.head_img">
          <img :src="userData.head_img" alt="" v-if="userData && userData.head_img">
          <p><i class="iconfont iconchilun"></i></p>
        </section>
        <div class="username" v-if="userData && userData.name">{{ userData.name }}</div>
        <section class="menu">
          <ul>
            <nuxt-link to="/user/center" tag="li" active-class="active">账号中心</nuxt-link>
            <nuxt-link to="/user/article" tag="li" active-class="active">文章管理</nuxt-link>
          </ul>
        </section>
      </aside>
      <keep-alive>
        <nuxt-child></nuxt-child>
      </keep-alive>
  </article>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'user_menu',
  computed: {
    ...mapState(['userData'])
  },
  mounted () {
    this.$message({message: '欢迎回来 o≥v≤o'})
  },
  // beforeRouteEnter ( to,from,next ) {
  //   next(vm => {
  //     console.log( vm.$store.state )
  //     if ( !vm.$store.state.userData || !vm.$store.state.userData.name ) {
  //       vm.$router.push('/login')
  //     }
  //   })
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#user-center{
  display: flex;
  justify-content: flex-start;
  height: calc( 100vh - 60px );
  aside{
    width: 240px;
    background: $themeBG;
    border-top: 1px solid $gray;
    position: fixed;
    height: calc( 100vh - 60px );
    overflow: auto;
    &::-webkit-scrollbar{ width: 0;}
    section.head-img{
      width: 240px;
      height: 240px;
      position: relative;
      img{
        border-radius: 50%;
        width: 160px;
        height: 160px;
        margin: 40px;
      }
      p{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: white;
        position: absolute;
        bottom: 50px;
        right: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        i{ 
          font-size: 20px;
          margin: 0;
        }
      }
    }
    div.username{
      color: white;
      font-size: 24px;
      text-align: center;
    }
    section.menu{
      width: 100%;
      color: white;
      margin-top: 30px;
      ul{
        li{
          width: 100%;
          text-align: left;
          display: block;
          height: 60px;
          line-height: 60px;
          padding-left: 40px;
          box-sizing: border-box;
          background: $themeBG;
          transition: .2s;
          cursor: pointer;
        }
        li.active{ 
          border-left: 6px solid white;
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0) 99%);
        }
      }
    }
    section{
      &:last-child{
        background: $gray;
      }
    }
  }
  > section{
    background: rgb( 243,245,247 );
    width: calc( 100vw - 260px );
    position: relative;
    left: 240px;
    padding: 40px;
    box-sizing: border-box;
  }
}
</style>