<style lang="less">
    .footer-bottom{height: 50px;width: 100%;position: fixed;background-color: #ffffff;bottom: 0;border-top: 1px solid #f2f1ef;z-index: 10;}

    .footer-bottom li{display: inline-block;width: 20%;background-position:center 3px;background-size:25px 25px;
        height: 50px;background-repeat:no-repeat;}
    .footer-bottom li span{height: 15px;line-height: 15px;font-size: 12px;display: inline-block;width: 100%;color: #9a9a9a;
        text-align: center;vertical-align: bottom;margin-top: 30px;}
    .footer-bottom-square{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-square-unchoose.png');}
    .footer-bottom-community{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-community-unchoose.png');}
    .footer-bottom-find{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-find-unchoose.png');}
    .footer-bottom-message{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-message-unchoose.png');}
    .footer-bottom-unread-message{width: 5px;height: 5px;background-color: red;display: inline-block;position: absolute;border-radius: 5px;
        left: 72%;top: 1px;}
    .footer-bottom-person{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-person-unchoose.png');}

    .square-active{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-square-choose.png');}
    .community-active{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-community-choose.png');}
    .find-active{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-find-choose.png');}
    .message-active{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-message-choose.png');}
    .person-active{background-image:url('http://7xqamv.com2.z0.glb.qiniucdn.com/icon-person-choose.png.png');}

    .footer-bottom-blank{height: 50px;}
</style>
<template>
    <div class="footer-bottom-blank"></div>
    <ul class="footer-bottom">
        <li v-link="{name:'square', activeClass: 'square-active'}" class="footer-bottom-square"><span>广场</span></li>
        <li v-link="{name:'community', activeClass: 'community-active'}" class="footer-bottom-community"><span>社区</span></li>
        <li v-link="{name:'activity-review', activeClass: 'find-active'}" class="footer-bottom-find"><span>活动</span></li>
        <li v-link="{path:'/message', activeClass: 'message-active'}" class="footer-bottom-message"><span>消息</span>
        <p v-if="msg=='true'" class="footer-bottom-unread-message"></p></li>
        <li v-link="{name:'person', activeClass: 'person-active'}" class="footer-bottom-person"><span>我</span></li>
    </ul>
</template>
<script>
    export default {
        props: ['type','msg'],
        ready: function(){
            // console.log(this.type);
        }
    };
</script>