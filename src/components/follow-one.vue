<style lang="less">
    .follow-one{height: 60px;border-bottom: 1px solid #dcdcdc;}
    .follow-one-user{height: 36px;margin: 12px 0 0 10px;float: left;}
    .follow-one-avatar{width: 36px;height: 36px;border-radius: 25px;}
    .follow-one-nickname{display: inline-block;height: 36px;line-height: 36px;font-size: 16px;vertical-align: top;margin-left: 10px;}
    .follow-one-deal{width: 30px;height: 30px;float: right;margin: 15px 10px 0 0;}


    .follow-focus-one-avatar{width: 36px;height: 36px;border-radius: 25px; float: left;margin: 12px 10px 0 10px;}
    .follow-focus-one-name{float: left;height: 36px;margin-top: 12px;}
    .follow-focus-one-nickname{color: #222222;font-size: 16px;line-height: 20px;height: 20px;}
    .follow-focus-recommend-text{background-color: #88bbc4;color: #ffffff;font-size: 12px;padding: 1px 4px 1px 4px;border-radius: 3px;
        line-height: 16px;height: 16px;display: inline-block;}
    .follow-focus-one-deal{height: 20px;float: right;margin: 22px 10px 0 0;position: relative;font-size: 14px;line-height: 20px;
        color: #222222;padding: 1px 6px 1px 6px;}
    .follow-focus-one-deal-border{border: 1px solid #222222;}
</style>
<template>
    <div v-if="type=='follow'||type=='flower'" class="follow-one">
        <div class="follow-one-user" v-link="{name:'person', params: { id: follow.user_id }}">
            <img v-bind:src="follow.avatar_url" class="follow-one-avatar">
            <span class="follow-one-nickname">{{follow.nickname}}</span>
        </div>
        <img v-bind:src="dealImgUrl" class="follow-one-deal" v-on:click="dealFollow">
    </div>

    <div v-if="type=='focus'" class="follow-one">
        <img class="follow-focus-one-avatar" v-bind:src="follow.user.avatar_url">
        <div class="follow-focus-one-name">
            <p class="follow-focus-one-nickname">{{follow.user.nickname}}</p>
            <p class="follow-focus-recommend-text">{{follow.recommend_text}}</p>
        </div>
        <span class="follow-focus-one-deal" v-on:click="dealFollow" v-bind:class="{'follow-focus-one-deal-border': status=='unfollow'}">
            {{statusContent}}
        </span>
    </div>
</template>
<script>
    export default {
        props: ['follow','type'],
        data:function(){
            return {
                dealImgUrl:'',
                statusContent:'',
                status:'',
                userId:'',
            }
        },
        created: function(){
            if(this.type=='flower'||this.type=='follow'){
                this.userId = this.follow.user_id;
                if(this.follow.is_followed ==1){
                    if(this.follow.is_my_follower ==1){
                        this.status = 'followtwo';
                    }else{
                        this.status = 'followed';
                    } 
                }else if(this.follow.is_followed==null){
                    this.status = 'unfollow';
                }

            }else if(this.type=='focus'){
                this.userId = this.follow.user.user_id;
                this.status = 'unfollow';
            }   
        },
        ready: function(){
            // console.dir(this.follow);
            // console.dir(this.type);
        },
        watch:{
            'status': function(){
                if(this.status == 'followed'){
                    this.statusContent = '已关注';
                    this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-already.png'; 
                }else if(this.status=='unfollow'){
                    this.statusContent = '+关注';
                    this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow-add.png'; 
                }else if(this.status=='followtwo'){
                    this.statusContent = '已关注';
                    this.dealImgUrl = 'http://7xqamv.com2.z0.glb.qiniucdn.com/icon-follow2.png'; 
                }
                
            }
        },
        methods:{
            dealFollow: function(){
                if(this.status == 'unfollow'){
                    this.postFollow();
                }else if(this.status == 'followed'){
                    this.postUnfollow();
                }else if(this.status == 'followtwo'){
                    this.postUnfollow();
                }
            },
            getFollowUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/flower.json';
                }else{
                    url = localStorage.getItem('apphost') + 'api/follow_someone';
                }
                return url;
            },
            postFollow: function(){
                let url = this.getFollowUrl();
                let token = JSON.parse(sessionStorage.getItem('userData')).token;
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {user_id:this.userId},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        if(this.type=='flower'||this.type=='follow'){
                            if(this.follow.is_my_follower==1){
                                this.status = 'followtwo';
                            }else{
                                this.status = 'followed';                              
                            }
                        }else if(this.type=='focus'){
                            this.status = 'followed';
                        }
                    }
                });
            },
            getUnfollowUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/flower.json';
                }else{
                    url = localStorage.getItem('apphost') + 'api/unfollow_someone';
                }
                return url;
            },
            postUnfollow: function(){
                let url = this.getUnfollowUrl();
                let token = JSON.parse(sessionStorage.getItem('userData')).token;
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {user_id:this.userId},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.status = 'unfollow';
                    }
                });
            },
        },
    };
</script>