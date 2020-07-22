<template>
    <article id="git-head">
        <nuxt-child keep-alive></nuxt-child>
        <section class="note-catalog">
            <h3><i class="iconfont iconmulu"></i>目录</h3>
            <nuxt-link to="/notes/git/1_install" tag="p">1.Git 安装及初始化</nuxt-link>
        </section>
        <section class="redbg"></section>
    </article>
</template>

<script>
export default {
    layout: 'git',
    name: 'git'
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#git-head{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
    position: relative;
    section{
        z-index: 2;
        &:first-child{
            margin: 0;
        }
    }
    section.redbg{
        position: absolute;
        background: $themeBG;
        top: 0;
        width: 100%;
        height: 200px;
        z-index: 1;
    }
}
</style>