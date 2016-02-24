<style lang="less">

</style>
<template>
    <!-- 全局header -->
    <nav-top></nav-top>
    <div v-touch:swipe="swipeSquare" v-touch-options:swipe="{direction: 'horizontal',threshold: 100}">
        <works-one v-for="works in works" :works="works" type="normal"></works-one>
    </div>
    <footer-bottom></footer-bottom>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
	export default {
    	data:function(){
        	return {
           	 	works:'',
            	nextPageToken:'',
            	type:'',
                isBackTopShow: false,
        	}
    	},
    	route:{
        	data (transition){
                this.type = decodeURI(transition.to.params.type);
                // console.dir(transition.to.params.type);
                // console.dir(this.type);
            }
        },
    	ready:function() {
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
    	watch:{
        	'type': function (val, oldVal) {
            	// console.log('new: %s, old: %s', val, oldVal);
            	let url = this.getLatestPublistUrl();
            	// console.log(url);
            	this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response) {
                	this.works = response.data.data.list;
                    this.nextPageToken = response.data.data.next_page_token;
                	// console.dir(this.works);
            	});
        	},
    	},
    	methods:{
        	getLatestPublistUrl: function(){
            	let url = '';
            	if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                	url = localStorage.getItem('apphost') + 'apiv2/latest_publist_'+this.type+'.json';
            	}else{
                	url = localStorage.getItem('apphost') + 'apiv2/latest_publist?pub_type='+this.type;
            	}
            	return url;
        	},
        	getData: function(){
        	    let url = this.getLatestPublistUrl();
            	this.$http({url: url, method: 'GET',data:{page_token:this.nextPageToken},xhr:{withCredentials:true}}).then(function (response) {
                	this.works = this.works.concat(response.data.data.list);
                	this.nextPageToken = response.data.data.next_page_token;
                	// console.dir(this.works);
                	// console.dir(this.nextPageToken);
            	});
        	},
            swipeSquare: function (e) {
            // console.dir(e.deltaX);
                if(e.deltaX>100){
                    if(this.type == 'image'){
                        this.$route.router.go({ name:'recommend' });
                    }else if(this.type == 'video'){
                        this.$route.router.go({ name:'works-more',params: { type: 'image' }});
                    }
                }else if(e.deltaX<-100){
                   if(this.type == 'image'){
                        this.$route.router.go({ name:'works-more',params: { type: 'video' }});
                    }else if(this.type == 'video'){
                        this.$route.router.go({ name:'focus' });
                    }
                }
            },
    	},
    	components:{
        	'nav-top':require('../components/nav-top.vue'),
        	'works-one':require('../components/works-one.vue'),
            'back-top':require('../components/back-top.vue'),
            'footer-bottom':require('../components/footer-bottom.vue'),
    	}
	};
</script>

