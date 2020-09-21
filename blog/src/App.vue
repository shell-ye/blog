<template>
  <main id="app">
    <Nav></Nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer></Footer>
  </main>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { user_info } from '@/axios/user'
import { getCookie } from '@/utils/cookie'
export default {
  async beforeCreate () {
    this.$store.commit('setUserData', getCookie('token'))
    let result = await user_info( this.$store.state.token )
    if ( result.data.code == 200 ) {
      this.$store.commit('setUserData', result.data.data)
    }
  },
  components: {
    Nav, Footer
  }
}
</script>

<style lang="scss">
@import './assets/css/theme.scss';
@import './assets/css/common.scss';
</style>
