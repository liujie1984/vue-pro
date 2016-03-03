<style lang="less">
    .message-one{padding: 15px 10px 15px 10px;border-bottom: 1px solid #dcdcdc;}
    .message-one-left{display: inline-block;float: left;}
    .message-one-avatar{width: 35px;height: 35px;border-radius: 25px;display: inline-block;}
    .message-one-avatar-vip{width: 17px;height: 17px;position: relative;margin-left: -10px;}
    .message-one-right{position:relative;margin-left: 50px;display: block;text-decoration: none;}
    .message-one-right-top{height: 20px;line-height: 20px;}
    .message-one-name{font-size: 12px;color: #888888;float: left;}
    .message-one-creatat{font-size: 12px;color: #888888;float: right;}
    .message-one-content{font-size: 10px;color: #222222;line-height: 15px;}
    em{color: #479cf3;font-style:normal;}
</style>
<template>
    <div class="message-one">
        <div class="message-one-left" v-link="{name:'person-other',params: { id: message.operator.user_id }}">
            <img class="message-one-avatar" v-bind:src="message.operator.avatar_url">
            <img v-if="message.operator.is_vip==1" class="message-one-avatar-vip" src="http://7xqamv.com2.z0.glb.qiniucdn.com/icon-is-vip.png"> 
        </div>
        <a class="message-one-right" v-bind:href="url">
            <div class="message-one-right-top">
                <p class="message-one-name">{{message.operator.nickname}}</p>
                <p class="message-one-creatat">{{message.created_at}}</p>
            </div>
            <p class="message-one-content">{{{message.message}}}</p>
        </a>
    </div>
</template>
<script>
    export default {
        props: ['message','type'],
        data:function(){
            return {
                url:'',
            }
        },
        ready: function(){
            this.message.created_at = this.timestampToStr(this.message.created_at);
            this.url = this.dealUrl(this.type);
            // console.dir(this.type);
        },
        methods:{
            timestampToStr: function(timestamp){
                var unixTimestamp = new Date(timestamp * 1000) ;
                var d = new Date(timestamp * 1000);
                var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+
                (d.getDate())+" "+(d.getHours()-8)+":"+(d.getMinutes());
                return jstimestamp;
            },
            dealUrl: function (type) {
                let url = '';
                if(type=='like'||type=='comment'){
                    url = "#!/works-detail/"+this.message.extras.id;
                }
                if(type=='follow'||type=='chat'){
                    url = "#!/person/"+this.message.operator.user_id;
                }
                return url; 
            }
        },
    };
</script>