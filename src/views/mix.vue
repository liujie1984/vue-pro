<style lang="less">
    .blank{height: 10px;background-color: #f2f1ef;}
    .mix-top{margin-top: 14px;height: 20px;}
    .mix-top span{display: inline-block;vertical-align: top;}
    .mix-top-left{background-color: #fda946;height: 20px;width: 4px;margin: 0 8px 0 8px;}
    .mix-title{height: 20px;line-height: 20px;font-size: 14px;}
    .mix-more{font-size: 14px;float: right;margin: 0 10px 0 0;color: #9a9a9a;}
</style>
<template>
    <!-- 全局header -->
    <nav-top></nav-top>
    <div v-touch:swipe="swipeSquare" v-touch-options:swipe="{direction: 'horizontal',threshold: 100}">
        <div v-for="mix in mix">
            <div class="blank"></div>
            <div class="mix-top">
                <span class="mix-top-left"></span><span class="mix-title">{{mix.title}}</span><span class="mix-more" v-link="{ name: 'mix-more', params: { type: encodeURI(mix.title)}}">更多></span>
        </div>
        <mix-one v-for="mix.items in mix.items" :mix="mix.items[$index]"></mix-one>
    </div>
    </div>
    <footer-bottom></footer-bottom>
</template>
<script>
    export default {
        data:function(){
            return {
                mix:'',
                type:''
            }
        },
        route:{
            data (transition){
                this.type = transition.to.params.type;
                // console.dir(transition.to.params.type);
                // console.dir(this.type);
            }
        },
        created: function(){
            document.title = '广场';
        },
        ready:function() {
            // console.dir(this.type);
            let url = this.getmixUrl();
            // console.log(url);
            this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response) {
                this.mix = response.data.data.list;
                // console.dir(this.mix);
            });
        },
        watch:{
            'type': function (val, oldVal) {
                // console.log('new: %s, old: %s', val, oldVal);
                let url = this.getmixUrl();
                // console.log(url);
                this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response) {
                    this.mix = response.data.data.list;
                    // console.dir(this.mix);
                });
            },
        },
        methods:{
            getmixUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/tutorial_and_review_v21_'+this.type+'.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/tutorial_and_review_v21?info_type='+this.type;
                }
                return url;
            },
            swipeSquare: function (e) {
            // console.dir(e.deltaX);
                if(e.deltaX>100){
                    if(this.type == 'tutorial'){
                        this.$route.router.go({ name:'focus' });
                    }else if(this.type == 'review'){
                        this.$route.router.go({name:'mix-more',params: { type: 'news' }});
                    }
                }else if(e.deltaX<-100){
                    if(this.type == 'tutorial'){
                        this.$route.router.go({ name:'mix-more',params: { type: 'news' }});
                    }else if(this.type == 'review'){
                        // this.$route.router.go({ name:'works-more',params: { type: 'image' }});
                    }
                }
            },
        },
        components:{
            'nav-top':require('../components/nav-top.vue'),
            'mix-one':require('../components/mix-one.vue'),
            'footer-bottom':require('../components/footer-bottom.vue'),
        }
    }
</script>

