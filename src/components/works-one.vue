<style lang="less">
    .owner{height: 36px;width: 100%;margin-top: 16px;}
    .avatar{height: 36px;width: 36px;border-radius: 18px;margin: 0 0 0 8px;}
    .nickname{vertical-align: top;font-size: 10px;color: #4a4a4a;margin: 13px 0 0 10px;
        display: inline-block;}
    .title{color: #222222;font-size: 16px;margin: 14px 0 0 0;white-space:nowrap; 
        text-overflow:ellipsis;overflow: hidden;}
    .thumbnail{margin-top: 14px;}
    .thumbnail-image-img{width: 100%;}
    .thumbnail-text-content{margin: 5px 0 5px 0;}
    .thumbnail-video-img{width: 100%;height: 200px;}
    .thumbnail-video-play{width: 33px;height: 33px;display: inline-block;
        position: relative;z-index: 3;top: -120px;left: 50%;margin-left: -16px;}
    .like-comment{height: 44px;margin-top: -4px;}
    .like-comment div{display: inline-block;width: 49%;text-align: center;height: 39px;}
    .content-like{border-right: 1px solid #dcdcdc;}
    .icon-like{width: 20px;height: 20px;margin-top: 12px;}
    .count-like{font-size: 10px;color: #dcdcdc;vertical-align: top;margin-top: 14px;display: inline-block;}
    .icon-comment{width: 20px;height: 20px;margin-top: 12px;}
    .count-comment{font-size: 10px;color: #dcdcdc;vertical-align: top;margin-top: 14px;display: inline-block;}
    .blank{height: 12px;background-color: #f2f1ef;margin-top: -5px;}
</style>
<template>
<div class="one">
    <div class="owner">
        <img class="avatar" v-bind:src="works.owner.avatar_url">
        <span class="nickname">{{works.owner.nickname}}</span>
    </div>
    <div class="title">
        {{works.title}}
    </div>
    <div class="thumbnail">
        <div v-if="works.thumbnail.type=='image'" class="thumbnail-image">
            <img class="thumbnail-image-img" v-bind:src="works.thumbnail.content.thumbnail_url">
        </div>
        <div v-if="works.thumbnail.type=='text'" class="thumbnail-text">
            <p class="thumbnail-text-content">{{works.thumbnail.content.text}}</p>
        </div>
        <div v-if="works.thumbnail.type=='ihp_v'" class="thumbnail-video">
            <img class="thumbnail-video-img" v-bind:src="works.thumbnail.content.thumbnail_url">
            <img class="thumbnail-video-play" 
            src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-video-play-c.png">
        </div>
    </div>
    <div class="like-comment">
        <div class="content-like">
            <img class="icon-like" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-unchoose.png">
            <span class="count-like">{{works.likes_count}}</span>
        </div>
        <div class="content-comment">
            <img class="icon-comment" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-comments.png">
            <span class="count-comment">{{works.comments_count}}</span>
        </div>
    </div>
    <div class="blank"></div>
</div>
</template>
<script>
    export default {
        props: ['works'],
        ready: function(){
            // console.dir(this.works);
        }
    };
</script>