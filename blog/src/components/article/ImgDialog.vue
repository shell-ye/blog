<template>
    <div class="img-dialog" :class="{show: img_show}">
        <img :src="src" alt="">
        <i class="el-icon-close" @click="img_show = false"></i>
    </div>
</template>

<script>
import bus from '@/bus'
export default {
    name: 'ImgDialog',
    data () {
        return {
            img_show: false,
            src: ''
        }
    },
    mounted () {
        bus.$on('showImgDialog', data => {
            this.src = data
            this.img_show = true
        })
    }
}
</script>

<style lang="scss" scoped>
.img-dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .8);
    transition: .2s;
    transform: scale(.2);
    opacity: 0;
    pointer-events: none;
    z-index: 9999999;
    img {
        max-width: 100vw;
        max-height: 100vh;
    }
    i {
        color: white;
        cursor: pointer;
        font-size: 36px;
        position: absolute;
        top: 40px;
        right: 40px;
    }
}

.img-dialog.show {
    pointer-events: auto;
    opacity: 1;
    transform: scale(1);
}
</style>