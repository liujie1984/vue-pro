<style lang="less">
	.person-background{height: 220px;text-alight: right;}
	.person-background-page{height: 220px;}
	.person-background-page-img{height: 220px;width: 100%;}

	.person-background-page0-info{height: 25px;top: -25px;position: relative;left: 100px;display: inline-block;}
	.person-nickname{font-size: 15px;color: #ffffff;height: 25px;line-height: 25px;
		display: inline-block;vertical-align: top;}
	.person-gender{width: 15px;height: 15px;vertical-align: top;margin: 5px 0 0 5px;display: inline-block;}
	.person-background-page1-info{position: relative;top: -150px;left: 16px;display: inline-block;}
	.person-background-page1-info p{height: 16px;line-height: 16px;font-size: 13px;color: #dcdcdc;}
	.person-background-page1-info p span{font-size: 13px;color: #ffffff;}
	.person-background-choose-hint{display: inline-block;position: relative;z-index: 2;top: -10px;right: 10px;float: right;}
	.person-background-choose-hint li{display: inline-block;width: 5px;height: 5px;border-radius: 5px;background-color: #777777;
		margin:0 3px 0 3px;}
	.person-background-choose-hint-already{background-color: #ffffff !important;}
	.person-avatar-container{height: 40px;margin: -40px 0 0 5px;z-index:2;}
	.person-avatar{width: 80px;height: 80px;border-radius: 40px;border: 2px solid #ffffff;}
    .person-vip{width: 17px;height: 17px;position: relative;left: -25px;top: 0;}

	.person-detail{height: 70px;border-bottom: 1px solid #f2f1ef;}
	.person-detail ul{position: relative;height: 40px;padding: 15px 0 0 100px;}
	.person-detail ul li{display: inline-block;height: 40px;width: 22%;border-right: 1px solid #9a9a9a;}
	.person-detail ul li span{width: 100%;display: inline-block;text-align: center;}
	.person-detail-num{font-size: 20px;color: #555555;width: 100%;height: 22px;line-height: 22px;}
	.person-detail-title{font-size: 14px;color: #9a9a9a;height: 16px;line-height: 16px;}
    #person-detail-num-4{border: none;}
	#person-detail-num-5{border-left: 1px solid #9a9a9a;border-right: none;}
    .person-detail-li-width-4{}
    .person-detail-li-width-5{width: 18% !important;}

    .mine-block{height: 35px;background-color: #f2f1ef;}
    .mine-content{height: 40px;border-bottom: 1px solid #dcdcdc;padding: 0 10px 0 10px;}
    .mine-content span{display: inline-block;}
    .mine-content-title{font-size: 16px;color: #222222;height: 40px;line-height: 40px;width: 80%;}
    .mine-content-click{font-size: 16px;height: 40px;line-height: 40px;text-align: right;width: 20%;}


    #app-download{text-decoration: none;font-size: 16px;text-align: center;line-height: 30px;height: 30px;
        display: block;margin-top: 60px;border-bottom: 1px solid #f2f1ef;border-top: 1px solid #f2f1ef;color: #9a9a9a;}
    #login-out{font-size: 16px;height: 30px;line-height: 30px;border-bottom: 1px solid #f2f1ef;text-align: center;color: #9a9a9a;}
</style>
<template>
    <div class="person-background" v-touch:swipe.stop="onSwipe" v-touch-options:swipe="{threshold: 50}">
    	<div v-show="backgroundPage==0" class="person-background-page">
    		<img class="person-background-page-img" src="http://7xqamv.com2.z0.glb.qiniucdn.com/webapp-person-background.png">
    		<div class="person-background-page0-info">
    			<span class="person-nickname">{{userData.nickname}}</span>
            	<img class="person-gender" v-bind:src="userData.genderUrl"/>
    		</div>
    	</div>
    	<div v-show="backgroundPage==1" class="person-background-page">
    		<img class="person-background-page-img" src="http://7xqamv.com2.z0.glb.qiniucdn.com/webapp-person-background-gaussian.png">
    		<div class="person-background-page1-info">
                <p class="person-drone">设备：<span>{{userData.drone_name}}</span></p>
                <p class="person-location">地区：<span>{{userData.location}}</span></p>
            </div>
    	</div>
    	<ul class="person-background-choose-hint">
            <li class="person-background-choose" v-bind:class="{'person-background-choose-hint-already': backgroundPage==0}"></li>
            <li class="person-background-choose" v-bind:class="{'person-background-choose-hint-already': backgroundPage==1}"></li>
        </ul>	
    </div>
    <div class="person-avatar-container">
    	<img v-bind:src="userData.avatar_url" class="person-avatar">
    	<img v-if="userData.is_vip==1" class="person-vip" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-is-vip.png">
    </div>
    <div class="person-detail"> 
    	<ul>
    		<li v-link="{name:'person-works',params: { id: id }}" v-bind:class="{'person-detail-li-width-5': type=='mine'}"><span class="person-detail-num" >{{userData.pub_count}}</span><span class="person-detail-title">作品</span></li>
    		<li v-link="{name:'person-community',params: { id: id }}" v-bind:class="{'person-detail-li-width-5': type=='mine'}"><span class="person-detail-num">{{userData.thread_count}}</span><span class="person-detail-title">帖子</span></li>
    		<li v-link="{name:'person-follow',params: { id: id }}" v-bind:class="{'person-detail-li-width-5': type=='mine'}"><span class="person-detail-num">{{userData.followed_count}}</span><span class="person-detail-title">关注</span></li>
    		<li v-link="{name:'person-flower',params: { id: id }}" v-bind:class="{'person-detail-li-width-5': type=='mine'}" id="person-detail-num-4"><span class="person-detail-num">{{userData.followers_count}}</span><span class="person-detail-title">粉丝</span></li>
            <li v-if="type=='mine'" v-link="{name:'tag',params: { id: id }}" id="person-detail-num-5" v-bind:class="{'person-detail-li-width-5': type=='mine'}"><span class="person-detail-num">{{userData.mix_tags_count}}</span><span class="person-detail-title">标签</span></li>
    	</ul>
    </div>

    <a id="app-download" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.coolpa.ihp">下载APP,体验更多功能！</a>
    <p id="login-out" v-on:click="loginOut" v-if="type=='mine'">退出</p>
    <footer-bottom v-if="type=='mine'"></footer-bottom>
    <div v-if="type=='other'">
        
    </div>
</template>
<script>
    export default {
    	data:function(){
            return {
                backgroundPage: 0,
                id: 'm',
                type:'mine',
                userData:{
                	nickname:'',
                	gender:'',
                	avatar_url:'',
                	is_vip:'',
                	location:'',
                	drone_name:'',
                	genderUrl:'',
                	pub_count:'',
                	thread_count:'',
                	followed_count:'',
                	followers_count:'',
                    mix_tags_count:'',
                },
            }
        },
        route:{
            data (transition){
                if(transition.to.params.id!=null&&transition.to.params.id!=undefined&&transition.to.params.id!= ''&&transition.to.params.id!='m'){
                    this.id = decodeURI(transition.to.params.id);
                    this.type = 'other';
                    // console.log('user_id:'+this.id);
                }else{
                    this.type = 'mine';
                    this.id = sessionStorage.getItem("userId");
                }
            }
        },
        created: function(){
            document.title = '个人主页';
            // this.dealUser(); 
        },
        ready: function(){
            this.dealUser();
        },
        methods:{
        	onSwipe: function (e) {
        		// console.dir(this.backgroundPage);
        		if(this.backgroundPage<1){
        			this.backgroundPage++;
        		}else{
        			this.backgroundPage=0;
        		}
        	},
            dealGender: function(gender){
                switch (gender){
                    case 'M'||'男':
                        this.userData.genderUrl='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-male.png';
                        break;
                    case 'F':
                        this.userData.genderUrl='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-female.png';
                        break;
                    case 'U':
                        this.userData.genderUrl='http://7xqamv.com2.z0.glb.qiniucdn.com/icon-female.png';
                        break;
                }
            },
            getUserInfoUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/user_profile.json';
                }else{
                    url = localStorage.getItem('apphost') + 'api/accounts/user_profile';
                }
                return url;
            },
            dealUser: function(){
                if(this.type=='mine'){
                    let userData = sessionStorage.getItem("userData");
                    if(userData != null&&userData != ''){
                        this.userData = JSON.parse(userData);
                        this.userData.genderUrl = this.dealGender(this.userData.gender);
                        // console.dir(this.userData);
                    }
                }else if(this.type=='other'){
                    let url = this.getUserInfoUrl();
                    this.$http({url: url, method: 'GET',data: {user_id:this.id},xhr:{withCredentials:true}}).then(function (response){
                        if(response.data.code==0){
                            this.userData = response.data.data;
                            // console.dir(this.userData);
                            this.userData.genderUrl = this.dealGender(this.userData.gender);
                        }
                    });
                }

            },
            loginOut: function(){
                sessionStorage.clear();
                var date=new Date();
                date.setTime(date.getTime()-10000);
                document.cookie='user_info'+'=; expire='+date.toGMTString()+'; path=/;domain=.52hangpai.cn';
                document.cookie='user_verify'+'=; expire='+date.toGMTString()+'; path=/;domain=.52hangpai.cn'; 
                document.cookie='user_verify'+'=; expire='+date.toGMTString()+'; path=/;domain=session';   
                this.$route.router.go({ name: 'recommend'});
            },
        },
        events: {
            // 'third-party-login-msg': function (msg) {
            //     // 事件回调内的 `this` 自动绑定到注册它的实例上
            //     console.dir(msg);
            // }
        },
        components:{
            'footer-bottom':require('../components/footer-bottom.vue'),
            // 'person-works':require('person-works.vue'),
        }
    }
</script>


