<template>
  <footer id="footer">
      <p class="name"><i class="iconfont iconcopyright"></i>2017 - 2020 By xiaye | 本站已运行200天</p>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme';
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
    position: fixed;
    bottom: 0;
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