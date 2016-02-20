<style lang="less">

</style>
<template>
    <nav-top v-show="nav_show==1" type="news"></nav-top>
    <mix-one v-for="mix in mix" :mix="mix"></mix-one>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
    	data:function(){
      		return {
      			mix:'',
                tags:'',
                nav_show:0,
                nextPageToken:'',
                isBackTopShow: false,
      		}
      	},
        route:{
            data (transition){
                this.type = decodeURI(transition.to.params.type);
                switch (this.type){
                    case 'news':
                        this.tags='{{行业动态}}';
                        this.nav_show=1;
                        break;
                    default:
                        this.tags='{{'+this.type+'}}';
                        break;
                }
            }
        },
        created: function(){
            
        },
    	ready:function() {
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
          	getMixUrl: function(){
            	let url = '';
            	if (localStorage.getItem('apphost')=='http://localhost:8080/'){
              		url = localStorage.getItem('apphost') + 'apiv2/infolist_by_taglist_'+encodeURI(this.tags)+'.json';
            	}else{
              		url = localStorage.getItem('apphost') + 'apiv2/infolist_by_taglist';
            	}
            	return url;
         	},
            getData: function(){
                let url = this.getMixUrl();
                this.$http({url: url, method: 'GET',data: {tags:this.tags,page_token:this.nextPageToken},xhr:{withCredentials:true}}).then(function (response) {
                    this.mix = response.data.data.list;
                // console.dir(this.mix);
                });
            }
     	},
        components:{
            'nav-top':require('../components/nav-top.vue'),
            'mix-one':require('../components/mix-one.vue'),
            'back-top':require('../components/back-top.vue'),
        }
    }
</script>


