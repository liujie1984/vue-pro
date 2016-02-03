<script>
    export default {
        props: ['userList', 'sessionIndex', 'session', 'search'],
        methods: {
            select (index) {
                this.sessionIndex = index;
            }
        },
        filters: {
            search (list) {
                return list.filter(item => item.name.indexOf(this.search) > -1);
            }
        }
    };
</script>

<template>
    <div class="m-list">
        <ul>
            <li v-for="item in userList | search" 
                :class="{ active: session.userId === item.id }"
                @click="select($index)">
                <img class="avatar"  width="30" height="30" :alt="item.name" :src="item.img">
                <p class="name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<style lang="less">

</style>