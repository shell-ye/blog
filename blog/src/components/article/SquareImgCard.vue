<template>
    <div class="square-img-card">
        <router-link tag="div" :to="article.router">
            <img src="@/assets/img/git.jpg" :alt="article.article_img" v-if="article.article_img == 'Git'">
            <img src="@/assets/img/vue.jpg" :alt="article.article_img" v-if="article.article_img == 'Vue'">
            <img src="@/assets/img/nodejs.jpg" :alt="article.article_img" v-if="article.article_img == 'Node'">
            <img src="@/assets/img/nuxt.jpg" :alt="article.article_img" v-if="article.article_img == 'Nuxt'">
            <img src="@/assets/img/html.jpg" :alt="article.article_img" v-if="article.article_img == 'HTML+CSS'">
        </router-link>
        <div class="text">
            <router-link tag="div" :to="article.router" class="title">{{ article.title }}</router-link>
            <div class="bottom">
                <p class="time"><i class="iconfont icontime"></i>{{ article.update_time }}</p>
                <p class="class"><i class="iconfont iconmark"></i>{{ article.skill_tag }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SquareImgCard',
    props: ['article']
}
</script>

<style lang="scss" scoped>
.square-img-card {
    width: 350px;
    height: 320px;
    background: white;
    font-size: 16px;
    border-radius: 8px;
    overflow: hidden;
    margin: 25px;
    transition: .4s;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    &:hover{
        box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
    }
    > div{ overflow: hidden;}
    img{
        width: 100%;
        height: 218px;
        cursor: pointer;
        transition: .5s;
        &:hover{ transform: scale(1.2);}
    }
    .text{
        height: 102px;
        font-size: 16px;
        line-height: 42px;
        box-sizing: border-box;
        padding: 10px 20px;
        position: relative;
        align-items: center;
        .title{
            font-size: 16px!important;
            font-weight: bold;
            cursor: pointer;
        }
        .bottom{
            display: flex;
            justify-content: space-between;
            position: relative;
            p{
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>