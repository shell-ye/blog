<template>
  <div id="article_write">    
    <div class="input"><span>标题:</span><el-input size="medium" v-model="title"></el-input></div>
    <div class="input">
      <span>文章图片:</span>
      <el-select v-model="article_img" placeholder="请选择">
        <el-option v-for="item in article_info.article_tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="input">
      <span>技能标签:</span>
      <el-select v-model="skill_tag" placeholder="请选择">
        <el-option v-for="item in article_info.skill_tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="input">
      <span>文章分类:</span>
      <el-checkbox v-for="item in article_info.article_tags" :key="item.value" v-model="article_tags" :label="item.label" border size="medium"></el-checkbox>
    </div>
    <mavon-editor :toolbars="markdownOption" v-model="content" @change="changeData" />
  </div>
</template>

<script>
import bus from '@/bus'
import defaults from '@/defaults/index'
import { article_search,article_update } from '@/axios/article'

import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
    data () {
        return {
            article_info: {},
            title: '',
            article_img: '',
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
        let that = this
        bus.$on('update_submit', async () => {
            let obj = {}
            for ( let prop in this.article_tags ) {
                obj[prop] = this.article_tags[prop]
            }
            // obj = JSON.stringify(obj)
            let result = await article_update( that.$store.state.article_id, that.title, that.article_img, JSON.stringify( obj ), that.skill_tag, that.content, that.html_content.replace(/[\n\r]/g,'<p></p>') )
            // let result = await article_update( that.$store.state.article_id, that.title, that.article_img, JSON.stringify( obj ), that.skill_tag, that.content, that.html_content )
            if ( result.data.code == 200 ) { this.$message({message: '更新成功'}) }
        })
    },
    async activated () {
        this.article_info = defaults 
        if ( this.$store.state.article.article_id ) {
            // search: 1-id
            let result = await article_search(1,this.$store.state.article.article_id)
            if ( result.data.code == 200 ) {
                this.title = result.data.data.title
                this.article_img = result.data.data.article_img
                this.content = result.data.data.content
                this.skill_tag = result.data.data.skill_tag
                let arr = []
                for ( let prop in JSON.parse( result.data.data.article_tags ) ) {
                    arr.push(JSON.parse( result.data.data.article_tags )[prop])
                }
                this.article_tags = arr
            }
        }
    },
    components: {
      mavonEditor
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