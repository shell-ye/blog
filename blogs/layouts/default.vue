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
import { setCookie,getCookie } from '@/utils/cookie'
import { getToken,user_info } from '@/axios/user'
export default {
    async mounted () {
        let token = getCookie('token')
        if ( token ) {
            this.$store.commit('setToken', token)
        } else {
            let result = await getToken()
            if ( result.data.code == 200 ) {
                this.$store.commit('setToken', result.data.data)
                setCookie('token', result.data.data)
            } 
        }
        let result = await user_info( this.$store.state.token )
        if ( result.data.code == 200 ) {
            this.$store.commit('setUserData', result.data.data)
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