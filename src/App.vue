<template lang="">
    <div id="app">
        welcome!
        <div>
            <router-link to="/">home</router-link>
            <router-link to="/animal">animal</router-link>
            <router-link to="/people/1">people</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'app',
    data(){
        return {
            msg:'aaaa'
        }
    }
}
</script>
<style lang="less">
    body{
        padding:10px;
        background-color:#ccc;
        #app{
            background-color:white;
        }
    }
</style>
