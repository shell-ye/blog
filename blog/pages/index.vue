<template>
  <article id="index">
    <section class="big-title">
      <p class="animate__animated animate__zoomInDown">全栈开发,奥里给干了!</p>
    </section>
    <section class="animate__animated animate__slideInUp learning container white-card">
      <p class="title"><i class="iconfont iconshuben"></i>最近在学</p>
      <div class="tags">
        <span class="tags-1">Nuxt.js</span>
        <span class="tags-1">Node.js</span>
        <span class="tags-1">Webpack</span>
      </div>
      <span class="learning-words">懒惰象生锈一样,比操劳更能消耗身体;经常用的钥匙,总是亮闪闪的</span>
    </section>
  </article>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#index{
  transform: translateY(-60px);
  color: white;
  section.big-title{
    color: white;
    background: $themeBG;
    text-align: center;
    font-size: 60px;
    letter-spacing: 10px;
    height: 560px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section.learning{
    margin-top: -40px;
    div.tags{
      margin-bottom: 20px;
    }
    > span.learning-words{ 
      color: $gray;
      font-size: 14px;  
      display: inline-block;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 20px;
      font-size: 16px;
    }
  }
}

.animate__zoomInDown{ animation-delay: .5s;}
.animate__slideInUp{ animation-delay: 1s;}
</style>