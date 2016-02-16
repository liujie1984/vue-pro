<style lang="less">

</style>
<template>
    <div class="detail-list">

    </div>
</template>
<script>
    export default {
        props: ['comment'],
        ready: function(){
            console.dir(this.comment);
        }
    };
</script>