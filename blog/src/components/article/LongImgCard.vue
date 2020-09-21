<template>
    <div class="long-img-card" :style="{flexDirection: index % 2 == 1 ? 'row' : 'row-reverse'}">
        <router-link tag="div" :to="{path: article.router}" class="img">
            <img src="@/assets/img/git.jpg" alt="">
        </router-link>
        <div class="context">
            <router-link tag="p" :to="{path: article.router}" class="title">{{ article.title }}</router-link>
            <p class="details">
                <span class="time"><i class="iconfont icontime"></i>{{ article.update_time }}</span>
                <span class="tag"><i class="iconfont iconmark"></i>{{ article.skill_tag }}</span>
            </p>
            <p class="describe">{{ article.html }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['article', 'index']
}
</script>

<style lang="scss" scoped>
$height: 270px;
.long-img-card {
    width: 900px;
    height: $height;
    margin: 40px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    background: white;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    transition: .4s;
    &:hover{
        box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
        .img img {
            transform: scale(1.1);
        }
    }
    .img {
        height: $height;
        width: 400px;
        cursor: pointer;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            transition: .4s;
        }
    }
    div.context {
        padding: 40px 20px;
        box-sizing: border-box;
        width: 500px;
        .title {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 2px;
            cursor: pointer;
        }
        .details {
            margin: 40px 0px 20px 0;
            > * {
                margin-right: 10px;
                i {
                    margin-right: 2px;
                }
            }
        }
        .describe {
            line-height: 26px;
            height: 80px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>