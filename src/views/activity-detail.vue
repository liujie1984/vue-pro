<style lang="less">
    .activity-detail-banner{width: 100%;}
    .activity-detail-name{font-size: 16px;color: #222222;height: 40px;line-height: 40px;padding:10px;}
    .activity-detail-time{height: 24px;line-height: 24px;font-size: 12px;color: #737373;padding: 10px;}
    .activity-detail-show p{font-size: 12px;color: #737373;padding: 0 10px 0 10px;}
    .activity-detail-show-title{margin: 10px 0 10px 0;}
    .activity-detail-show-more-button-container{text-align: right;margin: 10px 0 10px 0;}
    .activity-detail-show-more-button{font-size: 14px;color: #737373;border: 1px solid #dcdcdc;padding: 5px 10px 5px 10px;position: relative;
        right: 10px;}
    .activity-detail-blank{height: 10px; background-color: #f2f1ef;clear: both;margin-top: 10px;}
</style>
<template>
    <img class="activity-detail-banner" v-bind:src="activityContent.thumbnail_url">
    <p class="activity-detail-name">{{activityContent.name}}</p>
    <p class="activity-detail-time">【活动时间】 <span>{{activityContent.StartTime}}</span>-<span>{{activityContent.StopTime}}</span></p>
    <div class="activity-detail-show" v-show="showMore==true">
        <p class="activity-detail-show-title">【活动规则】</p>
        <p>{{activityContent.simple_rule}}</p>
        <p class="activity-detail-show-title">【活动奖品】</p>
        <p>{{activityContent.prize}}</p>
        <p class="activity-detail-show-title">【活动须知】</p>
        <p>{{activityContent.info}}</p>
    </div>
    <div class="activity-detail-show-more-button-container">
        <span class="activity-detail-show-more-button" v-on:click="showDeal">{{showMoreTitle}}</span>
    </div>
    <div class="activity-detail-blank"></div>
    <works-one v-for="works in works" :works="works" type="normal"></works-one>
    <footer-bottom></footer-bottom>
</template>
<script>
    export default {
    	data:function(){
            return {
                works:[],
                nextPageToken:'',
                isBackTopShow: false,
                id:'',
                showMore: false,
                showMoreTitle:'查看全部',
                activityContent:{
                    thumbnail_url:'',
                    name:'',
                    StartTime:'',
                    StopTime:'',
                    prize:'',
                    info:'',
                    simple_rule:'',
                },
            }
        },
        route:{
            data (transition){
                this.id = decodeURI(transition.to.params.id);
            }
        },
        created: function(){
            document.title = '活动详情';
        },
        ready: function(){
            this.getActivityContent();
            this.getActivityWorks();
            let self = this;
            window.onscroll = function(){
                if(document.body.clientHeight-document.body.scrollTop<1000){
                    if(self.nextPageToken!=''){
                        self.getActivityWorks();
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
            getActivityContentUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/activity.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/activity_review_detail';
                }
                return url;
            },
            getActivityContent: function(){
                let url = this.getActivityContentUrl();
                this.$http({url: url, method: 'GET',data:{activity_id:this.id},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.activityContent = response.data.data;
                        let activityTime = this.activityContent.activity_time.split('-');
                        this.StartTime = this.timestampToStr(activityTime[0]);
                        this.StopTime = this.timestampToStr(activityTime[1]);
                    }
                });
            },
            getActivityWorksUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/activity_review.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/activity_publist';
                }
                return url;
            },
            getActivityWorks: function(){
                let url = this.getActivityWorksUrl();
                this.$http({url: url, method: 'GET',data:{activity_id:this.id,page_token:this.next_page_token},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.works = this.works.concat(response.data.data.list);
                        this.nextPageToken = response.data.data.next_page_token;
                        // console.dir(response.data.data.list);
                    }
                });
            },
            showDeal: function(){
                if(this.showMore==true){
                    this.showMore=false;
                    this.showMoreTitle = '查看全部';
                }else{
                    this.showMore=true;
                    this.showMoreTitle = '收起';
                }
            },
            timestampToStr: function(timestamp){
                var unixTimestamp = new Date(timestamp * 1000) ;
                var d = new Date(timestamp * 1000);
                var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+
                (d.getDate())+" "+(d.getHours()-8)+":"+(d.getMinutes());
                return jstimestamp;
            },
        },
        components:{
            'footer-bottom':require('../components/footer-bottom.vue'),
            'works-one':require('../components/works-one.vue'),
        }
    }
</script>


