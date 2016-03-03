<style lang="less">
    .works-one-owner{height: 50px;}
    .works-one-user{float: left;}
    .works-one-avatar{height: 36px;width: 36px;border-radius: 18px;margin: 10px 10px 0 10px;}
    .works-one-avatar-vip{position: relative;width: 17px;height: 17px;margin: 0 10px 0 -20px;}
    .works-one-nickname{vertical-align: top;font-size: 14px;color: #4a4a4a;height: 20px;line-height: 20px;
        display: inline-block;margin-top: 20px;}
    .works-one-follow{height: 20px;float: right;margin: 15px 10px 0 0;position: relative;font-size: 14px;
        color: #222222;padding: 1px 6px 1px 6px;display: inline-block;line-height: 20px;}
    .works-one-follow-deal-border{border: 1px solid #222222;}
    .works-one-mark{height: 20px;float: right;margin: 15px 10px 0 0;position: relative;font-size: 14px;height: 20px;
        padding: 1px 6px 1px 6px;display: inline-block;line-height: 20px;border-radius: 4px;border: 1px solid #ffffff;}

    .works-one-recommend-title{color: #222222;font-size: 16px;max-height: 36px;overflow:hidden;line-height: 18px;
        -webkit-line-clamp:2;-webkit-box-orient: vertical;display: -webkit-box;margin: 10px 10px 10px 10px;}
    .works-one-normal-title{color: #222222;font-size: 16px;margin: 0 0 0 10px;white-space:nowrap; 
        text-overflow:ellipsis;overflow: hidden;height: 38px;line-height: 38px;}

    .works-one-thumbnail{}
    .works-one-thumbnail-topleft-text{width: 56px;height: 40px;background-color: rgba(0,0,0,0.3);position: relative;color: #ffffff;}
    .works-one-thumbnail-topleft-text p{height: 12px;font-size: 10px;line-height: 12px;text-align: center;}
    .works-one-thumbnail-topleft-text-0{padding-top: 8px;}
    .works-one-thumbnail-topleft-text-top{margin-top: -40px;}
    .works-one-image-count{font-size: 10px;color: #ffffff;display: inline-block;width: 50px;height: 20px;line-height: 20px;position: relative;text-align: center;float: right;background-color: rgba(0,0,0,0.5);}
    .works-one-thumbnail-image-img-top{margin-top: -20px;}
    .works-one-thumbnail-image-img{width: 100%;}
    .works-one-thumbnail-text-content{margin: 5px 0 5px 0;}
    .works-one-thumbnail-video{height: 200px;}
    .works-one-thumbnail-video-img{width: 100%;height: 200px;}
    .works-one-thumbnail-video-play{width: 33px;height: 33px;display: inline-block;position: relative;z-index: 3;top: -120px;
        left: 50%;margin-left: -16px;background: transparent;}

    .works-one-works-tags{margin: 5px 0 10px 4px;}
    .works-one-works-tags ul{height: 20px;overflow: hidden;}
    .works-one-works-tags ul li{display: inline-block;height: 18px;padding: 0 6px 0 6px;border: 1px solid #dbdbdb;color: #9a9a9a;
        font-size: 12px;margin: 0 6px 0 6px;}
    .works-one-works-tags ul li a{text-decoration: none;color: #9a9a9a;height: 18px;line-height: 18px;display: inline-block;}

    .works-one-pubdate{font-size: 12px;color: #9a9a9a;height: 30px;line-height: 30px;padding: 0 0 0 10px;}
    .works-one-like-comment{height: 44px;border-top: 1px solid #dbdbdb;}
    .works-one-like-comment span{display: inline-block;text-align: center;height: 40px;}
    .works-one-content-like{border-right: 1px solid #dcdcdc;width: 49%;}
    .works-one-content-comment{width: 49%;}
    .works-one-icon{width: 20px;height: 20px;margin: 12px 6px 0 0;vertical-align: top;}
    .works-one-count{font-size: 12px;color: #9a9a9a;vertical-align: top;display: inline-block;height: 40px;line-height: 40px;margin: 0 0 0 6px}
    .works-one-blank{height: 12px;background-color: #f2f1ef;margin-top: -5px;}
</style>
<template>
<div class="one">
    <div v-if="type=='recommend'||type=='normal'" class="works-one-owner" >
        <div v-link="{name:'person-other',params: { id: works.owner.user_id}}" class="works-one-user">
            <img class="works-one-avatar" v-bind:src="works.owner.avatar_url">
            <img v-if="works.owner.is_vip==1" class="works-one-avatar-vip" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-is-vip.png">
            <span class="works-one-nickname">{{works.owner.nickname}}</span>
        </div>
        <span v-if="type=='normal'" class="works-one-follow" v-on:click="dealFollow" v-bind:class="{'works-one-follow-deal-border': status=='unfollow'}">
            {{statusContent}}
        </span>
        <span v-if="type=='recommend'&&works.common_flags.mark_text!=null" class="works-one-mark" v-bind:style="{ color: '#'+works.common_flags.mark_color, borderColor: '#'+works.common_flags.mark_color }">
            {{works.common_flags.mark_text}}
        </span>
    </div>
    <div v-link="{name:'works-detail',params: { id: works.pub_id}}">
        <div v-if="type=='recommend'||type=='nouser'" class="works-one-recommend-title">{{works.title}}</div>
        <div class="works-one-thumbnail">
            <div v-if="works.common_flags.topleft_text!=null" class="works-one-thumbnail-topleft-text">
                <p class="works-one-thumbnail-topleft-text-0">{{topleftText[0]}}</p>
                <p>{{topleftText[1]}}</p>
            </div>
            <div v-bind:class="{'works-one-thumbnail-topleft-text-top': works.common_flags.topleft_text!=null}">
                <div v-if="works.thumbnail.type=='image'" class="works-one-thumbnail-image">
                    <span v-if="works.image_count>1" class="works-one-image-count">{{works.image_count}}图</span>
                    <img class="works-one-thumbnail-image-img" v-bind:class="{'works-one-thumbnail-image-img-top': works.image_count>1}" v-bind:src="works.thumbnail.content.thumbnail_url">
                </div>
                <div v-if="works.thumbnail.type=='text'" class="works-one-thumbnail-text">
                    <p class="works-one-thumbnail-text-content">{{works.thumbnail.content.text}}</p>
                </div>
                <div v-if="works.thumbnail.type=='ihp_v'||works.thumbnail.type=='youku_v'" class="works-one-thumbnail-video">
                    <img class="works-one-thumbnail-video-img" v-bind:src="works.thumbnail.content.thumbnail_url">
                    <img class="works-one-thumbnail-video-play" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-video-play-c.png">
                </div>
            </div>
        </div>
        <div v-if="type=='normal'" class="works-one-normal-title">{{works.title}}</div>
    </div>
    <div v-if="works.tags!=null" class="works-one-works-tags">
        <ul>
            <li v-for="tag in works.tags"><a v-bind:href="'#!/tag-detail/'+tag.tag_id">{{tag.tag_name}}</a></li>
        </ul>
    </div>
    <p v-if="type=='nouser'" class="works-one-pubdate">{{works.pub_date}}</p>
    <div class="works-one-like-comment">
        <span class="works-one-content-like" v-on:click="dealLike">
            <img class="works-one-icon" v-bind:src="likedImgSrc">
            <span class="works-one-count">{{works.likes_count}}</span>
        </span>
        <span class="works-one-content-comment" v-on:click="dealComment">
            <img class="works-one-icon" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-comments.png">
            <span class="works-one-count">{{works.comments_count==0 ? '评论' : works.comments_count}}</span>
        </span>
    </div>
    <div class="works-one-blank"></div>
</div>
</template>
<script>
    export default {
        props: ['works','type'],
        data:function(){
            return {
                topleftText: [],
                likedImgSrc:'',
                isLiked:'',
                status:'unfollow',
                statusContent:'+关注',
            }
        },
        created: function(){
            if(this.works.common_flags!=null){
                if(this.works.common_flags.topleft_text!=null){
                    this.dealTopleftText();
                }
            }
            if(this.works.owner!=null){
                if(this.works.owner.is_followed!=null){
                    if(this.works.owner.is_followed==1){
                        this.status = 'followed';
                        this.statusContent = '已关注';
                    }
                }
            }
            if(this.works.my_flags!=null){
                if(this.works.my_flags.is_liked==1){
                    this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-choose.png';
                    this.isLiked=1;
                }
            }else{
                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-unchoose.png';
                this.isLiked=0;
            }
            this.works.pub_date = this.timestampToStr(this.works.pub_date); 

        },
        ready: function(){

        },
        watch:{
            'status': function(){
                if(this.status == 'followed'){
                    this.statusContent = '已关注';
                }else if(this.status=='unfollow'){
                    this.statusContent = '+关注';
                }  
            }
        },
        methods:{
            timestampToStr: function(timestamp){
                var unixTimestamp = new Date(timestamp * 1000) ;
                var d = new Date(timestamp * 1000);
                var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+
                (d.getDate())+" "+(d.getHours()-8)+":"+(d.getMinutes());
                return jstimestamp;
            },
            dealLike: function(){
                if(this.getCookie('user_verify')!=null&&this.getCookie('user_verify')!=''&&this.getCookie('user_verify')!=undefined) {
                    if(this.isLiked==1){
                        let unlikeUrl = this.getUnlikeUrl();
                        this.$http({url: unlikeUrl, method: 'POST',data: {type:'pub',id:this.works.pub_id},xhr:{withCredentials:true},}).then(function (response) {
                            if(response.data.code==0){
                                this.isLiked=0;
                                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-unchoose.png';
                                this.works.likes_count--;
                            }
                        });
                    }else{
                        let likeUrl = this.getLikeUrl();
                        this.$http({url: likeUrl, method: 'POST',data: {type:'pub',id:this.works.pub_id},xhr:{withCredentials:true},}).then(function (response) {
                            if(response.data.code==0){
                                this.isLiked=1;
                                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-choose.png';
                                this.works.likes_count++;
                            }
                        });
                    }
                }else{
                    let nowHref =window.location.href;
                    let redirectUrl = nowHref.split('!')[1];
                    this.$route.router.go('/login?redirect=' + redirectUrl);
                }
            },
            dealComment: function(){
                if(this.getCookie('user_verify')!=null&&this.getCookie('user_verify')!=''&&this.getCookie('user_verify')!=undefined) {
                    this.$route.router.go({ name:'works-detail',params: { id: this.works.pub_id}});
                }else{
                    this.$route.router.go({ name: 'login'});
                }
            },
            dealTopleftText: function(){
                this.topleftText = this.works.common_flags.topleft_text.split('\n');
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

            dealFollow: function(){
                if(this.getCookie('user_verify')!=null&&this.getCookie('user_verify')!=''&&this.getCookie('user_verify')!=undefined) {
                    if(this.status == 'unfollow'){
                        this.postFollow();
                    }else if(this.status == 'followed'){
                        this.postUnfollow();
                    }else if(this.status == 'followtwo'){
                        this.postUnfollow();
                    }
                }else{
                    
                    let nowHref =window.location.href;
                    let redirectUrl = nowHref.split('!')[1];
                    this.$route.router.go('/login?redirect=' + redirectUrl);
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
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {user_id:this.works.owner.user_id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.status = 'followed'; 
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
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {user_id:this.works.owner.user_id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.status = 'unfollow';
                    }
                });
            },
        },
    };
</script>