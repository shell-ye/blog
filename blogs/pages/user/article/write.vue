<template>
  <div id="article_write">    
    <div class="input"><span>标题:</span><el-input size="medium" v-model="title"></el-input></div>
    <div class="input">
      <span>技能标签:</span>
      <el-select v-model="skill_tag" placeholder="请选择">
        <el-option v-for="item in article_info.skill_tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="input">
      <span>文章分类:</span>
      <el-select v-model="article_class" placeholder="请选择">
        <el-option v-for="item in article_info.article_class" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="input">
      <span>相关标签:</span>
      <el-checkbox v-for="item in article_info.article_tags" :key="item.value" v-model="article_tags" :label="item.label" border size="medium"></el-checkbox>
    </div>
    <no-ssr>
      <mavon-editor :toolbars="markdownOption" v-model="content" :ishljs="true" @change="changeData" />
    </no-ssr>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import defaults from '@/defaults/index'
import { article_add } from '@/axios/article'
export default {
  data () {
    return {      
      article_info: {},
      title: '',
      article_class: '',
      article_tags: [],
      skill_tag: '',
      content: '',
      html_content: '',

      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  mounted () {
    this.article_info = defaults 
    let that = this
    bus.$on('write_submit', async () => {
      let obj = {}
      for ( let prop in this.article_tags ) {
        obj[prop] = this.article_tags[prop]
      }
      let result = await article_add( that.title,that.article_class,JSON.stringify( obj ),that.skill_tag,that.content,that.html_content.replace(/[\n\r]/g,'<br>') )
      if ( result.data.code == 200 ) { this.$message({message: '添加成功'}) }
    })
  },
  methods: {
    changeData(value, render) {
      this.html_content = render;
    }
  }
}
</script>

<style lang="scss" scoped>
#article_write{
  div.input{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    &:nth-child(4){ margin-bottom: 40px;}
    span{
      display: block;
      width: 100px;
    }
    div{
      &:nth-child(2){ width: 300px;}
    }
  }
}
</style>