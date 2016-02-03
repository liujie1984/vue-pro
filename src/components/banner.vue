<style lang="less">
    #banner{width:100%;height:140px;overflow:hidden;}
    #banner-image{height:140px;width:100%;}
    #banner-choose{margin-top:-25px;height:10px;text-align:center;}
    #banner-choose li{display: inline-block;width: 5px;height: 5px;border-radius: 5px;
        background-color: white;margin:0 3px 0 3px;}
</style>
<template>
<div id="banner">
    <img id="banner-image" v-touch:swipe="onSwipe" v-touch-options:swipeleft="{threshold: 200}" v-bind:src="bannerList[0].image">
    <ul id="banner-choose">
        <li v-for="bannerList in bannerList" id="{{bannerList.item_id}}"></li>
    </ul>   
</div>
</template>
<script>
    export default {
        props: ['bannerList'],
        methods:{
            bannerChange:function(){

            },
            onSwipe: function (e) {
                console.dir(e.deltaX);
                // this.event = e.type;
            }
        }
    };
</script>