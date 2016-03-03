<style lang="less">
    .find-img{width: 100%;}
</style>
<template>
    <a v-bind:href="discoveryMenusData.ref_url" v-for="discoveryMenusData in discoveryMenusData">
        <img class="find-img" v-bind:src="discoveryMenusData.img_url">
    </a>
    <footer-bottom></footer-bottom>
</template>
<script>
    export default {
    	data:function(){
            return {
                discoveryMenusData:[{
                	img_url:'',
                    ref_url:'',
                    // nextPageToken:'',
                }],
            }
        },
        created: function(){
            document.title = '发现';
            // this.dealUser(); 
        },
        ready: function(){
            this.dealDiscoveryMenus();
        },
        methods:{
            getDiscoveryMenusUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/discovery_menus.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/get_discovery_menus';
                }
                return url;
            },
            dealDiscoveryMenus: function(){
                let url = this.getDiscoveryMenusUrl();
                this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.discoveryMenusData = response.data.data.list;
                        // console.dir(this.discoveryMenusData);
                        let length = this.discoveryMenusData.length;
                        for(let i=0;i<length;i++){
                            let newRefurl = this.refurlDeal(this.discoveryMenusData[i].ref_url);
                            // console.dir(newRefurl); 
                            if(newRefurl==''){
                                // this.discoveryMenusData[i]='';
                            }else{
                                this.discoveryMenusData[i].ref_url = this.refurlDeal(this.discoveryMenusData[i].ref_url); 
                            }
                            
                        }
                    }
                });
            },
            refurlDeal: function(url){
                // console.dir(url);
                let urlSplit = url.split('?');
                let urlType = urlSplit[0].split('/')[3];
                let urlParams = urlSplit[1].split((/[=&]/));
                let returnUrl = '';
                // console.dir(urlSplit);
                // console.dir(urlType);
                // console.dir(urlParams);
                switch (urlType)
                {
                    case 'pub':
                        let pubId = this.forMatch('pub_id',urlParams);
                        returnUrl = '#!/works-detail/'+pubId;
                        break;
                    case 'web':
                    // let pubWebId = this.forMatch('pubid',urlParams);
                    // console.dir(pubWebId);
                    // if(pubWebId==''){
                    //     console.dir('2');
                        returnUrl = this.forMatch('url',urlParams);
                    // }else{
                    //     returnUrl = '/#!/works-detail/'+pubWebId; 
                    // }   
                    break;
                    case 'act_list':
                    returnUrl = '#!/activity-review';
                    break;
                }
                return returnUrl;
            }, 
            forMatch: function(str,urlParams) {
                let urlParamsLength = urlParams.length;
                let returnStr = '';
                // console.dir(str);
                for(let i=0;i<urlParamsLength;i=i+2){
                    if(urlParams[i].match(str)){
                        // console.dir(urlParams[i+1]);
                        returnStr = decodeURIComponent(urlParams[i+1]);
                    }
                }
                return returnStr;
            },
        },
        components:{
            'footer-bottom':require('../components/footer-bottom.vue'),
        }
    }
</script>


