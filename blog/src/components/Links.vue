<template>
    <div class="link-block">
        <a :href="data.href" target="_black">
            <div class="info">
                <div class="name">{{ data.name }}</div>
                <div class="remarks">{{ data.remarks }}</div>
            </div>
            <img :src="src" alt="">
        </a>
    </div>
</template>

<script>
export default {
    props: ['data'],
    computed: {
        src () {
            return AXIOS_URL + '/images/friendLinkImg/' + this.data.head_img
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
.link-block {
    width: 250px;
    height: 100px;
    border: 1px solid #ececec;
    padding: 10px 30px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    transition: all .3s;
    border-radius: 10px;
    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
        .info {
            font-size: 20px;
            z-index: 2;
            transform: translateY(8px);
            .name {
                color: $elementBlue;
                margin-bottom: 10px;
                font-size: 14px;
            }
            .remarks {
                color: #949494;
                font-size: 13px;
                padding: 6px 0;
                border-top: 1px dashed #ddd;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 25px;
                -webkit-transition: all .5s;
                transition: all .5s;
            }
        }
        img {
            box-shadow: inset 0 0 10px #000;
            padding: 5px;
            opacity: 1;
            transform: rotate(0deg);
            transition: all ease 1s;
            margin-top: 5px;
            width: 65px;
            height: 65px;
            padding: 2px;
            border-radius: 100%;
        }
    }

    &::before {
        content: "";
        background-color: $elementBlueOpacity;
        transform: skew(45deg,0);
        width: 0;
        height: 100%;
        position: absolute;
        top: 0;
        left: -60px;
        transition: all .5s;
        opacity: .3;
    }
    &:hover {
        border-color: $elementBlue;
        a {
            .info {
                .name {
                    color: $elementBlue;
                }
                .remarks {
                    border-top: 1px dashed $elementBlue;
                }
            }
            img {
                transform: rotate(360deg);
            }
        }
        &::before {
            width: 180%;
        }
    }
}
</style>