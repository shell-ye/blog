<template>
  <div id="article_manage">
    <div class="input">
      <p>
        <span>选择文章类型:</span>
        <el-select v-model="article_tags" placeholder="请选择">
          <el-option label="全部" value="全部">全部</el-option>
          <el-option v-for="item in article_info.article_tags" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </p>
      <el-button type="primary" @click="list">搜索</el-button>
    </div>
    <div class="long_list">
      <ul>
        <li>
          <div><i class="iconfont iconid"></i>文章ID</div>
          <div><i class="iconfont iconbiaoti"></i>文章标题</div>
          <div><i class="iconfont iconfenlei-active"></i>文章分类</div>
          <div><i class="iconfont iconzanpress"></i>点赞次数</div>
          <div><i class="iconfont iconliulan"></i>浏览次数</div>
          <div><i class="iconfont icontime"></i>创建时间</div>
          <div><i class="iconfont icontime"></i>更新时间</div>
          <div><i class="iconfont iconcaozuo"></i>操作</div>
        </li>
        <li v-for="(item,index) in article_list" :key="item.id" v-if="article_list && article_list.length">
          <div>{{ item.id }}</div>
          <div>{{ item.title }}</div>
          <div>{{ item.article_class }}</div>
          <div>{{ item.likes_count }}</div>
          <div>{{ item.view_count }}</div>
          <div>{{ item.publish_time | timeDate }}</div>
          <div>{{ item.update_time | timeDate }}</div>
          <div>
            <el-button type="primary" @click="update( item.id )">修改</el-button>
            <el-button type="danger" @click="delDia( index )">删除</el-button>
          </div>
        </li>
        <li class="page" v-if="article_list && article_list.length"><el-input-number v-model="pages" @change="handleChange" size="small" :min="1" :max="max_page" label="描述文字"></el-input-number></li>
        <li class="no-data" v-if="article_list.length == 0"><p>暂无记录</p></li>
      </ul>
    </div>

    <!-- 删除弹窗  -->
    <el-dialog
      title="提示"
      :visible.sync="delete_dialog"
      :close-on-click-modal="false">
      <div slot="footer" class="dialog-footer">
      <div style="margin: 20px 0px;">确定要删除这篇文章吗?</div>
      <div class="btn-list">
        <el-button @click="delete_dialog = false">取 消</el-button>
        <el-button type="danger" @click="del">确 定</el-button>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import defaults from '@/defaults/index'
import { article_list, article_delete } from '@/axios/article'
export default {
  data () {
    return {
      article_info: {},
      article_tags: '全部',
      article_list: [],
      out_index: 0,
      pages: 1,
      max_page: 0,
      // 删除弹窗
      delete_dialog: false
    }
  },
  activated () {
    this.article_info = defaults
    this.list()
  },
  watch: {
    pages () {
      this.list()
    }
  },
  methods: {
    async list () {
      let result = this.article_tags != '全部' ? await article_list( 2,this.pages,12,this.article_tags ) : await article_list( 1,this.pages,12 )
      if ( result.data.code == 200 ) {
        this.article_list = result.data.data
        this.max_page = Math.ceil( result.data.pages_info.count / 12 )
        if ( !this.article_list || !this.article_list.length ) {
          this.pages = 1
        }
      }
    },
    delDia ( index ) {
      this.out_index = index
      this.delete_dialog = true
    },
    async del () {
      let result = await article_delete( this.article_list[this.out_index].id ) 
      if ( result.data.code == 200 ) {
        await this.list()
        this.delete_dialog = false
        this.$message({message: '删除成功'})
      }
    },
    update ( id ) {
      this.$store.commit('changeArticleID',id)
      this.$router.push({ path: '/user/article/update', query: {id}})
    },
    handleChange () {
      console.log(132)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
#article_manage{
  div.input{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    p{
      min-width: 400px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span{ 
        display: block;
        width: 120px;
      }
    }
  }
  div.long_list{
    ul{
      li{
        div{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 12.5%;
          min-width: 100px;
          text-align: center;
          &:nth-child(2){ min-width: 300px;}
          &:last-child{ min-width: 200px;}
        }
      }
    }
  }
}
</style>