<template>
    <div>{{ article }}</div>
</template>

<script>
import { article_search } from '@/axios/article'
export default {
    async asyncData ({ params }) {
        console.log( params )
        let result = await article_search( 1,params.id )
        if ( result.data.code == 200 ) {
            let res = {}
            res.article = result.data.data
            return res
        }
    }
}
</script>

<style>

</style>