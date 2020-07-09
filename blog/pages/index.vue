<template>
  <article id="index">
    <section class="big-title">
      <p class="animate__animated animate__backInUp">全栈开发,奥里给干了!</p>
    </section>
    <section class="learning container white-card">
      <p><i class="iconfont iconshuben"></i>最近在学</p>
      <div class="tags">
        <a class="tags_1">Nuxt.js</a>
        <a class="tags_1">Node.js</a>
        <a class="tags_1">Webpack</a>
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
    background: $redBG;
    text-align: center;
    font-size: 60px;
    letter-spacing: 10px;
    height: 560px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section.learning{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    color: black;
    transform: translateY(-40px);
    position: relative;
    min-height: 360px;
    p{
      width: 100%;
      text-align: center;
      font-size: 32px;
      letter-spacing: 4px;
      margin-top: 40px;
      i{
        font-size: 32px;
        font-weight: bold;
        margin-right: 10px;
      }
    }
    div.tags{
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
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

.animate__backInUp{ animation-delay: .5s;}
</style>