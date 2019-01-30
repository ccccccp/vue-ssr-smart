<template>
    <div class="people-animal">
        {{msg}}
        <div>{{count}}</div>
        <button @click="handleAdd">people-animal</button>  
    </div>
</template>
<script>
export default {
    name:'animal',
    data(){
        return {
            msg:'people-animal',
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
    .animal{
        color:red;
    }
</style>