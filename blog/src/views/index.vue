<template>
    <article id="index">
        <Swiper size="big"></Swiper>
        <section class="article">
			<div class="article-list">
          		<ImgCard v-for="(item, index) in lately" :key="index" :index="index" :article="item" :shape="isMobile ? 'square' : 'long'"></ImgCard>
				<PagingPage v-if="article_list.data && article_list.data.length" :max_pages="Math.ceil(article_list.pages_info.count / 4)" @increase="page++" @decrease="page--"></PagingPage>
			</div>
			<div class="info">
				<div class="white-card about-blog" v-if="!isMobile">
					<img src="@/assets/img/color_logo.png" alt="">
					<div class="name">本站概况</div>
					<div class="data">
						<p>
							<span>{{ webside.article_count }}</span>
							<span>文章</span>
						</p>
						<p>
							<span>{{ webside.views_count }}</span>
							<span>浏览量</span>
						</p>
						<p>
							<span>{{ webside.article_likes_count }}</span>
							<span>点赞</span>
						</p>
					</div>
				</div>
				<div class="white-card tells">
					<p class="head"><i class="iconfont icongonggao"></i>公告</p>
					<div>{{ webside.tell }}</div>
				</div>
				<div class="white-card article-class">
					<p class="head"><i class="iconfont iconmulu"></i>文章分类</p>
					<ul>
						<li v-for="(item, index) in webside.tags_count" :key="index">
							<router-link tag="span" :to="{path: '/categories', query: { class: index }}">{{ index | articleTag }}</router-link>
							<span>{{ item }}</span>
						</li>
					</ul>
				</div>
			</div>
        </section>
    </article>
</template>

<script>
import defaults from '@/defaults'
import Swiper from '@/components/Swiper'
import ImgCard from '@/components/article/ImgCard'
import PagingPage from '@/components/article/PagingPage'
import { article_list } from '@/axios/article'
import { mapGetters, mapState } from 'vuex'
export default {
	name: 'index',
	data () {
		return {
			lately: [
				{title: 'Vue', time: '2020-02-02', tag: 'vue', describe: '描述为名字'}
			],
			page: 1
		}
	},
	async mounted () {
		await this.getArticleList()
	},
	computed: {
		...mapState({
            'isMobile': state => state.webside.isMobile,
			'webside': state => state.webside.webside
		}),
		...mapGetters(
			'article', {
				article_list: 'article_list'
			}
		)
	},
	watch: {
		page () {
			this.getArticleList()
		}
	},
	components: {
		Swiper, ImgCard, PagingPage
	},
	methods: {
		async getArticleList () {
			await this.$store.dispatch('article/getArticleList', {
				type: 1,
				page: this.page,
				page_count: 4
			})
			this.lately = this.article_list.data
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';

.article {
	display: flex;
	justify-content: center;
	padding-bottom: 20px;
	.info {
		> * {
			width: 280px;
			margin-left: 0;
			margin-right: 0;
		}
		.about-blog {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-content: center;
			align-items: center;
			text-align: center;
			img {
				width: 64px;
				height: 64px;
			}
			.name {
				font-size: 20px;
				margin: 40px 0px 20px 0px;
				font-weight: bold;
			}
			.data {
				width: 100%;
				display: flex;
				justify-content: center;
				p {
					display: flex;
					flex-direction: column;
					&:nth-child(2) {
						margin: 0px 40px;
					}
					span {
						&:first-child {
							margin-bottom: 10px;
							font-size: 20px;
						}
					}
				}
			}
		}
		.tells {
			div {
				line-height: 24px;
				text-indent: 2rem;
			}
		}
		.article-class {			
			ul {
				width: 100%;
				li {
					width: 100%;
					line-height: 30px;
					box-sizing: border-box;
					padding: 0px 1rem;
					display: flex;
					justify-content: space-between;
					span {
						&:nth-child(1) {
							cursor: pointer;
						}
					}
				}
			}
		}
	}
}

.animate__zoomInDown{ animation-delay: .5s;}
.animate__slideInUp{ animation-delay: 1s;}

// 移动端
@media screen and (max-width: 1024px) {
    .article {
		flex-wrap: wrap;
		flex-direction: column-reverse;
		> div {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			> div {
				width: 350px!important;
				margin: 20px 0!important;
			}
		}
	}
}
</style>