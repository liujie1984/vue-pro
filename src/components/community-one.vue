<style lang="less">
    .community-one{border-bottom: 1px solid #dcdcdc;}
    .community-one-title{font-size: 16px;line-height: 20px;max-height: 60px;margin: 10px;overflow: hidden;
        -webkit-line-clamp:2;-webkit-box-orient: vertical;display: -webkit-box;}
    .community-one-title-icon{}
    .community-one-title-icon span{font-size: 16px;font-weight: bolder;line-height: 20px;height: 20px;}
    .community-one-content{height: 50px;}
    .community-one-face{height: 30px;vertical-align: top;margin: 10px;float: left;}
    .community-one-avatar{height: 22px;width: 22px;border-radius: 22px;}
    .community-one-avatar-vip{width: 10px;height: 10px;position: relative;margin: 0 0 0 -8  px;}
    .community-one-info{float: left;margin: 5px 0 0 0;}
    .community-one-nickname{height: 18px;line-height: 18px;font-size: 12px;}
    .community-one-pubdate{height: 12px;line-height: 12px;font-size: 9px;color: #9a9a9a;}

    .community-one-likecomment{float: right;height: 50px;vertical-align: top;margin: 0 10px 0 0;}
    .community-one-likecomment-icon{height: 12px;width: 12px;margin: 19px 4px 0 4px;display: inline-block;vertical-align: top;}
    .community-one-likecomment-count{font-size: 12px; color: #9a9a9a;height: 16px;line-height: 16px;margin: 17px 0 0 0;display: inline-block;vertical-align: top;}

    .community-one-nouser-pubdate{height: 50px; line-height: 50px;font-size: 9px;color: #9a9a9a;float: left;padding-left: 10px;}
</style>
<template>
    <div class="community-one">
        <div class="community-one-title" v-link="{name:'works-detail',params: { id: communitys.pub_id}}">
            <span class="community-one-title-icon" v-if="communitys.common_flags.labels!=null">
                <span v-for="label in communitys.common_flags.labels" v-bind:style="{ color: '#'+label.color}">
                    {{label.text}}
                </span>
            </span>
            {{communitys.title}}
        </div>
        <div class="community-one-content">
            <div class="community-one-left" v-link="{name:'person-other',params: { id: communitys.owner.user_id}}">
                <div v-if="type!='nouser'" class="community-one-face">                
                    <img class="community-one-avatar" v-bind:src="communitys.owner.avatar_url">
                    <img v-if="communitys.owner.is_vip==1" class="community-one-avatar-vip" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-is-vip.png">
                </div>
                <p v-if="type =='nouser'" class="community-one-nouser-pubdate">{{communitys.pub_date}}</p>
                <div v-if="type!='nouser'" class="community-one-info">
                    <p class="community-one-nickname">{{communitys.owner.nickname}}</p>
                    <p class="community-one-pubdate">{{communitys.pub_date}}</p>
                </div>
            </div>
            <div class="community-one-likecomment">
                <span class="community-one-like" v-on:click="dealLike">
                    <img class="community-one-likecomment-icon" v-bind:src="likedImgSrc">
                    <span class="community-one-likecomment-count">{{communitys.likes_count}}</span>
                </span>
                <span class="community-one-comment" v-link="{name:'works-detail',params: { id: communitys.pub_id}}">
                    <img class="community-one-likecomment-icon" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-comments.png">
                    <span class="community-one-likecomment-count">{{communitys.comments_count==0 ? '评论' : communitys.comments_count}}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['communitys','type'],
        data:function(){
            return {
                likedImgSrc:'',
                isLiked:''
            }
        },
        created: function(){
            // console.dir(this.communitys);
            this.communitys.pub_date = this.timestampToStr(this.communitys.pub_date);
            if(this.communitys.my_flags!=null){
                if(this.communitys.my_flags.is_liked==1){
                    this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-choose.png';
                    this.isLiked=1;
                }
            }else{
                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-unchoose.png';
                this.isLiked=0;
            } 

        },
        ready: function(){

        },
        methods:{
            dealLike: function(){
                if(this.getCookie('user_verify')!=null&&this.getCookie('user_verify')!=''&&this.getCookie('user_verify')!=undefined) {
                    if(this.isLiked==1){
                        let unlikeUrl = this.getUnlikeUrl();
                        this.$http({url: unlikeUrl, method: 'POST',data: {type:'pub',id:this.communitys.pub_id},xhr:{withCredentials:true},}).then(function (response) {
                            if(response.data.code==0){
                                this.isLiked=0;
                                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-unchoose.png';
                                this.communitys.likes_count--;
                            }
                        });
                    }else{
                        let likeUrl = this.getLikeUrl();
                        this.$http({url: likeUrl, method: 'POST',data: {type:'pub',id:this.communitys.pub_id},xhr:{withCredentials:true},}).then(function (response) {
                            if(response.data.code==0){
                                this.isLiked=1;
                                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-choose.png';
                                this.communitys.likes_count++;
                            }
                        });
                    }
                }else{

                    let nowHref =window.location.href;
                    let redirectUrl = nowHref.split('!')[1];
                    // console.dir(redirectUrl);
                    this.$route.router.go('/login?redirect=' + redirectUrl);
                }
            },
            dealComment: function(){
                if(this.getCookie('user_verify')!=null&&this.getCookie('user_verify')!=''&&this.getCookie('user_verify')!=undefined) {
                    this.$route.router.go({ name:'works-detail',params: { id: this.communitys.pub_id}});
                }else{
                    this.$route.router.go({ name: 'login'});
                }
            },
            getLikeUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/login.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/like';
                }
                return url;
            },
            getUnlikeUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/like.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/unlike';
                }
                return url;
            },
            getCookie: function(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return "";
            },
            timestampToStr: function(timestamp){
                var unixTimestamp = new Date(timestamp * 1000) ;
                var d = new Date(timestamp * 1000);
                var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+
                (d.getDate())+" "+(d.getHours()-8)+":"+(d.getMinutes());
                return jstimestamp;
            },
        },
    };
</script>