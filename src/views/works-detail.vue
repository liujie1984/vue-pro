<style lang="less">

</style>
<template>
    <nav-top v-show="nav_show==1" type="news"></nav-top>
    <mix-one v-for="mix in mix" :mix="mix"></mix-one>
</template>
<script>
    export default {
    	data:function(){
      		return {
      			mix:'',
                type:'',
                tags:'',
                nav_show:0
      		}
      	},
        route:{
            data (transition){
                this.type = transition.to.params.type;
                switch (this.type){
                    case 'news':
                        this.tags='行业动态';
                        this.nav_show=1;
                        break;
                    case 'review':
                        this.tags='行业动态';
                        break;
                    case 'review':
                        this.tags='行业动态';
                        break;
                }
                console.dir(transition.to.params.type);
                console.dir(this.type);
            }
        },
    	ready:function() {
            let url = this.getMixUrl();
            console.log(url);
        	this.$http({url: url, method: 'GET'}).then(function (response) {
        		this.mix = response.data.data.list;
        		console.dir(this.mix);
        	});
        },
        methods:{
          	getMixUrl: function(){
            	let url = '';
            	if (localStorage.getItem('apphost')=='http://localhost:8080/'){
              		url = localStorage.getItem('apphost') + 'apiv2/infolist_by_taglist_'+this.tags+'.json';
            	}else{
              		url = localStorage.getItem('apphost') + 'apiv2/tutorial_and_review_v21?info_type=tutorial';
            	}
            	return url;
         	}
     	},
        components:{
            'nav-top':require('../components/nav-top.vue'),
            'mix-one':require('../components/mix-one.vue')
        }
    }
</script>


