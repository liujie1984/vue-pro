<style lang="less">
    #tag-title{height: 44px;margin: 0 20% 0 20%;}
    #tag-title li{display: inline-block;text-align: center;font-size: 16px;color: #222222;width: 50%;
        height: 42px;line-height: 42px;}
    .tag-title-choose{border-bottom: 2px solid #222222;}
    #tag-block{height:10px;background-color: #f2f1ef;}
</style>
<template>
    <ul id="tag-title">
        <li v-bind:class="{'tag-title-choose': chooseType=='follow'}" v-on:click="chooseFollow">关注标签</li>
        <li v-bind:class="{'tag-title-choose': chooseType=='mine'}" v-on:click="chooseMine">我的标签</li>
    </ul>
    <div id="tag-block"></div>
    <ul v-touch:swipe="swipeTag" v-touch-options:swipe="{direction: 'horizontal',threshold: 100}">
        <li v-show="chooseType=='follow'"><tag-one v-for="followtag in followtag" :tag="followtag" status="followed" type="image"></tag-one></li>
        <li v-show="chooseType=='mine'"><tag-one v-for="usertag in usertag" :tag="usertag" status="unknown" type="image"></tag-one></li>
    </ul>
</template>
<script>
    export default {
    	data:function(){
            return {
                usertag:[],
                followtag:[],
                nextPageToken:'',
                id:'',
                chooseType:'follow',
            }
        },
        route:{
            data (transition){
                if(transition.to.params.id!=null&&transition.to.params.id!=undefined&&transition.to.params.id!= ''){
                    this.id = decodeURI(transition.to.params.id);
                    // console.log('user_id:'+this.id);
                }
            }
        },
        created: function(){
            document.title = '标签';
        },
        ready: function(){
            this.dealUserTag();
            this.dealFollowTag();
        },
        methods:{
            swipeTag: function (e) {
                if(this.chooseType == 'follow'){
                    this.chooseType = 'mine';
                }else{
                    this.chooseType = 'follow';
                }
            },
            chooseFollow: function(){
                this.chooseType = 'follow';
            },
            chooseMine: function(){
                this.chooseType = 'mine';
            },
            getUserTagUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/tag.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/user_tag_list';
                }
                return url;
            },
            dealUserTag: function(){
                let url = this.getUserTagUrl();
                this.$http({url: url, method: 'GET',data: {user_id:this.id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.usertag = response.data.data.list;
                    }
                });  
            },
            getFollowTagUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/tag.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/user_followed_tag_list';
                }
                return url;
            },
            dealFollowTag: function(){
                let url = this.getFollowTagUrl();
                this.$http({url: url, method: 'GET',data: {user_id:this.id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.followtag = response.data.data.list;
                    }
                });  
            },
        },
        components:{
            'tag-one':require('../components/tag-one.vue'),
        }
    }
</script>


