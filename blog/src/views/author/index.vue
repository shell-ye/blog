<template>
	<article id="author">
        <HeadBackground type="author" text="夏叶"></HeadBackground>
        <section class="white-card">
            <div class="header">
                <img src="@/assets/img/xiaye.jpg" alt="">
                <div>
                    <p class="text">夏叶 - 前端工程师</p>
                    <p>
                        <el-tooltip class="item" effect="dark" content="QQ: 1216814604" placement="bottom">
                            <a target="_black" href="http://wpa.qq.com/msgrd?v=3&uin=1216814604&site=qq&menu=yes" class="small"><img src="@/assets/img/qq.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="bottom" content="">
                            <div slot="content"><img src="@/assets/img/weixin_code.png" style="width: 72px;height: 72px;"></div>
                            <a href="###" class="small"><img src="@/assets/img/weixin.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="bilibili 小破站" placement="bottom">
                            <a target="_black" href="https://space.bilibili.com/179603646"><img src="@/assets/img/bilibili.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="邮我" placement="bottom">
                            <a target="_black" href="mailto:15070035244@163.com" class="small"><img src="@/assets/img/mail.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="GitHub" placement="bottom">
                            <a target="_blank" href="https://github.com/shell-ye" class="small"><img src="@/assets/img/github.png"></a>
                        </el-tooltip>
                    </p>
                </div>
            </div>
            <div class="section">
                <p class="title">简介</p>
                <div class="introduce">
                    一个00后前端工程师，目前任职于南昌一家小公司的前端。喜欢唱、跳、rap、篮球和恰火锅，以及一起玩流行梗。起床困难户，10点上班给了我一个能赖床的充分理由，能九点半起床绝不八点半起床。玩最右，最右简直是沙雕们的天堂，各种神评
                    各种脑洞大开，最右的小哥哥们的脑子里都装了些什么
                </div>
            </div>
            <div class="section">
                <p class="title">基本技能</p>
                <div class="long">
                    <div v-for="(item, index) in skills.long" :key="index">
                        <p>{{ item.name }}:</p>
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="item.percentage" :color="item.color"></el-progress>
                    </div>
                </div>
                <div class="circle">
                    <div v-for="(item, index) in skills.circle" :key="index">
                        <el-progress type="dashboard" :percentage="item.percentage" :stroke-width="10" :color="item.color"></el-progress>
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <p class="title">我的项目</p>
                <div class="program">
                    <router-link tag="a" to="/">
                        <img src="@/assets/img/color_logo.png" alt="" style="width: 84px; height: 84px;">
                        <span>博客</span>
                    </router-link>
                    <a target="_black" href="https://www.apeyun.com">
                        <img src="@/assets/img/apeyun.png" alt="" style="width: 56px; height: aoto;">
                        <span>猿人云代理IP</span>
                    </a>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import HeadBackground from '@/components/article/HeadBackground'
export default {
    name: 'Author',
    data () {
        return {
            skills: {
                long: [
                    {name: 'HTML5', percentage: 90, color: '#E14C24'},
                    {name: 'CSS3', percentage: 90, color: '#016FBA'},
                    {name: 'Javascript', percentage: 80, color: '#F78132'},
                    {name: 'Bootstrap', percentage: 70, color: '#4E3773'},
                    {name: 'jQuery', percentage: 70, color: '#78CFF5'},
                    {name: 'MySQL', percentage: 40, color: '#044970'}
                ],
                circle: [
                    {name: 'Vue', percentage: 80, color: '#41B883'},
                    {name: 'Webpack', percentage: 40, color: '#55A7DD'},
                    {name: 'Node', percentage: 60, color: '#6DA55F'}
                ]
            }
        }
    },
    components: {
        HeadBackground
    }
}
</script>

<style lang="scss" scoped>
#author {
    font-size: 16px;
    margin-bottom: 40px;
    section {
        width: 1200px;
        padding: 0px 40px;
        margin: -40px auto 0px auto;
        div.header {
            width: 100%;
            display: flex;
            margin-top: -60px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > img {
                height: 120px;
                width: 120px;
                border-radius: 60px;
            }
            p.text {
                font-size: 24px;
                text-align: center;
                margin: 40px auto 10px auto;
                padding-bottom: 20px;
                border-bottom: 1px solid #000;
            }
            p {
                a {
                    margin: 0 10px;
                    img {
                        width: 36px;
                        height: 36px;
                    }
                }
                a.small img {
                    width: 28px;
                    height: 28px;
                }
            }
        }
        div.section {
            width: 80%;
            margin-bottom: 40px;
            p.title {
                margin-bottom: 60px!important;
            }
            div.introduce {
                text-indent: 2rem;
                line-height: 24px;
            }
            div.long {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                > div {
                    width: 40%;
                    margin: 20px 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    p {
                        width: 90px;
                    }
                    > div {
                        width: 70%;
                    }
                }
            }
            div.circle {
                margin-top: 60px;
                display: flex;
                justify-content: space-around;
                text-align: center;
                font-size: 24px;
            }
            div.program {
                display: flex;
                justify-content: center;
                a {
                    margin: 0 30px;
                    color: #000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>