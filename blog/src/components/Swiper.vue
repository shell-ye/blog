<template>
    <div
        :class="{
            big: size == 'big'
        }"
    >  
        <slider ref="slider" :options="options">
            <slideritem class="page1">
                <p class="name">Xiaye</p>
                <p class="btn-list">
                    <button @click="toRead">开始阅读</button>
                    <router-link tag="button" :to="{name: 'author'}">了解作者</router-link>
                </p>
                <p class="icon-list">
                    <el-tooltip class="item" effect="dark" content="QQ: 1216814604" placement="bottom">
                        <a target="_black" href="http://wpa.qq.com/msgrd?v=3&uin=1216814604&site=qq&menu=yes" class="iconfont iconqq"></a>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <div slot="content"><img src="@/assets/img/weixin_code.png" style="width: 72px;height: 72px;"></div>
                        <a href="###" class="iconfont iconweixin"></a>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="GitHub" placement="bottom">
                        <a target="_blank" href="https://github.com/shell-ye" class="iconfont iconic-github"></a>
                    </el-tooltip>
                </p>
            </slideritem>
            <slideritem class="page2">
                <p class="text"></p>
            </slideritem>
            <div slot="loading">loading...</div>
        </slider>
        <canvas id="stars"></canvas>
    </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider' // import slider components
import star from "@/assets/js/star.js"
import Typed from 'typed.js'
import { mapState } from 'vuex'
export default {
    props: ['size'],
    data () {
        return {
            options: {
                currentPage: 0,
                thresholdDistance: 100,
                thresholdTime: 3000,
                // autoplay: 5000,
                loop:true,
                direction:'horizontal',
                loopedSlides:1,
                slidesToScroll:1,
                timingFunction: 'ease',
                speed: 300,
            },
            saying: [
                '青青子衿，悠悠我心。但为君故，沉吟至今',
                '骐骥一跃，不能十步。驽马十驾，功在不舍'
            ],
            timer: ''
        }
    },
    mounted () {
        star('stars')
        var typed = new Typed('.text', {
            showCursor: this.isMobile ? false : true,
            strings: this.saying, //输入内容, 支持html标签
            typeSpeed: 100, //打字速度
            backSpeed: 50, //回退速度
            loop: true
        });
    },
    components: {
        slider, slideritem
    },
    computed: {
        ...mapState(['isMobile'])
    },
    methods: {
        toRead () {
            this.timer = setInterval(() => {
                document.documentElement.scrollTop += 100
                if ( document.documentElement.scrollTop >= ( document.documentElement.clientHeight - 60 ) ) {
                    clearInterval( this.timer )
                }
            }, 16)
            // clientHeight / innerHeight
            //  document.documentElement.scrollTop //IE浏览器
            // window.pageYOffset //Safari浏览器
            // document.body.scrollTop //opera，FireFox
        }
    }
}
</script>

 <style lang="scss">
/*loadin*/
@-webkit-keyframes loading-7{
    0%{margin-bottom:0}
    50%{margin-bottom:20px;}
    100%{margin-bottom:0px;}
}
.loadingDot .loading-7 i {
    display: inline-block;
    margin-left: 5px;
    background: #333;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
.loadingDot i:nth-child(1) {
    -webkit-animation: loading-7 .7s ease-in 0s loopedSlides;
    animation: loading-7 .7s ease-in 0s loopedSlides;
}
.loadingDot i:nth-child(2) {
    -webkit-animation: loading-7 .7s ease-in 0.15s loopedSlides;
}
.loadingDot i:nth-child(3) {
    -webkit-animation: loading-7 .7s ease-in 0.3s loopedSlides;
}
.loadingDot i:nth-child(4) {
    -webkit-animation: loading-7 .7s ease-in 0.45s loopedSlides;
}

#stars {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    z-index: 9;
}

.big {
    width: 100%;
    height: 100vh;
}

.big .page1 {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(~@/assets/img/index_BG1.jpg);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p.name {
        font-size: 60px;
        letter-spacing: 12px;
        position: relative;
        margin-top: 150px;
    }
    p.btn-list {
        display: flex;
        justify-content: center;
        position: relative;
        margin: 300px 0 80px 0 ;
        button {
            margin: 0 40px;
            background: transparent;
            border: 1px solid white;
            height: 46px;
            font-size: 20px;
            width: 140px;
            border-radius: 25px;
            font-family: hl!important;
            color: white;
            transition: .4s;
            &:hover {
                background: #ff1515;
                border-color: #ff1515;
            }
        }
    }
    p.icon-list {
        a {
            color: white;
            font-size: 30px;
            margin: 0 20px;
            outline: none;
            cursor: pointer;
        }
    }
}

.big .page2 {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(~@/assets/img/index_BG2.jpg);
    p.text{
        letter-spacing: 10px;
    }
}

// 小屏幕
@media screen and (max-width: 1377px) {
    p.name {
        margin-top: 100px!important;
    }
    p.btn-list {
        margin: 250px 0 40px 0!important;
    }
}

// 移动端
@media screen and (max-width: 1024px) {
    .big .page2,.big .page1 {
        background-size: auto 100%;
        background-position: center;
        p.text {
            font-size: 16px;
            letter-spacing: normal;
        }
        button {
            width: 120px!important;
            height: 46px!important;
            margin: 0 20px!important;
        }
    }
}
</style>