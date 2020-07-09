<template>
    <main id="main" ref="main">
        <Nav></Nav>
        <Nuxt />
    </main>
</template>

<script>
import Nav from '@/components/nav.vue'
export default {
    // mounted () {
    //     document.querySelector('#main').onmouseenter = () => {
    //         this.$refs.main.style.cursor = 'url(/static/logo.png),auto'
    //         console.log(123,this.$refs.main)
    //     }
    // }
}
</script>

<style lang="scss">
@import '@/assets/css/reset.css';
@import '@/assets/css/common.css';
@import '@/assets/css/theme.scss';
// main{ cursor: pointer;}
</style>
