<template>
    <div class="head-background">
        <p class="animate__animated animate__fadeInUp">{{ text }}</p>
        <img src="@/assets/img/notes_BG.jpg" alt="" v-if="type == 'notes'">
        <img src="@/assets/img/categories_BG.jpg" alt="" v-if="type == 'categories'">
        <img src="@/assets/img/author_BG.jpg" alt="" v-if="type == 'author'">
        <img src="@/assets/img/article_BG.jpg" alt="" v-if="type == 'article'">
        <img src="@/assets/img/friends_BG.jpg" alt="" v-if="type == 'friends'">
    </div>
</template>

<script>
export default {
    name: 'headBackground',
    props: ['type', 'text']
}
</script>

<style lang="scss" scoped>
.head-background {
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    p {
        z-index: 2;
        color: white;
        font-size: 56px;
        letter-spacing: 10px;
        text-shadow: 4px 4px 8px black;
    }
}

@media screen and (max-width: 1024px) {
    .head-background {
        img {
            width: unset;
        }
    }
}
</style>