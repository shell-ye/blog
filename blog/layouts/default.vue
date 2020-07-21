<template>
    <main id="main" ref="main">
        <Nav></Nav>
        <keep-alive>
            <Nuxt />
        </keep-alive>
        <!-- <MusicPlayer></MusicPlayer> -->
        <!-- <Footer></Footer> -->
    </main>
</template>

<script>
import Nav from '@/components/nav.vue'
import Footer from '@/components/footer.vue'
import MusicPlayer from '@/components/music.vue'
import { setCookie } from '@/utils/cookie'
import { getToken,user_info } from '@/axios/user'
export default {
    async mounted () {
        let token = await getToken()
        if ( token.data.code == 200 ) {
            setCookie('token', token.data.data)
            this.$store.commit('setToken', token.data.data)
            let info = await user_info()
            this.$store.commit('setUserData',info.data.data)
        }
    },
    components: {
        Nav,Footer,MusicPlayer
    }
}
</script>

<style lang="scss">
@import '@/assets/css/reset.css';
@import '@/assets/css/common.scss';
@import '@/assets/css/theme.scss';
// main{ cursor: pointer;}
</style>
