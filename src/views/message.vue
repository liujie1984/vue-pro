<style lang="less">
	.message{}
	.message li{height: 56px;border-bottom: 1px solid #dcdcdc;padding: 0 12px 0 18px;clear: both;}
	.message li span{display: inline-block;}
	.message-title{font-size: 16px;color: #222222;height: 56px;line-height: 56px;float: left;}
	.message-click{font-size: 16px;height: 56px;line-height: 56px;text-align: right;float: right;}
    .message-num{font-size: 16px;width: 20px;height: 20px;border-radius: 10px;background-color: red;color: #ffffff;float: left;
        text-align: center;line-height: 20px;margin: 18px 0 0 10px;}
</style>
<template>
    <!-- 全局header -->
    <ul class="message">
    	<li v-link="{name:'message-more',params: { type: 'like' }}">
            <span class="message-title">赞</span>
            <span v-if="likeNum!=0 && likeNum!=''" class="message-num">{{likeNum}}</span>
            <span class="message-click">></span>
        </li>
    	<li v-link="{name:'message-more',params: { type: 'comment' }}">
            <span class="message-title">评论</span>
            <span v-if="commentNum!=0 && commentNum!=''" class="message-num">{{commentNum}}</span>
            <span class="message-click">></span>
        </li>
    	<li v-link="{name:'message-more',params: { type: 'follow' }}">
            <span class="message-title">关注</span>
            <span v-if="followNum!=0 && followNum!=''" class="message-num">{{followNum}}</span>
            <span class="message-click">></span>
        </li>
    	<li v-link="{name:'sysinfo-more'}">
            <span class="message-title">系统通知</span>
            <span v-if="chatNum!=0 && chatNum!=''" class="message-num">{{chatNum}}</span>
            <span class="message-click">></span>
        </li>
    	<li v-link="{name:'message-more',params: { type: 'chat' }}">
            <span class="message-title">私聊</span>
            <span v-if="systeminfoNum!=0 && systeminfoNum!=''" class="message-num">{{systeminfoNum}}</span>
            <span class="message-click">></span>
        </li>
    </ul>
    <footer-bottom :msg="hasUnreadMessage"></footer-bottom>
</template>
<script>
    export default {
    	data:function(){
            return {
                likeNum:'',
                commentNum:'',
                followNum:'',
                chatNum:'',
                systeminfoNum:'',
                hasUnreadMessage:'',
            }
        },
    	created: function() {
            let token = JSON.parse(sessionStorage.getItem('userData')).token;
            // console.dir(token);
            let url = this.getMessageSummaryUrl();
            this.$http({url: url, method: 'GET',headers:{'User-Token': token},xhr:{withCredentials:true}}).then(function (response) { 
                if(response.data.code==0){
                    this.likeNum = response.data.data.list[0].unread_num; 
                    this.commentNum = response.data.data.list[1].unread_num; 
                    this.followNum = response.data.data.list[3].unread_num; 
                    this.chatNum = response.data.data.list[5].unread_num; 
                    this.systeminfoNum = response.data.data.list[4].unread_num; 
            	// console.dir(response.data.data);
                }
            });		
    	},
    	ready: function() {
            document.title = '消息';
    	},
    	methods:{
    		getMessageSummaryUrl: function(){
            	let url = '';
            	if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                	url = localStorage.getItem('apphost') + 'apiv2/message.json';
            	}else{
                	url = localStorage.getItem('apphost') + 'api/my_message_summary';
            	}
            	return url;
        	},
    	},
        components:{
            'footer-bottom':require('../components/footer-bottom.vue'),
        }
    }
</script>


