<style lang="less">
    #banner{height: 140px;}
    #banner-image{height:140px;width:100%;}
    #banner-choose{margin-top:-28px;text-align:center;}
    #banner-choose li{display: inline-block;width: 5px;height: 5px;border-radius: 5px;
        background-color: white;margin:0 3px 0 3px;}
    .banner-choose-color{background-color:yellow !important;}

    #community-title-list{height: 90px;width: 100%;}
    .community-title-one{width: 33%;font-size: 16px;color: #222222;height: 45px;line-height: 45px;
        display: inline-block;text-align: center;border-bottom: 1px solid #dcdcdc;border-right: 1px solid #dcdcdc;}

    #community-block{height: 10px;background-color: #f2f1ef;}
</style>
<template>
    <!-- banner轮播begin -->
    <div id="banner">
        <a v-bind:href="bannerUrl">
            <img id="banner-image" v-touch:swipe.stop="onSwipe" v-touch-options:swipe="{threshold: 100}"
            v-bind:src="bannerImg">
        </a>
        <ul id="banner-choose">
            <li v-for="banner in banner" v-bind:class="{'banner-choose-color': $index==bannerNum}"></li>
        </ul>
    </div>
    <!-- 社区列表 -->
    <ul id="community-title-list">
        <li class="community-title-one" v-for="a in communityTitleList" v-link="{name:'community-more',params: { id: a.community_id}}">{{a.title}}</span>
    </ul>
    <div id="community-block"></div>
    <div id="community-list">
        <community-one v-for="communitys in communitys" :communitys="communitys"></community-one>
    </div>
    <!-- 作品列表 -->
    <footer-bottom></footer-bottom>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
        data: function(){
            return {
                bannerNum:0,
                bannerImg:'',
                bannerUrl:'',
                bannerLength:0,
                banner:'',
                communityTitleList:[{
                    title:'',
                }],
                communitys:'',
                nextPageToken:'',
                isBackTopShow: false,
            }
        },
        init: function() {

        },
        created: function() {
            let url = this.getCommunityMainUrl();
            this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response) {
                this.banner = response.data.data.banner_list;
                this.communitys = response.data.data.list;
                this.communityTitleList = response.data.data.community_list;
                // console.dir(this.communityTitleList);
                this.nextPageToken = response.data.data.next_page_token;

                this.bannerImg = this.banner[0].image;
                this.bannerUrl = this.refurlDeal(this.banner[0].ref_url);
                this.bannerLength = this.banner.length;
                let self = this;
                self.bannerTimer = setInterval(self.bannerShuffling,2000,self);
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
            getCommunityMainUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/community_main.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/community_main';
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
            },
            bannerShuffling: function(self){
                self.bannerImg=self.banner[self.bannerNum].image;
                self.bannerUrl = self.refurlDeal(self.banner[self.bannerNum].ref_url);
                console.dir(self.bannerUrl);
                if(self.bannerNum<self.bannerLength-1){
                    self.bannerNum++;
                }else{
                    self.bannerNum=0;
                }
            },
            getData: function(){
                let url = this.getCommunityMainUrl();
                // page_token:xxx
                this.$http({url: url, method: 'GET',data:{page_token:this.nextPageToken},xhr:{withCredentials:true}}).then(function (response) {
                    this.communitys = this.communitys.concat(response.data.data.list);
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
            'community-one':require('../components/community-one.vue'),
            'back-top':require('../components/back-top.vue'),
            'footer-bottom':require('../components/footer-bottom.vue'),
        }
    };
</script>


