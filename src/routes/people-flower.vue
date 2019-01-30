<template>
    <div class="people-animal">
        {{msg}}
        <div>{{count}}</div>
        <button @click="handleAdd">people-flower-Add</button>  
    </div>
</template>
<script>
export default {
    name:'people-flower',
    data(){
        return {
            msg:'people-flower',
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
    .people-flower{
        color:red;
    }
</style>