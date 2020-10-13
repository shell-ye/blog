export default {
    mounted () {
        if ( !this.$store.state.webside.userData || !this.$store.state.webside.userData.name ) {
            this.$router.push('/mobile/login')
        }
    }
}