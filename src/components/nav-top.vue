<style lang="less">
    .list-ul{height: 40px;width: 100%;padding-bottom: 2px;}
    .list-ul li{display: inline-block;width: 14.2857%;text-align: center;color: #9a9a9a;
        height: 38px;line-height: 36px;font-size: 15px;}
    .custom-active-class{border-bottom: 2px solid #222222;color: #222222 !important;}
</style>
<template>
    <ul class="list-ul">
        <li v-link="{name:'recommend', activeClass: 'custom-active-class'}">推荐</li>
        <li v-link="{name:'works-more',params: { type: 'image' }, activeClass: 'custom-active-class'}">图片</li>
        <li v-link="{name:'works-more',params: { type: 'video' }, activeClass: 'custom-active-class'}">视频</li>
        <li v-link="{name:'focus', activeClass: 'custom-active-class'}">关注</li>
        <li v-link="{name:'mix',params: { type: 'tutorial' }, activeClass: 'custom-active-class'}">教程</li>
        <li v-link="{name:'mix',params: { type: 'review' }, activeClass: 'custom-active-class'}">评测</li>
        <li v-link="{name:'mix-more',params: { type: 'news' }, activeClass: 'custom-active-class'}">资讯</li>
    </ul>
</template>
<script>
    export default {
        props: ['type'],
        ready: function(){
            // console.log(this.type);
        }
    };
</script>