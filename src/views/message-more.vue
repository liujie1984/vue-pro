<style lang="less">

</style>
<template>
<message-one v-for="one in message" :message="one" :type="type"></message-one>
</template>
<script>
export default {
    data:function(){
        return {
            message:[],
            type:'',
            lastId:'',
            firstId:''
        }
    },
    route:{
        data (transition){
            this.type = decodeURI(transition.to.params.type);
        }
    },
    created:function(){

    },
    ready:function() {
        // console.log(this.type);
        switch(this.type)
        {
            case 'like':
                document.title = '赞';
                break;
            case 'comment':
                document.title = '评论';
                break;
            case 'follow':
                document.title = '关注';
                break;
            case 'chat':
                document.title = '私聊';
                break;
        }
        
        this.getMessageMore();
        let self = this;
        window.onscroll = function(){
            if(document.body.clientHeight-document.body.scrollTop<1000){
                self.getMessageMore();
            }
        }
    },
    methods:{
        getMessageMoreUrl: function(){
            let url = '';
            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                url = localStorage.getItem('apphost') + 'apiv2/message_more.json';
            }else{
                url = localStorage.getItem('apphost') + 'api/my_message_new';
            }
            return url;
        },
        getMessageMore: function(){
            let url = this.getMessageMoreUrl();
            this.$http({url: url, method: 'GET',data: {catalog:this.type,last_id:this.last_id},xhr:{withCredentials:true}}).then(function (response) {
                // console.dir(response);
                if(response.data.code==0&&response.data.data.list.length!=0){
                    let list = response.data.data.list;
                    let listLength = list.length;
                    this.message = this.message.concat(list);
                    this.lastId = response.data.data.list[listLength-1].message_id;
                    if(this.firstId==''){
                        this.firstId=list[0].message_id;
                        this.lastId=list[listLength-1].message_id
                        this.postMessageReaded();
                    }
                    // console.dir(this.firstId);
                }
            });
        },
        postMessageReadedUrl: function(){
            let url = '';
            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                url = localStorage.getItem('apphost') + 'apiv2/message_more.json';
            }else{
                url = localStorage.getItem('apphost') + 'api/set_msgs_readed';
            }
            return url;
        },
        postMessageReaded: function(){
            let url = this.postMessageReadedUrl();
            let token = JSON.parse(sessionStorage.getItem('userData')).token;
            this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {msg_type:this.type,begin_id:this.firstId,end_id:this.lastId},xhr:{withCredentials:true}}).then(function (response) {
                if(response.data.code==0){

                }

            });
        }
    },
    components:{
        'message-one':require('../components/message-one.vue'),
    }
}
</script>


