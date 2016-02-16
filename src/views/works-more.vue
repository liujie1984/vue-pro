<style lang="less">

</style>
<template>
    <!-- 全局header -->
    <nav-top></nav-top>
    <works-one v-for="works in works" :works="works" type="normal"></works-one>
</template>
<script>
	export default {
    	data:function(){
        	return {
           	 	works:'',
            	nextPageToken:'',
            	type:''
        	}
    	},
    	route:{
        	data (transition){
                this.type = decodeURI(transition.to.params.type);
                console.dir(transition.to.params.type);
                console.dir(this.type);
            }
        },
    	ready:function() {
    		let url = this.getLatestPublistUrl();
        	console.log(url);
        	this.$http({url: url, method: 'GET'}).then(function (response) {
            	this.works = response.data.data.list;
            	this.nextPageToken = response.data.data.next_page_token;
            	console.log(this.nextPageToken);
        	});
        	let self = this;
        	window.onscroll = function(){
            // console.dir(document.body.clientHeight);
            // console.dir(document.body.scrollTop);
            	if(document.body.clientHeight-document.body.scrollTop<1000){
                	if(self.nextPageToken!=''){
                    	self.getData();
                    	self.nextPageToken='';
                	}
                	console.dir(self);
            	}
        	}
    	},
    	watch:{
        	'type': function (val, oldVal) {
            	console.log('new: %s, old: %s', val, oldVal);
            	let url = this.getLatestPublistUrl();
            	console.log(url);
            	this.$http({url: url, method: 'GET'}).then(function (response) {
                	this.works = response.data.data.list;
                	console.dir(this.works);
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
            	this.$http({url: url, method: 'GET'}).then(function (response) {
                	this.works = this.works.concat(response.data.data.list);
                	this.nextPageToken = response.data.data.next_page_token;
                	console.dir(this.works);
                	console.dir(this.nextPageToken);
            	});
        	}
    	},
    	components:{
        	'nav-top':require('../components/nav-top.vue'),
        	'works-one':require('../components/works-one.vue'),
    	}
	};
</script>

