<style lang="less">
    .owner{height: 64px;}
    .owner-avatar{width: 36px;height: 36px;border-radius: 18px;margin: 14px 14px 0 10px;float: left;}
    .owner-middle{height: 64px;float: left;padding-top: 16px;}
    .owner-nickname{font-size: 14px;color: #4a4a4a;height: 18px;line-height: 18px;}
    .pub-date{font-size: 12px;color: #dcdcdc;height: 14px;line-height: 14px;}

    .blank{height: 6px;background-color: #dddddd;}
</style>
<template>
    <div class="owner">
        <img class="owner-avatar" v-bind:src="owner.avatar_url">
        <div class="owner-middle">
            <p class="owner-nickname">{{owner.nickname}}</p>
            <p class="pub-date">{{worksDetail.pub_date}}</p>
        </div>
    </div>
    <div class="blank"></div>
</template>
<script>
    export default {
    	data:function(){
      		return {
      			id:'',
                owner:{
                    avatar_url:'',
                    nickname:''
                },
                worksDetail:{
                    pub_date:''
                }
      		}
      	},
        route:{
            data (transition){
                this.id = decodeURI(transition.to.params.id);
                console.dir(transition.to.params.id);
                console.dir(this.id);
            }
        },
    	created:function() {
            let url = '';
            if (localStorage.getItem('apphost')=='http://localhost:8080/'){
                url = localStorage.getItem('apphost') + 'apiv2/publish_detail.json';
            }else{
                url = localStorage.getItem('apphost') + 'apiv2/publish_detail?pub_id='+this.id;
            }
            console.log(url);
            this.$http({url: url, method: 'GET'}).then(function (response) {
                this.worksDetail = response.data.data;
                this.worksDetail.pub_date = this.timestampToStr(response.data.data.pub_date);
                this.owner = response.data.data.owner;
                console.dir(this.worksDetail);
                console.dir(this.worksDetail.owner.avatar_url);
            });
        },
        methods:{
            timestampToStr: function(timestamp){
                var unixTimestamp = new Date(timestamp * 1000) ;
                var d = new Date(timestamp * 1000);
                var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+
                (d.getDate())+" "+(d.getHours()-8)+":"+(d.getMinutes());
                return jstimestamp;
            }
     	}
    }
</script>


