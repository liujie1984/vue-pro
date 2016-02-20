<style lang="less">
    .mix-one{height: 70px;padding: 15px 10px 15px 6px;border-bottom: 1px solid #dcdcdc;display: block;text-decoration: none;}
    .mix-one-left{width: 100px;height: 70px;margin-right: 10px;float: left;}
    .mix-one-left img{width: 100%;height: 100%;overflow: hidden;}
    .mix-one-right{position: relative;height: 70px;}
    .mix-one-right p{overflow: hidden;}
    .mix-one-title{font-size: 15px;line-height: 18px;max-height: 36px;margin-bottom: 6px;overflow:hidden;
        -webkit-line-clamp:2;-webkit-box-orient: vertical;display: -webkit-box;color: #222222;}
    .mix-one-subtitle{font-size: 12px;line-height: 14px;max-height: 28px;overflow:hidden;
        -webkit-line-clamp:2;-webkit-box-orient: vertical;display: -webkit-box; color: #9a9a9a;}
</style>
<template>
<a class="mix-one" v-bind:href="mixOneUrl">
<!-- v-link="{ name: 'works-detail', params: { id: mix.item_id }}" -->
    <div class="mix-one-left">
        <img v-bind:src="mix.image">
    </div>
    <div class="mix-one-right">
        <h4 class="mix-one-title">{{mix.title}}</h4>
        <p class="mix-one-subtitle">{{mix.subtitle}}</p>
    </div>
</a>
</template>
<script>
    export default {
        props: ['mix'],
        data:function(){
            return {
                mixOneUrl:'',
            }
        },
        ready: function(){
            this.mixOneUrl = this.refurlDeal(this.mix.ref_url);
        },
        methods:{
            refurlDeal: function(url){
                // console.dir(url);
                let urlSplit = url.split('?');
                let urlType = urlSplit[0].split('/')[3];
                let urlParams = urlSplit[1].split((/[=&]/));
                let returnUrl = '';
                // console.dir(urlSplit);
                console.dir(urlType);
                // console.dir(urlParams);
                switch (urlType)
                {
                    case 'pub':
                        let pubId = this.forMatch('pub_id',urlParams);
                        returnUrl = '#!/works-detail/'+pubId;
                        break;
                    case 'web':
                    // let pubWebId = this.forMatch('pubid',urlParams);
                    // console.dir(pubWebId);
                    // if(pubWebId==''){
                    //     console.dir('2');
                        returnUrl = this.forMatch('url',urlParams);
                    // }else{
                    //     returnUrl = '/#!/works-detail/'+pubWebId; 
                    // }   
                    break;
                }
                return returnUrl;
            }, 
            forMatch: function(str,urlParams) {
                let urlParamsLength = urlParams.length;
                let returnStr = '';
                // console.dir(str);
                for(let i=0;i<urlParamsLength;i=i+2){
                    if(urlParams[i].match(str)){
                        console.dir(urlParams[i+1]);
                        returnStr = decodeURIComponent(urlParams[i+1]);
                    }
                }
                return returnStr;
            },
        },
    };
</script>