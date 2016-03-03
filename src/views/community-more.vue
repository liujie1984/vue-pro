<style lang="less">

</style>
<template>
    <div>
        <community-one v-for="communitys in communitys" :communitys="communitys"></community-one>
    </div>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
    	data:function(){
      		return {
                id:'',
                title:'',
                communitys:'',
                nextPageToken:'',
                isBackTopShow: false,
      		}
      	},
        route:{
            data (transition){
                this.id = decodeURI(transition.to.params.id);
                this.title = transition.to.params.title;
                // console.dir(this.title);
            }
        },
        created: function(){
            
        },
    	ready:function() {
            document.title = this.title;
            
            this.getData();
            let self = this;
            window.onscroll = function(){
                if(document.body.clientHeight-document.body.scrollTop<1000){
                    if(self.nextPageToken!=''){
                        self.getData();
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
          	getCommunitysMoreUrl: function(){
            	let url = '';
            	if (localStorage.getItem('apphost')=='http://localhost:8080/'){
              		url = localStorage.getItem('apphost') + 'apiv2/community_detail.json';
            	}else{
              		url = localStorage.getItem('apphost') + 'apiv2/community_detail';
            	}
            	return url;
         	},
            getData: function(){
                let url = this.getCommunitysMoreUrl();
                this.$http({url: url, method: 'GET',data: {community_id:this.id,page_token:this.nextPageToken},xhr:{withCredentials:true}}).then(function (response) {
                    this.communitys = response.data.data.list;
                // console.dir(this.mix);
                });
            },
     	},
        components:{
            'community-one':require('../components/community-one.vue'),
            'back-top':require('../components/back-top.vue'),
        }
    }
</script>


