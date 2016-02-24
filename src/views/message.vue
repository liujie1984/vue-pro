<style lang="less">
	.message{}
	.message li{height: 56px;border-bottom: 1px solid #dcdcdc;padding: 0 12px 0 18px;}
	.message li span{display: inline-block;}
	.message-title{font-size: 16px;color: #222222;height: 56px;line-height: 56px;width: 80%;}
	.message-click{font-size: 16px;height: 56px;line-height: 56px;text-align: right;width: 20%;}
</style>
<template>
    <!-- 全局header -->
    <ul class="message">
    	<li v-link="{name:'message-like-list'}"><span class="message-title">赞</span><span class="message-click">></span></li>
    	<li v-link="{name:'message-comment-list'}"><span class="message-title">评论</span><span class="message-click">></span></li>
    	<li v-link="{name:'message-follow-list'}"><span class="message-title">关注</span><span class="message-click">></span></li>
    	<li v-link="{name:'message-systeminfo-list'}"><span class="message-title">系统通知</span><span class="message-click">></span></li>
    	<li v-link="{name:'message-chat-list'}"><span class="message-title">私聊</span><span class="message-click">></span></li>
    </ul>
    <footer-bottom></footer-bottom>
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
            }
        },
    	created: function() {
            let url = this.getMessageSummaryUrl();
            this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response) {    
            	console.dir(response);
            });		
    	},
    	ready: function() {

    	},
    	methods:{
    		getMessageSummaryUrl: function(){
            	let url = '';
            	if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                	url = localStorage.getItem('apphost') + 'apiv2/recommend_list.json';
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


