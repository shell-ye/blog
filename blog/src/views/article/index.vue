<template>
	<article id="article" ref="article" v-if="article && article.title">
		<HeadBackground text="文章阅读" type="article"></HeadBackground>
		<section class="container note-content white-card">
			<div class="head">
				<p v-if="tags && tags.length">
					<router-link v-for="(item, index) in tags" :key="index" tag="span" :to="{ path: '/categories', query: { article_tags: item} }" class="tags-3">{{ item | articleTag }}</router-link>
				</p>
				<p class="class"><i class="iconfont iconmark"></i>{{ article.skill_tag }}</p>
			</div>
			<div class="time">
				<p class="start"><i class="iconfont iconriqi"></i>发布时间：{{ article.publish_time | timeDate }}</p>
				<p class="new"><i class="iconfont iconriqi"></i>更新时间：{{ article.update_time | timeDate }}</p>
				<p class="likes">
					<i class="iconfont iconLike-selected" :class="{liked: !likedBool}" @click="likedHandler"></i>
					<i class="iconfont iconxinaixin" :class="{liked: likedBool}" @click="likedHandler"></i>
					点赞次数 : {{ article.likes_count }}
				</p>
			</div>
			<div class="content" @click="contentClick($event)">
				<h2 class="title">{{ article.title }}</h2>
				<!-- <div id="note_content" v-if="article && article.html_content && article_show" v-text="article.html_content"></div> -->
				<div class="markdown-body" id="note_content" v-if="article && article.html_content && article_show" v-html="article.html_content"></div>
			</div>
			<Reward></Reward>
		</section>
		<ImgDialog></ImgDialog>
	</article>
</template>

<script>
import bus from '@/bus'
import { mapState } from 'vuex'
import { getStrCount } from '@/utils/index'
import { article_search,article_like,article_user_like } from '@/axios/article'
import HeadBackground from '@/components/article/HeadBackground'
import ImgDialog from '@/components/article/ImgDialog'
import Reward from '@/components/Reward'
export default {
	data () {
		return {
			article_show: false,
			article: {},
			tags: [],
			catalog: {},
			likedBool: false
		}
	},
	async activated () {
		let that = this
		await this.search()
	},
	computed: {
		...mapState({
            'userData': state => state.webside.userData
        })
	},
	watch: {
		$route () {
			this.article_show = false
		}
	},
	components: {
		HeadBackground, Reward, ImgDialog
	},
	methods: {
		async search ( id ) {
			let result = id ? await article_search( 1,id ) : await article_search( 1,this.$route.params.id )
			this.tags = []
			if ( result.data.code == 200 ) {
				this.article = result.data.data
				for ( let prop in JSON.parse( this.article.article_tags ) ) {
					this.tags.push(JSON.parse( this.article.article_tags )[prop])
				}
				this.changeHTMLStr()
			}
			this.checkUserLike()
		},
		async likedHandler () {
			let result = {}
			if ( this.userData && this.userData.id ) {
				result = await article_like( 2, this.article.id, !this.likedBool, this.userData.id )
			} else {
				result = await article_like( 1, this.article.id, !this.likedBool )
			}
			if ( result.data.code == 200 ) {
				if ( !this.likedBool ) {
				this.$message({message: '成功添加喜欢'})
				}
				this.article.likes_count = result.data.data
				this.likedBool = !this.likedBool
			}
		},
		async checkUserLike () {
			if ( this.userData && this.userData.id ) {
				let result = await article_user_like( 2,this.userData.id,this.article.id )
				if ( result.data.code == 200 ) {
					if ( result.data.data.length ) { 
						this.likedBool = true 
					} else {
						this.likedBool = false 
					}
				}
			}
		},
		changeHTMLStr () {
			let pre_count = getStrCount( this.article.html_content, '<pre>' )
			if ( this.article.article_tags.indexOf('Git') != -1 ) {
				for ( let prop = 0; prop < pre_count; prop++ ) {
					this.article.html_content = this.article.html_content.replace('<pre>','<pre class="line-numbers lang-bash">')
					this.article.html_content = this.article.html_content.replace('<code class="lang-','<code class="lang-')
				}
			} else if ( this.article.article_tags.indexOf('Vue') != -1 || this.article.article_tags.indexOf('Nuxt') != -1 || this.article.article_tags.indexOf('Node') != -1 ) {
				for ( let prop = 0; prop < pre_count; prop++ ) {
					this.article.html_content = this.article.html_content.replace('<pre>','<pre class="line-numbers lang-js">')
					this.article.html_content = this.article.html_content.replace('<code class="lang-','<code class="lang-')
				}
			}
			let li_count = getStrCount( this.article.html_content, '<ul><br>' )
			for ( let prop = 0; prop < li_count; prop++ ) {
				this.article.html_content = this.article.html_content.replace('<ul><br>','<ul>')
				this.article.html_content = this.article.html_content.replace('<br></ul>','</ul>')
				this.article.html_content = this.article.html_content.replace('<ul><br />','<ul>')
				this.article.html_content = this.article.html_content.replace('<br /></ul>','</ul>')
			}
			this.article_show = true
		},
		contentClick ( e ) {
			if ( e.target.nodeName == 'IMG' ) {
				bus.$emit('showImgDialog', e.target.src)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
@import './../../assets/css/hljs.css';
#article{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: flex-start;
	margin-bottom: 60px;
	position: relative;
	section{ 
		z-index: 2;
	}
	section.note-content {
		background: white;
		margin-top: -80px;
		.head{
			border-bottom: none;
			p {
				line-height: 24px;
				span {
					margin-right: 10px;
				}
			}
			p.class {
				display: flex;
				align-items: center;
			}
		}
		.time {
			width: 100%;
		}
	}
}

@media screen and (max-width: 1024px) {
    section.note-content {
		margin: 20px 0 20px 0!important;
		padding: 10px!important;
		.time {
			flex-wrap: wrap;
			p {
				margin-bottom: 10px;
			}
		}
	}
}
</style>