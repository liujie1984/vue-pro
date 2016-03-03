<style lang="less">

</style>
<template>
    <p v-if="isNone==true">您还没有作品</p>
    <community-one v-for="community in community" :communitys="community" type="nouser"></community-one>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
        data:function(){
            return {
                community:[],
                id:'',
                nextPageToken:'',
                isBackTopShow: false,
                isNone: false,
            }
        },
        route:{
            data (transition){
                if(transition.to.params.id!=null&&transition.to.params.id!=undefined&&transition.to.params.id!= ''&&transition.to.params.id!= 'm'){
                    this.id = decodeURI(transition.to.params.id);
                }else if(transition.to.params.id=='m'){
                    this.id = '';
                }
            }
        },
        created: function(){

        },
        ready:function() {
            this.dealUserCommunity(); 
            let self = this;
            window.onscroll = function(){
                if(document.body.clientHeight-document.body.scrollTop<1000){
                    if(self.nextPageToken!=''){
                        self.dealUserCommunity();
                        self.nextPageToken='';
                    }
                }
                if(document.body.scrollTop>1000) {
                    self.isBackTopShow = true;
                }else{
                    self.isBackTopShow = false;
                }
            }
        },
        methods:{
            getUserCommunityUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/user_works.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/user_pub_list';
                }
                return url;
            },
            dealUserCommunity: function(){
                let url = this.getUserCommunityUrl();
                this.$http({url: url, method: 'GET',data: {user_id:this.id,page_token:this.nextPageToken,type:'thread'},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.community = this.community.concat(response.data.data.list);
                        // console.dir(this.works);
                        // console.dir(response.data.data.list);
                        this.nextPageToken = response.data.data.next_page_token;
                    }
                });
            },
        },
        components:{
            'community-one':require('../components/community-one.vue'),
            'back-top':require('../components/back-top.vue'),
        }
    }
</script>


