<style lang="less">
    .nav-top{height: 40px;width: 100%;margin-bottom: 2px;position: fixed;background-color: #ffffff;z-index: 10;overflow: auto;}
    .nav-top li{width: 14.28%;text-align: center;color: #9a9a9a;float: left;list-style-type:none;position: relative;
        height: 36px;line-height: 36px;font-size: 15px;}
    .nav-top-active{border-bottom: 2px solid #222222;color: #222222 !important;}
    .nav-top-blank{height: 40px;}
</style>
<template>
    <ul class="nav-top">
        <li v-link="{name:'recommend', activeClass: 'nav-top-active'}">推荐</li>
        <li v-link="{name:'works-more',params: { type: 'image' }, activeClass: 'nav-top-active'}">图片</li>
        <li v-link="{name:'works-more',params: { type: 'video' }, activeClass: 'nav-top-active'}">视频</li>
        <li v-link="{name:'focus', activeClass: 'nav-top-active'}">关注</li>
        <li v-link="{name:'mix',params: { type: 'tutorial' }, activeClass: 'nav-top-active'}">教程</li>
        <li v-link="{name:'mix-more',params: { type: 'news' }, activeClass: 'nav-top-active'}">资讯</li>
        <li v-link="{name:'mix',params: { type: 'review' }, activeClass: 'nav-top-active'}">评测</li>
    </ul>
    <div class="nav-top-blank">
        
    </div>
</template>
<script>
    export default {

    };
</script>