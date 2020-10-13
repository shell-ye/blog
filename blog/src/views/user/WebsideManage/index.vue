<template>
    <section id="webside-manage">
        <div class="title">网站管理</div>
        <div class="white-card item" ref="friendLink">
            <div class="head"><span>添加友情链接</span><router-link tag="a" to="/user/friendlinks/manage">管理 ></router-link></div>
            <div class="operation">
                <div class="row">
                    <p>链接分类</p>
                    <el-select v-model="friend_link.select_classes" placeholder="请选择">
                        <el-option v-for="item in friend_link.classes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="row">
                    <p>网站名称</p>
                    <el-input v-model="friend_link.name" placeholder="网站名称"></el-input>
                </div>
                <div class="row">                    
                    <p>短句介绍</p>
                    <el-input v-model="friend_link.remarks" placeholder="短句介绍"></el-input>
                </div>
                <div class="row">                    
                    <p>网站地址</p>
                    <el-input v-model="friend_link.href" placeholder="网站地址"></el-input>
                </div>
                <div class="row upload-head">
                    <p>选择头像</p>
                    <label><input type="file" id="friend-head"></label>
                    <span>头像为 65px * 65px 大小的图片,文件名只能含有一个'.'</span>
                </div>
                <div class="btn-list">
                    <el-button type="primary" @click="friendLinkHandler('add')">添加</el-button>
                    <el-button @click="friendLinkHandler('reset')">重置</el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { uploadFriendLink, uploadFriendHead } from '@/axios/web'
export default {
    name: 'WebsideManage',
    data () {
        return {
            friend_link: {
                classes: [
                    { label: '漂亮的', value: 'beautiful' },
                    { label: '技术类', value: 'technology' },
                    { label: '朋友类', value: 'friend' },
                    { label: '工具类', value: 'tool' }
                ],
                select_classes: '',
                name: '',
                remarks: '',
                href: ''
            }
        }
    },
    methods: {
        async friendLinkHandler ( type ) {
            let file = document.querySelector('#friend-head')
            if ( type == 'reset' ) {
                this.friend_link = {
                    classes: [
                        { label: '漂亮的', value: 'beautiful' },
                        { label: '技术类', value: 'technology' },
                        { label: '朋友类', value: 'friend' },
                        { label: '工具类', value: 'tool' }
                    ],
                    select_classes: '',
                    name: '',
                    remarks: '',
                    href: ''
                }
                file.FileList = {}
            } else if ( type == 'add' ) {
                // 信息
                let result = await uploadFriendLink( this.friend_link.select_classes, this.friend_link.name, this.friend_link.remarks, this.friend_link.href )
                if ( result.data.code == 200 ) {
                    let upload = this.$refs.friendLink.querySelector('#friend-head')
                    if ( !upload.files[0] ) { return this.$message({ type: 'error', message: '您还未选择图片'})}
                    let params = new FormData()
                    params.append( 'head_img',upload.files[0] )
                    params.append( 'token',this.$store.state.webside.token )
                    await uploadFriendHead( params )
                    await this.$store.dispatch('webside/getFriendLinks')
                    this.$message({
                        type: 'success',
                        message: '上传成功'
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#webside-manage {
    .title {
        font-size: 36px;
        margin-bottom: 40px;
    }
    .item {
        margin-left: 0;
        margin-right: 0;
        .head {
            border-left: 5px solid $elementBlue;
            padding-bottom: 0;
            line-height: 26px;
            padding-left: 10px;
            border-bottom: none;
            margin: 20px 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .operation {
            display: flex;
            flex-wrap: wrap;
            .row {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;
                p {
                    width: 100px;
                }
                > div {
                    max-width: 600px;
                }
            }
            label{
                align-self: center;
                width: 88px;
                height: 36px;
                cursor: pointer;
                background: url(~@/assets/img/select_img.png);
                input{
                    width: 1px;
                    height: 1px;
                    opacity: 0;
                }
            }
            .row.upload-head {
                span {
                    color: #999;
                    margin-left: 20px;
                }
            }
            .btn-list {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>