<style lang="less">
    #banner{width:100%;height:140px;overflow:hidden;}
    #banner-image{height:140px;width:100%;}
    #banner-choose{margin-top:-25px;height:10px;text-align:center;}
    #banner-choose li{display: inline-block;width: 5px;height: 5px;border-radius: 5px;
        background-color: white;margin:0 3px 0 3px;}
</style>
<template>
<div id="banner">
    <img id="banner-image" v-touch:swipe="onSwipe" v-touch-options:swipeleft="{threshold: 200}" v-bind:src="bannerList[bannerNum].image">
    <ul id="banner-choose">
        <li v-for="bannerList in bannerList" id="{{bannerList.item_id}}"></li>
    </ul>   
</div>
</template>
<script>
    export default {
        props: ['bannerList'],
        data: function(){
            return {
                bannerNum:0
            }
        },
        methods:{
            bannerChange:function(){

            },
            onSwipe: function (e) {
                var bannerLength = this.bannerList.length;
                if(this.bannerNum<bannerLength-1){
                    this.bannerNum++;
                }else{
                    this.bannerNum=0;
                }
                console.dir(this.bannerList);
                console.dir(e.deltaX);
            }
        }
    };
</script>