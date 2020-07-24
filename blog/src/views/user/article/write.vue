<template>
  <div id="article_write">    
    <div class="max-catalog">
      <p class="head">当前排序</p>
      <p class="num">{{ max_catalog + 1}}</p>
      <el-checkbox v-model="catalogBool" value="true" border size="mini">加入排序</el-checkbox>
    </div>
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
    <mavon-editor :toolbars="markdownOption" v-model="content" :ishljs="true" @change="changeData" />
  </div>
</template>

<script>
import bus from '@/utils/bus'
import defaults from '@/defaults/index'
import { article_add,article_max_catalog } from '@/axios/article'

import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
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
      max_catalog: 0,
      catalogBool: false,

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
      let result = this.catalogBool ? await article_add( that.title,that.article_class,JSON.stringify( obj ),that.skill_tag,that.content,that.html_content.replace(/[\n\r]/g,'<br>'),(this.max_catalog + 1) ) : await article_add( that.title,that.article_class,JSON.stringify( obj ),that.skill_tag,that.content,that.html_content.replace(/[\n\r]/g,'<br>'),10000000 )
      if ( result.data.code == 200 ) { this.$message({message: '添加成功'}) }
    })
  },
  components: {
    mavonEditor
  },
  watch: {
    article_class () {
      this.getMaxCatalog( this.article_class )
    }
  },
  methods: {
    changeData(value, render) {
      this.html_content = render;
    },
    async getMaxCatalog ( classes ) {
      let result = await article_max_catalog( classes )
      if ( result.data.code == 200 ) {
        this.max_catalog = result.data.data == null ? 0 : result.data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#article_write{
  position: relative;
  div.max-catalog{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 110px;
    height: 130px;
    background: $themeBG;
    color: white;
    text-align: center;
    p.head{ 
      padding: 10px 0px; 
      letter-spacing: 3px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
    p.num{
      height: 60px;
      line-height: 60px;
      font-size: 30px;
    }
  }
  div.input{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    &:nth-child(5){ margin-bottom: 40px;}
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