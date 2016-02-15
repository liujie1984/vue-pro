<style lang="less">
    .mix-one{height: 70px;padding: 15px 10px 15px 6px;border-bottom: 1px solid #dcdcdc;}
    .mix-one-left{width: 100px;height: 70px;margin-right: 10px;float: left;}
    .mix-one-left img{width: 100%;height: 100%;overflow: hidden;}
    .mix-one-right{position: relative;height: 70px;}
    .mix-one-right p{overflow: hidden;}
    .mix-one-title{font-size: 15px;line-height: 18px;max-height: 36px;margin-bottom: 6px;overflow:hidden;
        -webkit-line-clamp:2;-webkit-box-orient: vertical;display: -webkit-box;}
    .mix-one-subtitle{font-size: 12px;line-height: 14px;max-height: 28px;overflow:hidden;
        -webkit-line-clamp:2;-webkit-box-orient: vertical;display: -webkit-box;}
</style>
<template>
<div class="mix-one" v-link="{ name: 'works-detail', params: { id: mix.item_id }}">
    <div class="mix-one-left">
        <img v-bind:src="mix.image">
    </div>
    <div class="mix-one-right">
        <h4 class="mix-one-title">{{mix.title}}</h4>
        <p class="mix-one-subtitle">{{mix.subtitle}}</p>
    </div>
</div>
</template>
<script>
    export default {
        props: ['mix'],
        ready: function(){
            console.dir(this.mix);
        }
    };
</script>