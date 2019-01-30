<template>
    <div class="home">
        {{msg}}
        <div>{{count}}</div>
        <button @click="handleAdd">Ad</button>  
    </div>
</template>
<script>
export default {
    name:'home',
    data(){
        return {
            msg:'home',
            count:0
        }
    },
    methods:{
        handleAdd(){
            this.count = this.count + 1;
        }
    }
}
</script>
<style>
    .home{
        color:red;
    }
</style>