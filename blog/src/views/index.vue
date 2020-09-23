<template>
    <article id="index">
        <Swiper size="big"></Swiper>
        <section class="article">
			<div class="article-list">
          		<LongImgCard v-for="(item, index) in lately" :key="index" :index="index" :article="item"></LongImgCard>
			</div>
			<div class="info">
				<div class="white-card about-blog">
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
					<ul v-if="article_list && article_list.length">
						<li v-for="(item, index) in article_list" :key="index">
							<span>{{ item.value }}</span>
							<span>{{ index }}</span>
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
import LongImgCard from '@/components/article/LongImgCard'
import { article_list } from '@/axios/article'
import { mapState } from 'vuex'
export default {
	name: 'index',
	data () {
		return {
			lately: [
				{title: 'Vue', time: '2020-02-02', tag: 'vue', describe: '描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字'},
				{title: 'Vue', time: '2020-02-02', tag: 'vue', describe: '描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字'},
				{title: 'Vue', time: '2020-02-02', tag: 'vue', describe: '描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字'},
				{title: 'Vue', time: '2020-02-02', tag: 'vue', describe: '描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字描述为名字'}
			],
			article_list: []
		}
	},
	async mounted () {
		this.article_list = defaults.article_tags
		let result = await article_list( 1, 1, 4 )
		if ( result.data.code == 200 ) {
			this.lately = result.data.data
			this.lately.forEach(item => {
				item.update_time = item.update_time.substr(0,10)
				item.router = `/article/${ item.id }`
			})
		}
	},
	computed: {
		...mapState(['webside'])
	},
	components: {
		Swiper, LongImgCard
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';

.article {
	display: flex;
	justify-content: center;
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
				}
			}
		}
	}
}

.animate__zoomInDown{ animation-delay: .5s;}
.animate__slideInUp{ animation-delay: 1s;}
</style>