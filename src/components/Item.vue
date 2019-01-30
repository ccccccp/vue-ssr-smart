<template>
    <div class="item">
        {{item}}
    </div>
</template>
<script>
export default {
    name:'item',
    computed:{
        item(){
            return 'item!!!'
        }
    }
}
</script>
<style>
    .item{
        color:blue
    }
</style>