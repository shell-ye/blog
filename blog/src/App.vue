<template>
	<main id="app">
		<Nav v-show="nav_foot_show"></Nav>		
		<!-- <transition name="fade"> -->
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		<!-- </transition> -->
		<Footer v-show="nav_foot_show && foot_show"></Footer>
		<el-backtop></el-backtop>
	</main>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { user_info } from '@/axios/user'
export default {
	async beforeCreate () {
		let result = await user_info()
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
			if ( this.$route.name == 'login' || window.location.href.indexOf('#/user') != -1 || this.$route.name == 'mobileLogin' || this.$route.name == 'mobileRegister' ) {
				this.nav_foot_show = false
			} else {
				this.nav_foot_show = true
			}
			if ( this.$route.name == 'search' || window.location.href.indexOf('#/mobile/user') != -1  ) {
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
.fade-enter-active, .fade-leave-avtive {
	transform: translateY(0px);
    transition: 1s
}
.fade-enter, .fade-leave-to {
	transform: translateY(20px);
    opacity: 0
}

// body {
// 	cursor: url(~@/assets/img/cursor/arrow.png), auto;
// }

// body input {
// 	cursor: url(~@/assets/img/cursor/beam.png) text!important;
// }
// body a {
//     cursor: url(~@/assets/img/cursor/link.png), pointer!important;
// }
</style>
