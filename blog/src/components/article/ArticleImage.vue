<template>
    <img :src="src" alt="type">
</template>

<script>
export default {
    props: ['type'],
    data () {
        return {
            src: ''
        }
    },
    mounted () {
        // if ( this.type == 'HTML+CSS' ) {
        //     this.src = ''
        // }
        this.src = this.type == 'HTML+CSS'
        ? './../../assets/img/html.jpg'
        : this.type == 'Vue' ? './../../assets/img/vue.jpg'
        : this.type == 'Git' ? './../../assets/img/git.jpg'
        : this.type == 'Node' ? './../../assets/img/node.jpg'
        : this.type == 'Nuxt' ? './../../assets/img/nuxt.jpg'
        : ''
    }
}
</script>

