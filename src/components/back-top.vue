<style lang="less">
    .back-top{width: 50px;height: 50px;position: fixed;bottom: 60px;right: 10px;background: transparent;}
</style>
<template>
    <img src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-backtop.png" class="back-top" v-on:click="backTop">
</template>
<script>
    export default {
        data:function(){
            return {
                isBackTopShow: false,
            }
        },
        ready: function(){

        },
        methods:{
            backTop: function(event){
                document.body.scrollTop = 0;
                // this.scrollTopReduction();
            },
            scrollTopReduction : function(){
                for(var i=0;document.body.scrollTop>0;i++){
                    document.body.scrollTop = document.body.scrollTop - i/100000;
                    // console.dir(document.body.scrollTop);
                }
            },
        },
    }
</script>


