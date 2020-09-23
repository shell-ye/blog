<template>
  <footer id="footer">
      <p class="name" v-if="create_time"><i class="iconfont iconcopyright"></i>2017 - 2020 By xiaye | 本站建立于{{ create_time.substr(0, 10) }}</p>
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
        ...mapGetters(['create_time'])
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
    flex-wrap: wrap;
    p{
        width: 100%;
        padding: 10px;
        cursor: pointer;
    }
    p.name{
        width: 80%;
        letter-spacing: 2px;
        i {
            margin-right: 4px;
        }
    }
    p.bottom{
        span{
            margin: 0 10px;
        }
    }
}
</style>