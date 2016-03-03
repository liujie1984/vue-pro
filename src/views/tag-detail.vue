<style lang="less">

</style>
<template>
    <!-- 全局header -->
    <tag-one :tag="tag" :status="tagStatus" type="text"></tag-one>
    <works-one v-for="works in works" :works="works" type="normal"></works-one>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
	export default {
    	data:function(){
        	return {
                tag:'',
           	 	works:[],
            	nextPageToken:'',
            	id:'',
                isBackTopShow: false,
                tagStatus:'unfollow'
        	}
    	},
    	route:{
        	data (transition){
                this.id = decodeURI(transition.to.params.id);
            }
        },
        created: function(){
            document.title = '标签详情';
        },
    	ready:function() {
            this.getWorks();
            this.getTag();
        	let self = this;
        	window.onscroll = function(){
            	if(document.body.clientHeight-document.body.scrollTop<1000){
                	if(self.nextPageToken!=''){
                    	self.getWorks();
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
        	getTagUrl: function(){
            	let url = '';
            	if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                	url = localStorage.getItem('apphost') + 'apiv2/tag_info.json';
            	}else{
                	url = localStorage.getItem('apphost') + 'apiv2/taginfo_by_id';
            	}
            	return url;
        	},
        	getTag: function(){
        	    let url = this.getTagUrl();
            	this.$http({url: url, method: 'GET',data:{tag_id:this.id},xhr:{withCredentials:true}}).then(function (response) {
                    if(response.data.code==0){
                        this.tag = response.data.data;
                        if(this.tag.is_followed!=null){
                            if(this.tag.is_followed ==1){
                                this.tagStatus = 'followed'; 
                            }
                        }
                        // console.dir(this.tag);
                    }
            	});
        	},
            getWorksUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/recommend_list.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/get_publist_by_tag';
                }
                return url;
            },
            getWorks: function(){
                let url = this.getWorksUrl();
                this.$http({url: url, method: 'GET',data:{page_token:this.nextPageToken,tag_id: this.id},xhr:{withCredentials:true}}).then(function (response) {
                    if(response.data.code==0){
                        this.works = this.works.concat(response.data.data.list);
                        this.nextPageToken = response.data.data.next_page_token;  
                    }

                });
            },
    	},
    	components:{
        	'tag-one':require('../components/tag-one.vue'),
        	'works-one':require('../components/works-one.vue'),
            'back-top':require('../components/back-top.vue'),
    	}
	};
</script>

