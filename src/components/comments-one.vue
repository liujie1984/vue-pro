<style lang="less">
    .comments-one{padding: 0 10px 0 0;clear: both;}
    .comment-left{float: left;display: inline-block;}
    .comment-left img{width: 36px;height: 36px;border-radius: 18px;margin: 0 10px 0 10px;}
    .comments-right{position: relative;margin-left: 56px;border-bottom: 1px solid #dcdcdc;}
    .comments-right-top{height: 16px;margin-top: 10px;}
    .comments-right-top span{height: 16px;line-height: 16px;vertical-align: top;display: inline-block;}
    .comments-owner-nickname{font-size: 15px;color: #3b4554;}
    .comments-created{font-size: 12px;color: #9a9a9a;float: right;}
    .comments-content{font-size: 13px;color: #9a9a9a;margin-top: 10px;padding-bottom: 10px;min-height: 13px;}
    .comments-content span{font-size: 13px;color: #9a9a9a;}
</style>
<template>
    <div class="comments-one" v-on:click="commentclick">
        <div class="comment-left" v-link="{name:'person-other',params: { id: comment.owner.user_id}}">
            <img v-bind:src="comment.owner.avatar_url">
        </div>
        <div class="comments-right">
            <div class="comments-right-top">
                <span class="comments-owner-nickname">{{comment.owner.nickname}}</span>
                <span class="comments-created">{{comment.created_at}}</span>
            </div>
            <p class="comments-content"><span v-if="comment.reply_to!=null"><span>回复</span><span style="margin: 0 5px 0 5px;color:#3a9df9;">{{comment.reply_to.nickname}}:</span></span>{{comment.content}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['comment'],
        data:function(){
            return {
                childMsg:''
            }
        },
        ready: function(){
            this.comment.created_at = this.timestampToStr(this.comment.created_at);
            // console.dir(this.comment);
        },
        methods:{
            timestampToStr: function(timestamp){
                var unixTimestamp = new Date(timestamp * 1000) ;
                var d = new Date(timestamp * 1000);
                var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+
                (d.getDate())+" "+(d.getHours()-8)+":"+(d.getMinutes());
                return jstimestamp;
            },
            commentclick: function(){
                this.childMsg = this.comment;
                this.$dispatch('comment-click-msg', this.childMsg);
                // console.dir(this.childMsg);
            },
        },
    };
</script>