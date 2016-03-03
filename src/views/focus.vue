<style lang="less">
	.focus-guess{height: 20px;padding: 0 10px 0 10px;}
	.focus-guess span{color: #9a9a9a;font-size: 14px;height: 20px;line-height: 20px;}
	.focus-guess-right{float: right;}
	#focus-block{height: 10px;background-color: #f2f1ef;}

</style>
<template>
    <!-- 全局header -->
    <nav-top type="focus"></nav-top>
    	<div class="focus-guess"><span>猜你喜欢</span><span class="focus-guess-right">></span></div>
    	<div>
    		<follow-one v-if="guessType=='recommend_user'" :follow="guess" type="focus"></follow-one>
    		<tag-one v-if="guessType=='recommend_tag'" :tag="guess" status="unfollow" type="text"></tag-one>
    		<div id="focus-block"></div>
        	<works-one v-for="works in works" :works="works" type="normal"></works-one>
    	</div>

    <footer-bottom></footer-bottom>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
    	data:function(){
            return {
                works:[],
                nextPageToken:'',
                isBackTopShow: false,
                guess:'',
                guessType:'',
            }
        },
        created:function() {
            document.title = '关注';
        },
        ready:function() {
        	this.getFocus();
            let self = this;
            window.onscroll = function(){
            // console.dir(document.body.clientHeight);
            // console.dir(document.body.scrollTop);
                if(document.body.clientHeight-document.body.scrollTop<1000){
                    if(self.nextPageToken!=''){
                        self.getFocus();
                        self.nextPageToken='';
                    }
                // console.dir(self);
                }
                if(document.body.scrollTop>1000) {
                    self.isBackTopShow = true;
                }else{
                    self.isBackTopShow = false;
                }
            }
        },
        methods:{
        	getFocusUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/focus.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/mixed_followed_publist';
                }
                return url;
            },
        	getFocus: function(){
                let url = this.getFocusUrl();
                // page_token:xxx
                this.$http({url: url, method: 'GET',data:{page_token:this.nextPageToken},xhr:{withCredentials:true}}).then(function (response) {
                    this.works = this.works.concat(response.data.data.list);
                    this.nextPageToken = response.data.data.next_page_token;
                    if(response.data.data.recommend_user!=null){
                    	this.guess = response.data.data.recommend_user;
                    	this.guessType = 'recommend_user';
                    }
                    if(response.data.data.recommend_tag!=null){
                    	this.guess = response.data.data.recommend_tag;
                    	this.guessType = 'recommend_tag';
                    }
                });
            },
        },
        components:{
            'nav-top':require('../components/nav-top.vue'),
            'works-one':require('../components/works-one.vue'),
            'back-top':require('../components/back-top.vue'),
            'footer-bottom':require('../components/footer-bottom.vue'),
            'tag-one':require('../components/tag-one.vue'),
            'follow-one':require('../components/follow-one.vue'),
        }
    }
</script>


