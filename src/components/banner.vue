<style lang="less">

</style>
<template>
<ul>
    <li>banner</li>
</ul>
</template>
<script>
    export default {
        props: {
            bannerList:Object,
        },
        ready: function(){
            console.dir(this.bannerList);
        },
        attached:function(){
            console.dir(this.bannerList);
        }
    };
</script>