<template>
    <div class="animal">
        {{msg}}
        <div>{{count}}</div>
        <button @click="handleAdd">Add</button>  
    </div>
</template>
<script>
export default {
    name:'animal',
    data(){
        return {
            msg:'animal',
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