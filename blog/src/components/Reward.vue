<template>
    <div class="reward">
        <div class="content">
            <img src="@/assets/img/reward.png" alt="" @click="reward_dia = true">
            <p>这篇文章对您有帮助吗，有的话能不能打赏作者一下呢？</p>
        </div>

        <el-dialog title="扫一扫打赏" :visible.sync="reward_dia" v-if="reward_dia" width="400px" :modal-append-to-body="false">
            <div slot="footer" class="dialog-footer">
                <img v-if="pay_type == 'alipay'" src="@/assets/img/alipaycode.jpg" alt="">
                <img v-if="pay_type == 'wechatpay'" src="@/assets/img/wechatpaycode.jpg" alt="">
                <div class="pay-type">
                    <i class="iconfont iconzhifubaozhifu" :class="{select: pay_type == 'alipay'}" @click="pay_type = 'alipay'"></i>
                    <i class="iconfont iconweixinzhifu" :class="{select: pay_type == 'wechatpay'}" @click="pay_type = 'wechatpay'"></i>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            reward_dia: false,
            pay_type: 'alipay'
        }
    }
}
</script>

<style lang="scss" scoped>
.reward {
    .content {
        padding: 40px 0px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img {
            width: 64px;
            height: 64px;
            margin-bottom: 20px;
            cursor: pointer;
        }
        p {
            text-align: center;
            font-size: 14px;
            color: gray;
        }
    }
    .dialog-footer {
        img {
            width: 360px;
            height: 406px;
            margin-bottom: 10px;
        }
        .pay-type {
            display: flex;
            justify-content: space-around;
            i {
                font-size: 36px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 50%;
                cursor: pointer;
            }
            i.iconzhifubaozhifu {
                color: rgb(6, 180, 253);
            }
            i.iconweixinzhifu {
                color: rgb(0, 200, 1);
            }
            i.select {
                border-color: blue;
            }
        }
    }
}
</style>