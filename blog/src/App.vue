<template>
  <main id="app">
    <Nav></Nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </main>
</template>

<script>
import Nav from '@/components/nav'
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
    Nav
  }
}
</script>

<style lang="scss">
@import './assets/css/theme.scss';
@import './assets/css/common.scss';
</style>
