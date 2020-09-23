<template>
    <div class="head-background">
        <p class="animate__animated animate__fadeInUp">{{ text }}</p>
        <img src="@/assets/img/notes_BG.jpg" alt="" v-if="type == 'notes'">
        <img src="@/assets/img/categories_BG.jpg" alt="" v-if="type == 'categories'">
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
    }
    p {
        z-index: 2;
        color: white;
        font-size: 56px;
        letter-spacing: 10px;
        text-shadow: 4px 4px 8px black;
    }
}
</style>