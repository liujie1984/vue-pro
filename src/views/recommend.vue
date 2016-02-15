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
        <img id="banner-image" v-touch:swipe="onSwipe" v-touch-options:swipeleft="{threshold: 200}"
            v-bind:src="bannerImg">
        <ul id="banner-choose">
            <li v-for="banner in banner" v-bind:class="{'banner-choose-color': $index==bannerNum}"></li>
        </ul>
    </div>
    <!-- 作品列表 -->
    <div id="works-list">
        <works-one v-for="works in works" :works="works"></works-one>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            bannerNum:0,
            bannerImg:'',
            bannerLength:0,
            banner:'',
            works:'',
            nextPageToken:''
        }
    },
    created:function() {
        let url = this.getRecommendListUrl();
        console.log(url);
        this.$http({url: url, method: 'GET'}).then(function (response) {
            this.banner = response.data.data.banner_list;
            this.works = response.data.data.list;
            this.nextPageToken = response.data.data.next_page_token;
            console.log(this.nextPageToken);
            this.bannerImg=this.banner[0].image;
            console.dir(this.banner);
            console.dir(this.works);
            this.bannerLength = this.banner.length;
            console.dir(this.bannerLength);
            console.dir(this.bannerNum);
            let self = this;
            setInterval(function(){
                self.bannerImg=self.banner[self.bannerNum].image;
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
                console.dir(self);
            }
        }
    },
    methods:{
        getRecommendListUrl: function(){
            let url = '';
            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                url = localStorage.getItem('apphost') + 'apiv2/recommend_list.json';
            }else{
                url = localStorage.getItem('apphost') + 'apiv2/recommend_list';
            }
            return url;
        },
        onSwipe: function (e) {
            console.dir(this.banner);
            this.bannerImg=this.banner[this.bannerNum].image;
            var bannerLength = this.banner.length;
            if(this.bannerNum<bannerLength-1){
                this.bannerNum++;
            }else{
                this.bannerNum=0;
            }
            console.dir(this.bannerNum);
            console.dir(e.deltaX);
        },
        getData: function(){
            let url = this.getRecommendListUrl();
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


