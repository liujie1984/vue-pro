<style lang="less">
    .tag-one{height: 64px;border-bottom: 1px solid #dcdcdc;}
    .tag-one-img{width: 40px;height: 40px;margin: 12px 10px 0 10px;float: left;}
    .tag-one-left{height: 40px;float: left;margin: 12px 0 0 0;}
    .tag-one-left-top{height: 24px;}
    .tag-one-name{font-size: 16px;color: #222222;}
    .tag-one-hot{height: 15px;width: 15px;margin-top: 4px;vertical-align: top;}
    .tag-one-count{height: 16px;line-height: 16px;font-size: 12px;display: inline-block;background: #dcdbdb;border-radius: 4px;
        padding: 0 4px 0 4px;text-align: center;color: #ffffff;}
    .tag-one-deal{height: 20px;float: right;margin: 22px 10px 0 0;position: relative;font-size: 14px;
        color: #222222;padding: 1px 6px 1px 6px;display: inline-block;line-height: 20px;}
    .tag-one-deal-border{border: 1px solid #222222;}

    .tag-one-deal-img{width: 20px;height: 20px;float: right;margin: 22px 10px 0 0;position: relative;}
</style>
<template>
    <div class="tag-one">
        <div style="float: left;" v-link="{name:'tag-detail',params: { id: tag.tag_id }}">
        <img class="tag-one-img" v-bind:src="tag.thumbnail_url"> 
       <div class="tag-one-left">
           <div class="tag-one-left-top">
               <span class="tag-one-name">{{tag.tag_name}}</span>
               <img class="tag-one-hot" v-if="tag.is_hot==1" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-hot.png">
           </div>
           <div class="tag-one-count">{{tag.referenced_count}}</div>
       </div>
        </div>

       <span v-if="type=='text'" class="tag-one-deal" v-on:click="dealFollowTag" v-bind:class="{'tag-one-deal-border': status=='unfollow'}">{{statusContent}}</span>
       <img v-if="type=='image'" class="tag-one-deal-img" v-bind:src="dealImgUrl" v-on:click="dealFollowTag">
    </div>
    
    
</template>
<script>
    export default {
        props: ['tag','status','type'],
        data:function(){
            return {
                dealImgUrl:'',
                statusContent:'',

            }
        },
        ready: function(){
            if(this.status == 'followed'){
                this.statusContent = '已关注';
                this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-already.png'; 
            }else if(this.status=='unfollow'){
                this.statusContent = '+关注';
                this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-add.png'; 
            }else if(this.status == 'unknown'){
                if(this.tag.is_followed==1){
                    this.status = 'followed';
                    this.statusContent = '已关注';
                    this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-already.png'; 
                }else{
                    this.status = 'unfollow'
                    this.statusContent = '+关注';
                    this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-add.png';
                }
            }
        },
        watch:{
            'status': function(){
                if(this.status == 'followed'){
                    this.statusContent = '已关注';
                    this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-already.png'; 
                }else if(this.status=='unfollow'){
                    this.statusContent = '+关注';
                    this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-add.png'; 
                }  
            },
        },
        methods:{
            dealFollowTag: function(){
                if(this.status=='followed'){
                    this.postUnfollowTag();                   
                }else if(this.status=='unfollow'){
                    this.postFollowTag();
                }
            },
            getFollowTagUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/flower.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/follow_one_tag';
                }
                return url;
            },
            postFollowTag: function(){
                let url = this.getFollowTagUrl();
                let token = JSON.parse(sessionStorage.getItem('userData')).token;
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {tag_id:this.tag.tag_id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.status = 'followed'; 
                    }
                });
            },
            getUnfollowTagUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/flower.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/unfollow_one_tag';
                }
                return url;
            },
            postUnfollowTag: function(){
                let url = this.getUnfollowTagUrl();
                let token = JSON.parse(sessionStorage.getItem('userData')).token;
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {tag_id:this.tag.tag_id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.status = 'unfollow';
                    }
                });
            },
        },
    };
</script>