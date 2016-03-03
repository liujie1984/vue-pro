<style lang="less">

</style>
<template>
    
    <works-one v-for="works in works" :works="works" type="nouser"></works-one>
    <back-top v-show="isBackTopShow==true"></back-top>
</template>
<script>
    export default {
        data:function(){
            return {
                works:[],
                id:'',
                nextPageToken:'',
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

        },
        ready:function() {
            this.dealUserWorks(); 
            let self = this;
            window.onscroll = function(){
                if(document.body.clientHeight-document.body.scrollTop<1000){
                    if(self.nextPageToken!=''){
                        self.dealUserWorks();
                        self.nextPageToken='';
                    }
                }
                if(document.body.scrollTop>1000) {
                    self.isBackTopShow = true;
                }else{
                    self.isBackTopShow = false;
                }
            }
        },
        methods:{
            getUserWorkUrl: function(){
                let url = '';
                if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                    url = localStorage.getItem('apphost') + 'apiv2/user_works.json';
                }else{
                    url = localStorage.getItem('apphost') + 'apiv2/user_pub_list';
                }
                return url;
            },
            dealUserWorks: function(){
                let url = this.getUserWorkUrl();
                this.$http({url: url, method: 'GET',data: {user_id:this.id,page_token:this.nextPageToken,type:'pub'},xhr:{withCredentials:true}}).then(function (response){
                    if(response.data.code==0){
                        this.works = this.works.concat(response.data.data.list);
                        // console.dir(this.works);
                        // console.dir(response.data.data.list);
                        this.nextPageToken = response.data.data.next_page_token;
                    }
                });
            },
        },
        components:{
            'works-one':require('../components/works-one.vue'),
            'back-top':require('../components/back-top.vue'),
        }
    }
</script>


