<style lang="less">

</style>
<template>

</template>
<script>
    export default {
        props: ['banner'],
        data: function(){
            return {
                bannerNum:0,
                bannerImg:''            
            }
        },
        ready:function(){
            this.bannerImg = this.banner[this.bannerNum].image;
        },
        computed: {
            bannerImg:function(){
                return this.banner[this.bannerNum].image;
            }

            // 'banner':function(){
            //      console.dir(this.banner);

            // }
        },

    };
</script>