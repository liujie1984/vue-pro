<style lang="less">
    .detail-one-text{font-size: 14px;color: #737373;line-height: 18px;margin: 10px;}
    .detail-one-thumbnail{width: 100%;}
    .detail-one-ihpv{margin: 10px;}
    .video-paly-icon{height: 30px;width: 30px;z-index: 10;position: relative;left: 50%;margin-left: -15px;display: inline-block;top: -50px;}
    .detail-one-youkuv{margin: 10px;}
    .detail-one-youkuv-iframe{width: 100%;}
</style>
<template>
    <div class="detail-one">
        <p v-if="detail.type=='text'" class="detail-one-text">{{detail.content.text}}</p>
        <img v-if="detail.type=='image'" v-bind:src="detail.content.thumbnail_url" class="detail-one-thumbnail">
        <div v-if="detail.type=='ihp_v'" class="detail-one-ihpv">
            <video width="100%" v-bind:style="{height: videoHeight + 'px' }" v-bind:poster="detail.content.thumbnail_url" controls>
                <source v-bind:src="detail.content.play_url" type="video/mp4">
            </video>
<!--             <img class="video-paly-icon" v-on:click="videoPlay" v-bind:style="{ marginTop: '-15px',top: iconTop}" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-video-play-c.png"> -->
        </div>
        <div v-if="detail.type=='youku_v'" class="detail-one-youkuv">
            <iframe class="detail-one-youkuv-iframe" v-bind:src="detail.content.play_url" v-bind:style="{height: iframeHeight + 'px' }" allowfullscreen scrolling="no"></iframe>
        </div>

    </div>
</template>
<script>
    export default {
        props: ['detail'],
        data:function(){
            return {
                iframeHeight:'',
                videoHeight:'',
                iconTop:'',
            }
        },
        ready: function(){
            this.iframeHeight = document.body.clientWidth*9/16;
            this.videoHeight = document.body.clientWidth*9/16;
            this.iconTop = -this.videoHeight/2+'px';
        },
        methods: {
            videoPlay: function (event) {
                event.path[1].children[0].play();
                // console.dir(event.path[1].children[0]);
            }
        }
    };
</script>