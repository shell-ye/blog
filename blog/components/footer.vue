<template>
  <footer id="footer">
      <p class="name">shell-ye</p>
      <p class="bottom">用代码记录生活的每一个美好瞬间<span>|</span>创建时间 : 2020-09-08</p>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme';
#footer{
    display: flex;
    justify-content: center;
    color: white;
    text-align: center;
    background: $themeBG;
    flex-wrap: wrap;
    p{
        width: 100%;
        padding: 10px;
        cursor: pointer;
    }
    p.name{
        font-weight: bold;
        border-bottom: 1px solid $gray;
        width: 80%;
        font-size: 24px;
        letter-spacing: 2px;
    }
    p.bottom{
        span{
            margin: 0 10px;
        }
    }
}
</style>