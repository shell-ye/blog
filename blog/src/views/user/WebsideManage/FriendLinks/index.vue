<template>
    <section id="firend-link-manage">
        <div class="title">管理友情链接</div>
        <div class="long_list">
        <ul>
            <li>
                <div><i class="iconfont iconid"></i>ID</div>
                <div><i class="iconfont iconbiaoti"></i>名称</div>
                <div><i class="iconfont iconfenlei-active"></i>类别</div>
                <div><i class="iconfont iconcaozuo"></i>操作</div>
            </li>
            <li v-for="(item,index) in friend_links" :key="item.id" v-if="friend_links.length">
                <div>{{ item.id }}</div>
                <div>{{ item.name }}</div>
                <div>{{ item.class }}</div>
                <div>
                    <el-button type="danger" @click="delDia( index )">删除</el-button>
                </div>
            </li>
            <li class="no-data" v-if="friend_links.length == 0"><p>暂无记录</p></li>
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
    </section>
</template>

<script>
import { mapState } from 'vuex'
import { delFriendLink, changeFriendLink } from '@/axios/web'
export default {
    data () {
        return {
            out_index: '',

            // 删除弹窗
            delete_dialog: false
        }
    },
    activated () {
        if ( !this.friend_links.length ) {
            this.$store.dispatch('webside/getFriendLinks')
        }
    },
    watch: {
        pages () {
            this.list()
        }
    },
    computed: {
        ...mapState({            
            'friend_links': state => state.webside.friend_links
        })
    },
    methods: {
        delDia ( index ) {
            this.out_index = index
            this.delete_dialog = true
        },
        async del () {
            let result = await delFriendLink( this.friend_links[this.out_index].id )
            if ( result.data.code == 200 ) {
                await this.$store.dispatch('webside/getFriendLinks')
                this.delete_dialog = false
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
#firend-link-manage{
    .title {
        font-size: 36px;
        margin-bottom: 40px;
    }
    div.long_list{
        ul{
            li{
                div{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 25%;
                    min-width: 100px;
                    text-align: center;
                }
            }
        }
    }
}
</style>