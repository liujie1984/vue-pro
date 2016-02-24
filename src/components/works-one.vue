<style lang="less">
    .owner{height: 56px;}
    .avatar{height: 36px;width: 36px;border-radius: 18px;margin: 10px 10px 0 10px;}
    .avatar-vip{position: relative;width: 17px;height: 17px;margin: 0 10px 0 -20px;}
    .nickname{vertical-align: top;font-size: 14px;color: #4a4a4a;height: 60px;line-height: 60px;
        display: inline-block;}

    .recommend-title{color: #222222;font-size: 16px;max-height: 36px;overflow:hidden;line-height: 18px;
        -webkit-line-clamp:2;-webkit-box-orient: vertical;display: -webkit-box;margin: 0 10px 10px 10px;}
    .normal-title{color: #222222;font-size: 16px;margin: 0 0 0 10px;white-space:nowrap; 
        text-overflow:ellipsis;overflow: hidden;height: 42px;line-height: 42px;}

    .thumbnail{}
    .thumbnail-topleft-text{width: 56px;height: 40px;background-color: rgba(0,0,0,0.3);position: relative;color: #ffffff;}
    .thumbnail-topleft-text p{height: 12px;font-size: 10px;line-height: 12px;text-align: center;}
    .thumbnail-topleft-text-0{padding-top: 8px;}
    .thumbnail-topleft-text-top{margin-top: -40px;}
    .image-count{font-size: 10px;color: #ffffff;display: inline-block;width: 50px;height: 20px;line-height: 20px;position: relative;text-align: center;
        float: right;background-color: rgba(0,0,0,0.5);}
    .thumbnail-image-img-top{margin-top: -20px;}
    .thumbnail-image-img{width: 100%;}
    .thumbnail-text-content{margin: 5px 0 5px 0;}
    .thumbnail-video{height: 200px;}
    .thumbnail-video-img{width: 100%;height: 200px;}
    .thumbnail-video-play{width: 33px;height: 33px;display: inline-block;position: relative;z-index: 3;top: -120px;
        left: 50%;margin-left: -16px;}

    .works-tags{margin: 0 0 10px 4px;}
    .works-tags ul{height: 20px;overflow: hidden;}
    .works-tags ul li{display: inline-block;height: 18px;padding: 0 6px 0 6px;border: 1px solid #dbdbdb;color: #9a9a9a;
        font-size: 12px;margin: 0 6px 0 6px;}

    .like-comment{height: 44px;border-top: 1px solid #dbdbdb;}
    .like-comment span{display: inline-block;text-align: center;height: 40px;}
    .content-like{border-right: 1px solid #dcdcdc;width: 49%;}
    .content-comment{width: 49%;}
    .icon{width: 20px;height: 20px;margin: 12px 6px 0 0;vertical-align: top;}
    .count{font-size: 12px;color: #9a9a9a;vertical-align: top;display: inline-block;height: 40px;line-height: 40px;margin: 0 0 0 6px}
    .blank{height: 12px;background-color: #f2f1ef;margin-top: -5px;}
</style>
<template>
<div class="one">
    <div v-link="{name:'person-other',params: { id: works.owner.user_id}}" class="owner" >
        <img class="avatar" v-bind:src="works.owner.avatar_url">
        <img v-if="works.owner.is_vip==1" class="avatar-vip" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-is-vip.png">
        <span class="nickname">{{works.owner.nickname}}</span>
    </div>
    <div v-link="{name:'works-detail',params: { id: works.pub_id}}">
        <div v-if="type=='recommend'" class="recommend-title">{{works.title}}</div>
        <div class="thumbnail">
            <div v-if="works.common_flags.topleft_text!=null" class="thumbnail-topleft-text">
                <p class="thumbnail-topleft-text-0">{{topleftText[0]}}</p>
                <p>{{topleftText[1]}}</p>
            </div>
            <div v-bind:class="{'thumbnail-topleft-text-top': works.common_flags.topleft_text!=null}">
                <div v-if="works.thumbnail.type=='image'" class="thumbnail-image">
                    <span v-if="works.image_count>1" class="image-count">{{works.image_count}}图</span>
                    <img class="thumbnail-image-img" v-bind:class="{'thumbnail-image-img-top': works.image_count>1}" v-bind:src="works.thumbnail.content.thumbnail_url">
                </div>
                <div v-if="works.thumbnail.type=='text'" class="thumbnail-text">
                    <p class="thumbnail-text-content">{{works.thumbnail.content.text}}</p>
                </div>
                <div v-if="works.thumbnail.type=='ihp_v'||works.thumbnail.type=='youku_v'" class="thumbnail-video">
                    <img class="thumbnail-video-img" v-bind:src="works.thumbnail.content.thumbnail_url">
                    <img class="thumbnail-video-play" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-video-play-c.png">
                </div>
            </div>
        </div>
        <div v-if="type=='normal'" class="normal-title">{{works.title}}</div>
    </div>
    <div v-if="works.tags!=null" class="works-tags">
        <ul>
            <li v-for="works.tags in works.tags">{{works.tags[$index].tag_name}}</li>
        </ul>
    </div>
    <div class="like-comment">
        <span class="content-like" v-on:click="dealLike">
            <img class="icon" v-bind:src="likedImgSrc">
            <span class="count">{{works.likes_count}}</span>
        </span>
        <span class="content-comment" v-on:click="dealComment">
        <!-- v-link="{name:'works-detail',params: { id: works.pub_id}} -->
            <img class="icon" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-comments.png">
            <span class="count">{{works.comments_count}}</span>
        </span>
    </div>
    <div class="blank"></div>
</div>
</template>
<script>
    export default {
        props: ['works','type'],
        data:function(){
            return {
                topleftText: [],
                likedImgSrc:'',
                isLiked:''
            }
        },
        created: function(){
            // console.dir(this.type);
            // console.dir(this.works);
            // console.dir(this.works.common_flags.topleft_text);
            if(this.works.common_flags.topleft_text!=null){
                this.dealTopleftText();
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

        },
        ready: function(){

        },
        methods:{
            dealLike: function(){
                if(this.getCookie('user_info')!=null&&this.getCookie('user_info')!=''&&this.getCookie('user_info')!=undefined) {
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
                    console.dir(this);
                    this.$route.router.go({ name: 'login'});
                }
            },
            dealComment: function(){
                if(this.getCookie('user_info')!=null&&this.getCookie('user_info')!=''&&this.getCookie('user_info')!=undefined) {
                    this.$route.router.go({ name:'works-detail',params: { id: this.works.pub_id}});
                }else{
                    this.$route.router.go({ name: 'login'});
                }
            },
            dealTopleftText: function(){
                // console.dir(this.works.common_flags.topleft_text);
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
        },
    };
</script>