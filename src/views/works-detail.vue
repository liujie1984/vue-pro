<style lang="less">
    .owner{height: 64px;}
    .owner-user{float: left;}
    .owner-avatar{width: 36px;height: 36px;border-radius: 18px;margin: 14px 14px 0 10px;float: left;}
    .owner-avatar-vip{position: relative;width: 17px;height: 17px;margin: 34px 10px 0 -25px;float: left;}
    .owner-middle{height: 48px;float: left;margin-top: 16px;}
    .owner-nickname{font-size: 14px;color: #4a4a4a;height: 18px;line-height: 18px;}
    .pub-date{font-size: 12px;color: #dcdcdc;height: 14px;line-height: 14px;}
    .works-detail-follow{height: 20px;float: right;margin: 20px 10px 0 0;position: relative;font-size: 14px;
        color: #222222;padding: 1px 6px 1px 6px;display: inline-block;line-height: 20px;}
    .works-detail-follow-deal-border{border: 1px solid #222222;}

    .blank{height: 6px;background-color: #dddddd;clear: both;}
    .title{font-size: 16px;color: #3b4554;margin: 10px;height: auto;line-height: 22px;}
    .title-icon{margin: 0 5px 0 0;}
    .title-icon span{font-size: 16px;font-weight: bolder;line-height: 20px;height: 20px;}

    .tags-list{margin: 10px 10px 10px 4px;height: 20px;overflow: hidden;}
    .tags-list li{display: inline-block;height: 18px;padding: 0 6px 0 6px;border: 1px solid #dbdbdb;color: #9a9a9a;
        font-size: 12px;margin: 0 6px 0 6px;}
    .tags-list li a{text-decoration: none;color: #9a9a9a;display: inline-block;height: 18px;line-height: 18px;}

    .like-comment{height: 44px;border-top: 1px solid #dbdbdb;}
    .like-comment span{display: inline-block;text-align: center;height: 40px;}
    .content-like{border-right: 1px solid #dcdcdc;width: 49%;}
    .content-comment{width: 49%;}
    .icon{width: 20px;height: 20px;margin: 12px 6px 0 0;vertical-align: top;}
    .count{font-size: 12px;color: #9a9a9a;vertical-align: top;display: inline-block;height: 40px;line-height: 40px;margin: 0 0 0 6px}

    .comments{margin-bottom: 42px;}
    .add-comment{position: fixed;bottom: 0;width: 100%;padding: 0 2.5% 0 2.5%;background-color: #ffffff;}
    .add-comment-content{border:none;border-bottom: 1px solid #3a9df9;width: 83%;display: inline-block;min-height: 18px;line-height:18px;
        font-size: 14px;margin: 10px 0 10px 0;color: #9a9a9a;}
    .add-comment-submit{font-size: 14px;color: #9a9a9a;display: inline-block;vertical-align: top;position: absolute;width: 12%;
        text-align: center;top: 50%;margin-top: -7px;}
</style>
<template>
    <div class="owner">
        <div v-link="{name:'person-other',params: { id: owner.user_id}}" class="owner-user">
            <img class="owner-avatar" v-bind:src="owner.avatar_url">
            <img v-if="owner.is_vip==1" class="owner-avatar-vip" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-is-vip.png">
            <div class="owner-middle">
                <p class="owner-nickname">{{owner.nickname}}</p>
                <p class="pub-date">{{worksDetail.pub_date}}</p>
            </div>
        </div>
        <span class="works-detail-follow" v-on:click="dealFollow" v-bind:class="{'works-detail-follow-deal-border': status=='unfollow'}">
            {{statusContent}}
        </span>
    </div>
    <div class="blank"></div>
    <p class="title">
        <span class="title-icon" v-if="worksDetail.common_flags.labels!=null">
            <span v-for="label in worksDetail.common_flags.labels" v-bind:style="{ color: '#'+label.color}">{{label.text}}</span>
        </span>
        {{worksDetail.title}}
    </p>
    <div class="detail-list">
        <detail-one v-for="worksDetail.detail_list in worksDetail.detail_list" :detail="worksDetail.detail_list[$index]"></detail-one>
    </div>
    <ul class="tags-list">
        <li v-for="tag in tags"><a v-bind:href="'#!/tag-detail/'+tag.tag_id">{{tag.tag_name}}</a></li>
    </ul>
    <div class="like-comment">
        <span class="content-like" v-on:click="dealLike">
            <img class="icon" v-bind:src="likedImgSrc">
            <span class="count">{{worksDetail.likes_count}}</span>
        </span>
        <span class="content-comment">
            <img class="icon" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-comments.png">
            <span class="count">{{worksDetail.comments_count==0 ? '评论' : worksDetail.comments_count}}</span>
        </span>
    </div>
    <div class="blank"></div>
    <div class="comments">
        <comments-one v-for="comments.list in comments.list" :comment="comments.list[$index]"></comments-one>
    </div>
    <div class="add-comment">
        <textarea class="add-comment-content" name="comment-content" rows="1" wrap="hard" maxlength="140" placeholder="{{commentPlaceholder}}" v-on:focus="commentFocus" v-on:input="commentChange" v-model="commentContent" v-bind:style="{ height: commentContainerHeight + 'px' }"></textarea>
        <span class="add-comment-submit" v-on:click="replyComment">发送</span>
    </div>
</template>
<script>
    export default {
    	data:function(){
      		return {
      			id:'',
                worksDetail:{
                    pub_date:'',
                    title:'',
                    comments_count:'',
                    likes_count:'',
                    detail_list:[],
                    common_flags:{
                        labels:[],
                    }
                },
                owner:{
                    avatar_url:'',
                    nickname:'',
                    is_vip:'',
                    is_followed:'',
                },
                comments:{
                    next_page_token:'',
                    list:[]
                },
                tags:[],
                likedImgSrc:'',
                isLiked:'',
                commentContent:'',
                commentPlaceholder:'我的评论(140字以内)',
                commentContainerHeight:'',
                replyToUser:'',
                status:'unfollow',
                statusContent:'+关注',
      		}
      	},
        route:{
            data (transition){
                this.id = decodeURI(transition.to.params.id);
                // console.dir(transition.to.params.id);
                // console.dir(this.id);
            }
        },
        created: function(){
            document.title = '详情';
        },
    	ready:function() {
            let url = '';
            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                url = localStorage.getItem('apphost') + 'apiv2/publish_detail.json';
            }else{
                url = localStorage.getItem('apphost') + 'apiv2/publish_detail';
            }
            // console.log(url);
            this.$http({url: url, method: 'GET',data:{pub_id:this.id},xhr:{withCredentials:true}}).then(function (response) {
                if(response.data.code==0){
                    this.worksDetail = response.data.data;
                    this.worksDetail.pub_date = this.timestampToStr(response.data.data.pub_date);
                    this.owner = response.data.data.owner;
                    this.comments = response.data.data.comments;
                    this.tags = response.data.data.tags;
                    if(this.worksDetail.my_flags!=null){
                        if(this.worksDetail.my_flags.is_liked==1){
                            this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-choose.png';
                            this.isLiked=1;
                        }
                    }else{
                        this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-unchoose.png';
                        this.isLiked=0;
                    }
                    this.replyToUser = this.owner;
                    if(this.owner.is_followed!=null){
                        if(this.owner.is_followed==1){
                            this.status = 'followed';
                            this.statusContent = '已关注';
                        }  
                    }

                    // console.dir(this.replyToUser);
                    // console.dir(this.worksDetail.owner.avatar_url);
                }
            });
        },
        watch:{
            'comments': function (val, oldVal) {
                console.dir('new: %s, old: %s', val, oldVal);
                
            },
            'status': function(){
                if(this.status == 'followed'){
                    this.statusContent = '已关注';
                }else if(this.status=='unfollow'){
                    this.statusContent = '+关注';
                }  
            },
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
                        this.$http({url: unlikeUrl, method: 'POST',data: {type:'pub',id:this.id},xhr:{withCredentials:true},}).then(function (response) {
                            if(response.data.code==0){
                                this.isLiked=0;
                                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-unchoose.png';
                                this.worksDetail.likes_count--;
                            }
                        });
                    }else{
                        let likeUrl = this.getLikeUrl();
                        this.$http({url: likeUrl, method: 'POST',data: {type:'pub',id:this.id},xhr:{withCredentials:true},}).then(function (response) {
                            if(response.data.code==0){
                                this.isLiked=1;
                                this.likedImgSrc='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-like-choose.png';
                                this.worksDetail.likes_count++;
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
            commentFocus: function(event){
                // console.dir(event);
                // console.dir(this.commentContent);
            },
            commentChange: function(event){
                this.commentContainerHeight = event.path[0].scrollHeight-10;
                // console.dir(event.path[0].scrollHeight);
                // console.dir(this.commentContent);
            },
            replyComment: function(event){
                if(this.getCookie('user_verify')!=null&&this.getCookie('user_verify')!=''&&this.getCookie('user_verify')!=undefined) {
                    let commentUrl = this.getCommentUrl();
                    this.$http({url: commentUrl, method: 'POST',data: {type:'pub',id:this.id,content:this.commentContent,reply_to:this.replyToUser.comment_id},xhr:{withCredentials:true},}).then(function (response) {
                        if(response.data.code==0){
                            let url = '';
                            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                                url = localStorage.getItem('apphost') + 'apiv2/publish_detail.json';
                            }else{
                                url = localStorage.getItem('apphost') + 'apiv2/publish_detail';
                            }
                            this.$http({url: url, method: 'GET',data:{pub_id:this.id},xhr:{withCredentials:true}}).then(function (response) {
                                if(response.data.code==0){
                                    this.worksDetail = response.data.data;
                                    this.comments = response.data.data.comments;
                                    this.commentContent = '';
                                    this.commentPlaceholder = '我的评论(140字以内)',
                                    this.commentContainerHeight = '20px',
                                    this.replyToUser = this.owner;
                                    // console.dir(this.replyToUser);
                                }
                            });
                        }
                    });
                }else{
                    let nowHref =window.location.href;
                    let redirectUrl = nowHref.split('!')[1];
                    // console.dir(redirectUrl);
                    this.$route.router.go('/login?redirect=' + redirectUrl);
                }
            },
            getCommentUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/like.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/comment';
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
                    // console.dir(redirectUrl);
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
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {user_id:this.owner.user_id},xhr:{withCredentials:true}}).then(function (response){
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
                this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {user_id:this.owner.user_id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.status = 'unfollow';
                    }
                });
            },
     	},
        events: {
            'comment-click-msg': function (msg) {
                // 事件回调内的 `this` 自动绑定到注册它的实例上
                // this.messages.push(msg);
                this.replyToUser = msg;
                this.commentPlaceholder = '回复:'+ this.replyToUser.owner.nickname;
                // console.dir(msg)
            }
        },
        components:{
            'detail-one':require('../components/detail-one.vue'),
            'comments-one':require('../components/comments-one.vue')
        }
    }
</script>


