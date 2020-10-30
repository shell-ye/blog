<template>
    <footer id="footer">
        <p>
            <span>
                The blog has been running for {{ running_time }} <i class="my-face">ღゝ◡╹)ノ♡</i>
            </span>
            <span>
                Copyright © 2020 | Powered By xiaye
            </span>
            <span>
                version: v1.3.2
            </span>
        </p>
        <div class="bg">
            <!-- <img src="@/assets/img/footer_clode.png" alt="">
            <img src="@/assets/img/footer_mountain.png" alt="">
            <img src="@/assets/img/footer_tree.png" alt=""> -->
            <div class="mountain"></div>
            <div class="tree"></div>
            <div class="clode"></div>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Footer',
    data () {
        return {
            running_time: ''
        }
    },
    mounted () {
        setInterval(() => {
            this.toNow()
        }, 1000)
    },
    computed: {
        ...mapGetters(
            'webside', {
                create_time: 'create_time'
            }
        )
    },
    methods: {
        toNow ( type ) {
            let day = parseInt((new Date() - new Date(this.create_time)) / 1000 / 60 / 60 / 24) + ' d '
            let hour = parseInt((new Date() - new Date(this.create_time)) / 1000 / 60 / 60 ) % 24 + ' h '
            let min = parseInt((new Date() - new Date(this.create_time)) / 1000 / 60 ) % 60 + ' m '
            let second = parseInt((new Date() - new Date(this.create_time)) / 1000 ) % 60 + ' s '
            this.running_time = day + hour + min + second
        }
    }
}
</script>

<style lang="scss" scoped>
@import url(~@/assets/css/myface.css);
#footer{
    width: 100%;
    height: 126px;
    position: relative;
    display: flex;
    justify-content: center;
    color: white;
    text-align: center;
    p{
        width: 100%;
        padding: 10px;
        letter-spacing: 2px;
        cursor: pointer;
        color: #888;
        font-size: 12px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        line-height: 24px;
        span {
            font-family: Merriweather,"Open Sans","Microsoft Jhenghei","Microsoft Yahei",sans-serif!important;
        }
        i {
            margin: 0 4px;
        }
    }
    .bg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            &:nth-child(1) {
                z-index: 1;
            }
        }
        div {
            background-size: cover;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        div.mountain {
            background-image: url(~@/assets/img/footer_mountain.png);
            bottom: 18px;
        }
        div.tree {
            background-image: url(~@/assets/img/footer_tree.png);
        }
        div.clode {
            background-image: url(~@/assets/img/footer_clode.png);
        }
    }
}

// 移动端
@media screen and (max-width: 1024px) {
    footer {
        font-size: 12px;
        p {
            letter-spacing: 1px!important;
        }
    }
}
</style>