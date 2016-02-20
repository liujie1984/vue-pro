<style lang="less">
    #banner{height: 140px;}
    #banner-image{height:140px;width:100%;}
    #banner-choose{margin-top:-28px;text-align:center;}
    #banner-choose li{display: inline-block;width: 5px;height: 5px;border-radius: 5px;
        background-color: white;margin:0 3px 0 3px;}
    .banner-choose-color{background-color:yellow !important;}
</style>
<template>
    <!-- 全局header -->
    <nav-top type="recommend"></nav-top>
    <!-- banner轮播begin -->
    <div id="banner">
        <a v-bind:href="bannerUrl">
            <img id="banner-image" v-touch:swipe.stop="onSwipe" v-touch-options:swipe="{threshold: 100}"
            v-bind:src="bannerImg">
        </a>
            <!-- {name:'works-detail',params: { id: 1}} -->
        <ul id="banner-choose">
            <li v-for="banner in banner" v-bind:class="{'banner-choose-color': $index==bannerNum}"></li>
        </ul>
    </div>
    <!-- 作品列表 -->
    <div id="works-list">
        <works-one v-for="works in works" :works="works" type="recommend"></works-one>
    </div>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
        data:function(){
            return {
                bannerNum:0,
                bannerImg:'',
                bannerUrl:'',
                bannerLength:0,
                banner:'',
                works:'',
                nextPageToken:'',
                isBackTopShow: false,
            }
        },
        init:function() {

        },
    created:function() {
        let url = this.getRecommendListUrl();
        this.$http({url: url, method: 'GET'}).then(function (response) {
            this.banner = response.data.data.banner_list;
            this.works = response.data.data.list;
            this.nextPageToken = response.data.data.next_page_token;

            this.bannerImg = this.banner[0].image;
            this.bannerUrl = this.refurlDeal(this.banner[0].ref_url);
            this.bannerLength = this.banner.length;
            let self = this;
            setInterval(function(){
                self.bannerImg=self.banner[self.bannerNum].image;
                self.bannerUrl = self.refurlDeal(self.banner[self.bannerNum].ref_url);
                // console.dir(self.bannerImg);
                // console.dir(self.bannerUrl);
                if(self.bannerNum<self.bannerLength-1){
                    self.bannerNum++;
                }else{
                    self.bannerNum=0;
                }
            },4000);
        });
    },
    ready:function() {
        let self = this;
        window.onscroll = function(){
            // console.dir(document.body.clientHeight);
            // console.dir(document.body.scrollTop);
            if(document.body.clientHeight-document.body.scrollTop<1000){
                if(self.nextPageToken!=''){
                    self.getData();
                    self.nextPageToken='';
                }
                // console.dir(self);
            }
            if(document.body.scrollTop>1000) {
                self.isBackTopShow = true;
            }else{
                self.isBackTopShow = false;
            }
        }
    },
    methods:{
        getRecommendListUrl: function(){
            let url = '';
            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                url = localStorage.getItem('apphost') + 'apiv2/recommend_list.json';
            }else{
                url = localStorage.getItem('apphost') + 'apiv2/recommend_list_v21';
            }
            return url;
        },
        onSwipe: function (e) {
            // console.dir(this.banner);
            this.bannerImg=this.banner[this.bannerNum].image;
            this.bannerUrl = this.refurlDeal(this.banner[this.bannerNum].ref_url);
            let bannerLength = this.banner.length;
            if(this.bannerNum<bannerLength-1){
                this.bannerNum++;
            }else{
                this.bannerNum=0;
            }
            // console.dir(this.bannerNum);
            // console.dir(e.deltaX);
        },
        getData: function(){
            let url = this.getRecommendListUrl();
            // page_token:xxx
            this.$http({url: url, method: 'GET',data:{page_token:this.nextPageToken},xhr:{withCredentials:true}}).then(function (response) {
                this.works = this.works.concat(response.data.data.list);
                this.nextPageToken = response.data.data.next_page_token;
                // console.dir(this.works);
                // console.dir(this.nextPageToken);
            });
        },
        refurlDeal: function(url){
            console.dir(url);
            let urlSplit = url.split('?');
            let urlType = urlSplit[0].split('/')[3];
            let urlParams = urlSplit[1].split((/[=&]/));
            let returnUrl = '';
            // console.dir(urlSplit);
            console.dir(urlType);
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
            }
            return returnUrl;
        }, 
        forMatch: function(str,urlParams) {
            let urlParamsLength = urlParams.length;
            let returnStr = '';
            // console.dir(str);
            for(let i=0;i<urlParamsLength;i=i+2){
                if(urlParams[i].match(str)){
                    console.dir(urlParams[i+1]);
                    returnStr = decodeURIComponent(urlParams[i+1]);
                }
            }
            return returnStr;
        }
    },
    components:{
        'nav-top':require('../components/nav-top.vue'),
        'works-one':require('../components/works-one.vue'),
        'back-top':require('../components/back-top.vue'),
    }
};
</script>


