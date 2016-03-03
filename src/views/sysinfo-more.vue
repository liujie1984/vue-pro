<style lang="less">
    .sysinfo-one{border-bottom: 1px solid #dcdcdc;padding: 20px 50px 20px 50px;}
    .sysinfo-one-createdat{font-size: 10px;color: #9a9a9a;text-align: center;}
    .sysinfo-one-triangle{width:0;height:0;border-left:12px solid transparent; border-top:12px solid #f2f1ef;
        position: relative;margin-left: -8px;top:   16px;display: inline-block;}
    .sysinfo-one-content{background-color: #f2f1ef;color: #222222;font-size: 14px;text-align: center;padding: 10px;
        border-radius: 6px;}
</style>
<template>
    <div v-for="one in message" class="sysinfo-one">
        <p class="sysinfo-one-createdat">{{this.timestampToStr(one.created_at)}}</p>
        <span class="sysinfo-one-triangle"></span>
        <p class="sysinfo-one-content">{{one.message}}</p>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            message:[],
            type:'system',
            lastId:'',
            firstId:''
        }
    },
    ready:function() {
        document.title = '系统通知';

        this.getMessageMore();
        let self = this;
        window.onscroll = function(){
            if(document.body.clientHeight-document.body.scrollTop<1000){
                self.getMessageMore();
            }
        }
    },
    methods:{
        timestampToStr: function(timestamp){
                var unixTimestamp = new Date(timestamp * 1000) ;
                var d = new Date(timestamp * 1000);
                var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+
                (d.getDate())+" "+(d.getHours()-8)+":"+(d.getMinutes());
                return jstimestamp;
        },
        getMessageMoreUrl: function(){
            let url = '';
            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                url = localStorage.getItem('apphost') + 'apiv2/message_more.json';
            }else{
                url = localStorage.getItem('apphost') + 'api/my_system_message';
            }
            return url;
        },
        getMessageMore: function(){
            let url = this.getMessageMoreUrl();
            this.$http({url: url, method: 'GET',data: {catalog:this.type,last_id:this.last_id},xhr:{withCredentials:true}}).then(function (response) {
                if(response.data.code==0&&response.data.data.list.length!=0){
                    let list = response.data.data.list;
                    let listLength = list.length;
                    this.message = this.message.concat(list);
                    this.lastId = response.data.data.list[listLength-1].message_id;
                    if(this.firstId==''){
                        this.firstId=list[0].message_id;
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
            this.$http({url: url, method: 'POST',headers:{'User-Token': token},data: {msg_typ:this.type,begin_id:this.firstId,end_id:''},xhr:{withCredentials:true}}).then(function (response) {
                if(response.data.code==0){

                }

            });
        }
    },
    components:{
        // 'message-one':require('../components/message-one.vue'),
    }
}
</script>


