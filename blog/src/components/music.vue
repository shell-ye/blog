<template>
    <aside id="music_player">
        <section class="bar">
            <div class="img-panel" :class="{playing: play}">
                <img src="@/assets/img/player.png" alt="">
            </div>
            <p @click="outIndex++"><i class="button iconfont iconshangyishou1"></i></p>
            <p @click="play = !play"><i class="button iconfont iconbofangqi_bofang" v-if="!play"></i><i class="button iconfont iconzantingtingzhi" v-if="play"></i></p>
            <p @click="outIndex++"><i class="button iconfont iconxiayishou1"></i></p>
        </section>
        <section class="music-panel" :class="{totop: play}">
            <div class="music-name">知否知否</div>
            <div class="auth-name">胡夏 / 郁可唯</div>
            <div class="time">
                <p class="playing-time">0:00</p>
                <p class="end-time">3:17</p>
            </div>
            <div class="progress">
                <el-slider v-model="play_precent" :show-tooltip="false" :max="play_length" @change="setPlayingPosition"></el-slider>
            </div>
        </section>
        <audio src="@/assets/mp3/index.mp3" autoplay controls ref="music"></audio>
    </aside>
</template>

<script>
export default {
    name: 'music_player',
    data () {
        return {
            play: true,
            play_length: 100,
            play_precent: 0,
            timer: '',
            outIndex: 0,
            list: [
                { path: './../assets/mp3/index.mp3'}
            ]
        }
    },
    mounted () {
        // console.log( this.$refs.music.currentTime ) // 音乐当前位置
        // console.log( this.$refs.music.duration ) // 音乐总长度
        console.log( this.$refs.music )
        // this.timer = setInterval(() => {
        //     if ( this.$refs.music ) {
                // this.$refs.music.play()
        //         clearInterval( this.timer )
        //         console.log( 132 )
        //     } 
        // },1000)
    },
    methods: {
        setPlayingPosition () {
            console.log( 13 )
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#music_player{
    width: 300px;
    position: fixed;
    left: 10px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    section.bar{
        width: 100%;
        height: 60px;
        padding: 0 10px;
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
        background: $themeBG;
        div.img-panel{
            width: 70px;
            height: 70px;
            position: relative;
            left: 10px;
            bottom: 20px;
            border: 4px solid white;
            border-radius: 60px;
            overflow: hidden;
            transition: .2s;
            &::after{
                content: '';
                display: block;
                position: absolute;
                width: 10px;
                height: 10px;
                background: #d6d6d6;
                border: 4px solid white;
                border-radius: 14px;
                left: calc( 50% - 9px );
                top: calc( 50% - 9px );
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            width: 40px;
            height: 40px;
            transition: .2s;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover{
                // background: #d6d6de;
                i{ color: black;}
            }
            i{ 
                font-size: 22px; 
                color: white;
                transition: .2s;
            }
        }
    }
    section.music-panel{
        position: absolute;
        border-radius: 8px;
        width: 80%;
        box-sizing: border-box;
        padding: 10px 20px 10px 96px;
        background: white;
        transition: .2s;
        top: 0;
        box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
        opacity: 0;
        .music-name{
            color: #54576f;
            font-weight: bold;
            font-size: 18px;
        }
        .auth-name{
            color: #acaebd;
            font-size: 13px;
            margin: 4px 0 12px 0;
        }
        .time{
            display: flex;
            justify-content: space-between;
            color: #f86d92;
            font-size: 12px;
            margin-bottom: 4px;
        }
        .progress{
            transform: translateY(-10px);
        }
    }
}

.playing{
    bottom: 30px!important;
    -webkit-animation: rotateAlbumArt 3s linear 0s infinite forwards;
    animation: rotateAlbumArt 3s linear 0s infinite forwards;
}

.totop{
    top: -90px!important;
    opacity: 1!important;
}

@-webkit-keyframes rotateAlbumArt {
    0% {
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0);
    }

    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
    }
}

@keyframes rotateAlbumArt {
    0% {
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0);
    }

    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
    }
}
</style>

<style lang="scss">
@import '@/assets/css/theme.scss';
#music_player{
    .el-slider__button-wrapper{
        display: none;
    }
    .el-slider__bar{
        background: $themeBG;
        border-radius: 10px;
    }
}
</style>