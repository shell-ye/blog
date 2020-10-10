<template>
	<main id="app">
		<Nav v-show="nav_foot_show"></Nav>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<Footer v-show="nav_foot_show && foot_show"></Footer>
	</main>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { user_info } from '@/axios/user'
import { getCookie } from '@/utils/cookie'
export default {
	async beforeCreate () {
		this.$store.commit('webside/setToken', getCookie('token'))
		let result = await user_info( this.$store.state.token )
		if ( result.data.code == 200 ) {
			this.$store.commit('webside/setUserData', result.data.data)
		}
	},
	data () {
		return {
			nav_foot_show: true,
			foot_show: true,
		}
	},
	async mounted () {
		this.$store.dispatch('webside/getWebsideInfo')
		this.changeShow()
		this.checkMobile()
	},
	watch: {
		$route () {
			this.changeShow()
		}
	},
	components: {
		Nav, Footer
	},
	methods: {
		changeShow () {
			if ( this.$route.name == 'login' || window.location.href.indexOf('/user') != -1 ) {
				this.nav_foot_show = false
			} else {
				this.nav_foot_show = true
			}
			if ( this.$route.name == 'search' ) {
				this.foot_show = false
			} else {
				this.foot_show = true
			}
		},
		checkMobile () {
			if ( (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) ) {
				this.$store.commit('webside/changeIsMobile', true)
			} else {
				this.$store.commit('webside/changeIsMobile', false)
			}
		}
	}
}
</script>

<style lang="scss">

</style>
