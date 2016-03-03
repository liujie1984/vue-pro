<style lang="less">

</style>
<template>
    <follow-one v-for="follow in follow" :follow="follow" type="flower"></follow-one>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
        data:function(){
            return {
                follow:[],
                id:'',
                page:'',
                page_size: 10,
                list_ver:'',
                isBackTopShow: false,
            }
        },
        route:{
            data (transition){
                if(transition.to.params.id!=null&&transition.to.params.id!=undefined&&transition.to.params.id!= ''&&transition.to.params.id!= 'm'){
                    this.id = decodeURI(transition.to.params.id);
                }else if(transition.to.params.id=='m'){
                    this.id = '';
                }
            }
        },
        created: function(){
            document.title = '粉丝';
        },
        ready:function() {
            this.getFlower(); 
            let self = this;
            window.onscroll = function(){
                if(document.body.clientHeight-document.body.scrollTop<1000){
                    self.getFlower();
                }
                if(document.body.scrollTop>1000) {
                    self.isBackTopShow = true;
                }else{
                    self.isBackTopShow = false;
                }
            }
        },
        methods:{
            getFlowerUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/flower.json';
                }else{
                    url = localStorage.getItem('apphost') + 'api/followers_list';
                }
                return url;
            },
            getFlower: function(){
                let url = this.getFlowerUrl();
                let token = JSON.parse(sessionStorage.getItem('userData')).token;
                this.$http({url: url, method: 'GET',headers:{'User-Token': token},data: {user_id:this.id,page:this.page,page_size:this.page_size},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.follow = this.follow.concat(response.data.data.list);
                        // console.dir(this.follow);
                        // console.dir(response.data.data.list);
                        this.page++;
                        this.list_ver = response.data.data.list_ver;
                    }
                });
            },
        },
        components:{
            'follow-one':require('../components/follow-one.vue'),
            'back-top':require('../components/back-top.vue'),
        }
    }
</script>


