<template>
    <div class="paging">
        <p class="circle left" @click="decrease" :class="{disabled: page == 1}"><i class="el-icon-arrow-left"></i></p>
        <p class="page">{{ page }} / {{ max_pages }}</p>
        <p class="circle right" @click="increase" :class="{disabled: page == max_pages}"><i class="el-icon-arrow-right"></i></p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'PagingPage',
    props: ['max_pages'],
    computed: {
        ...mapGetters(
            'article', {
                page: 'page'
            }
        )
    },
    methods: {
        increase () {
            if ( this.page == this.max_pages ) return
            this.$emit('increase')
        },
        decrease () {
            if ( this.page == 1 ) return
            this.$emit('decrease')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
.paging{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    width: 100%;
    .circle{
        height: 50px;
        width: 50px;
        border-radius: 25px;
        background: $themeBG;
        text-align: center;
        line-height: 50px;
        color: white;
        font-weight: bolder;
        font-size: 24px;
        cursor: pointer;
    }
    .page{
        font-size: 20px;
    }
    .disabled{ cursor: not-allowed;}
}
</style>