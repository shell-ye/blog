<template>
  <footer id="footer">
      <p v-if="create_time"><i class="iconfont iconcopyright"></i>2017 - 2020 By xiaye | 本站建立于{{ create_time.substr(0, 10) }}</p>
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
    computed: {
        ...mapGetters(
            'webside', {
                create_time: 'create_time'
            }
        )
    },
}
</script>

<style lang="scss" scoped>
#footer{
    width: 100%;
    display: flex;
    justify-content: center;
    color: white;
    text-align: center;
    background-position-y: bottom;
    background-repeat: no-repeat;
    background-image: url(~@/assets/img/index_BG1.jpg);
    p{
        width: 100%;
        padding: 10px;
        letter-spacing: 2px;
        cursor: pointer;
        i {
            margin-right: 4px;
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