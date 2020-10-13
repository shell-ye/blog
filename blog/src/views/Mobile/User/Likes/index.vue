<template>
    <article id="mobile-user-likes">
        <ImgCard v-for="(item, index) in article_list" :key="index" :article="item" shape="square"></ImgCard>
    </article>
</template>

<script>
import user from '@/mixin/user'
import ImgCard from '@/components/article/ImgCard'
import { article_user_like } from '@/axios/article'
import { mapState } from 'vuex'
export default {
    name: 'MobileUserLiikes',
    mixins: [user],
    data () {
        return {
            article_list: []
        }
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    async activated () {
        let result = await article_user_like( 1, this.userData.id )
        if ( result.data.code == 200 ) {
            this.article_list = result.data.data
        }
    },
    components: {
        ImgCard
    }
}
</script>

<style lang="scss" scoped>
#mobile-user-likes {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>