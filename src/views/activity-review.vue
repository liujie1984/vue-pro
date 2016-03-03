<style lang="less">
    .activity-review-img{width: 100%;}
</style>
<template>
    <img class="activity-review-img" v-for="reviewOne in reviewData" v-bind:src="reviewOne.thumbnail_url" v-link="{name:'activity-detail',params: { id: reviewOne.activity_id}}">
    <footer-bottom></footer-bottom>
</template>
<script>
    export default {
    	data:function(){
            return {
                reviewData:{
                	thumbnail_url:'',
                    activity_id:''
                },
            }
        },
        created: function(){
            // this.dealUser(); 
        },
        ready: function(){
            this.getActivityReview();
        },
        methods:{
            getActivityReviewUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/activity_review.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/activity_review_list';
                }
                return url;
            },
            getActivityReview: function(){
                let url = this.getActivityReviewUrl();
                this.$http({url: url, method: 'GET',xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.reviewData = response.data.data.list;
                        // console.dir(this.reviewData);
                    }
                });
            },
        },
        components:{
            'footer-bottom':require('../components/footer-bottom.vue'),
        }
    }
</script>


