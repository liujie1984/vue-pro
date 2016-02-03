<template>
    <!-- 全局header -->
    <nav-top type="recommend"></nav-top>
    <banner :banner-list="bannerList"></banner>	
</template>
<script>
    export default {
    	data:{
    		bannerList:'1',
    		worksList:'1'
    	},
    	ready:function() {
      		this.$http({url: 'mock/recommend.json', method: 'GET'}).then(function (response) {
      			this.bannerList = response.data.data.banner_list;
      			this.worksList = JSON.stringify(response.data.data.list);
      			console.dir(this.bannerList);
      			console.dir(response);
      		}, function (response) {
          
      		});
      	},
        components:{
            'nav-top':require('../components/nav-top.vue'),
            'banner':require('../components/banner.vue')
        }
    }
</script>
<style lang="less">

</style>

