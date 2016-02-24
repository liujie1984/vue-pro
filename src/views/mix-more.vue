<style lang="less">

</style>
<template>
    <nav-top v-if="navShow==1" type="news"></nav-top>
    <div v-touch:swipe ="swipeSquare" v-touch-options:swipe="{direction: 'horizontal',threshold: 100}">
        <mix-one v-for="mix in mix" :mix="mix"></mix-one>
    </div>
    <footer-bottom v-if="footerShow==1" type="news"></footer-bottom>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
    	data:function(){
      		return {
      			mix:'',
                tags:'',
                navShow:0,
                footerShow:0,
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
                        this.navShow=1;
                        this.footerShow=1;
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
            },
            swipeSquare: function (e) {
            // console.dir(e.deltaX);
                if(this.type == 'news'){
                    if(e.deltaX>100){
                        this.$route.router.go({ name:'mix',params: { type: 'tutorial' }});
                    }else if(e.deltaX<-100){
                        this.$route.router.go({ name:'mix',params: { type: 'review' }});
                    }
                }
            },
     	},
        components:{
            'nav-top':require('../components/nav-top.vue'),
            'mix-one':require('../components/mix-one.vue'),
            'back-top':require('../components/back-top.vue'),
            'footer-bottom':require('../components/footer-bottom.vue'),
        }
    }
</script>


