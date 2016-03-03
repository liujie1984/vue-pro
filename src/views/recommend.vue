<style lang="less">
    #recommend-banner{height: 150px;}
    #recommend-banner-image{width:100%;height: 150px;}
    #recommend-banner-choose{margin-top:-28px;text-align:center;}
    #recommend-banner-choose li{display: inline-block;width: 5px;height: 5px;border-radius: 5px;
        background-color: white;margin:0 3px 0 3px;}
    .banner-choose-color{background-color:yellow !important;}
</style>
<template>
    <!-- 全局header -->
    <nav-top type="recommend"></nav-top>
    <!-- banner轮播begin -->
    <div id="recommend-banner">
        <a v-bind:href="bannerUrl">
            <img id="recommend-banner-image" v-touch:swipe="onSwipe" v-touch-options:swipe="{direction: 'horizontal',threshold: 100}"
            v-bind:src="bannerImg">
        </a>
            <!-- {name:'works-detail',params: { id: 1}} -->
        <ul id="recommend-banner-choose">
            <li v-for="banner in banner" v-bind:class="{'banner-choose-color': $index==bannerNum}"></li>
        </ul>
    </div>
    <!-- 作品列表 -->
    <div id="works-list" v-touch:swipeleft="swipeSquareLeft" v-touch-options:swipe="{direction: 'horizontal',threshold: 100}">
        <works-one v-for="works in works" :works="works" type="recommend"></works-one>
    </div>
    <footer-bottom></footer-bottom>
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
                bannerTimer:'',
                works:[],
                nextPageToken:'',
                isBackTopShow: false,
            }
        },
        init:function() {

        },
        created:function() {
            document.title = '广场';
            let url = this.getRecommendListUrl();
            this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response) {
                this.banner = response.data.data.banner_list;
                this.works = response.data.data.list;
                this.nextPageToken = response.data.data.next_page_token;

                this.bannerImg = this.banner[0].image;
                this.bannerUrl = this.refurlDeal(this.banner[0].ref_url);
                this.bannerLength = this.banner.length;
                let self = this;
                self.bannerTimer = setInterval(self.bannerShuffling,2000,self);
            });
        },
        ready:function() {
            var throttle = function ( fn, interval ) {
                var __self = fn, // 保存需要被延迟执行的函数引用
                    timer, // 定时器
                    firstTime = true; // 是否是第一次调用
                    return function () {
                        var args = arguments,
                        __me = this;
                        if ( firstTime ) { // 如果是第一次调用，不需延迟执行
                            __self.apply(__me, args);
                            return firstTime = false;
                        }
                        if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
                            return false;
                        }
                        timer = setTimeout(function () { // 延迟一段时间执行
                            clearTimeout(timer);
                            timer = null;
                            __self.apply(__me, args);
                        }, interval || 500 );
                    };
                };
            let self = this;
            window.onscroll = throttle(function(){
                // console.dir('onscroll');
                if(document.body.clientHeight-document.body.scrollTop<1500){
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
            },500);
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
                clearInterval(this.bannerTimer);
                this.bannerImg=this.banner[this.bannerNum].image;
                this.bannerUrl = this.refurlDeal(this.banner[this.bannerNum].ref_url);
                let bannerLength = this.banner.length;
                if(this.bannerNum<bannerLength-1){
                    this.bannerNum++;
                }else{
                    this.bannerNum=0;
                }
                let self = this;
                setTimeout(function(){
                    self.bannerTimer = setInterval(self.bannerShuffling,2000,self);
                },6000,self);
            // console.dir(this.bannerNum);
            // console.dir(e.deltaX);
            },
            swipeSquareLeft: function (e) {
                this.$route.router.go({ name:'works-more',params: { type: 'image' }});
            },
            bannerShuffling: function(self){
                self.bannerImg=self.banner[self.bannerNum].image;
                self.bannerUrl = self.refurlDeal(self.banner[self.bannerNum].ref_url);
                if(self.bannerNum<self.bannerLength-1){
                    self.bannerNum++;
                 }else{
                    self.bannerNum=0;
                }
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
            }
        },
        components:{
            'nav-top':require('../components/nav-top.vue'),
            'works-one':require('../components/works-one.vue'),
            'back-top':require('../components/back-top.vue'),
            'footer-bottom':require('../components/footer-bottom.vue'),
        }
    };
</script>


