<template>
    <div class="home">
        {{msg}}
        <div>{{count}}</div>
        <button @click="handleAdd">Add</button>  
        <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">1111</div>
            <div class="swiper-slide">22222</div>
            <div class="swiper-slide">33333</div>
            <div class="swiper-slide">4444</div>
        </div>
    </div>
    <ul>
        <router-link v-for="item in homeList" :key="item.age" :to="'/people/'+item.id">{{item.name}}</router-link>
    </ul>
    <div>len:{{lens}}
        <button @click="handleClean">clean</button>
    </div>
    </div>
</template>
<script>
import Swiper from 'swiper/dist/js/swiper.min.js';
import { mapState, mapActions, mapGetters } from "vuex";
import 'swiper/dist/css/swiper.min.css'
export default {
    name:'home',
    data(){
        return {
            msg:'home',
            count:0,
            swiper:null
        }
    },
    computed:{
        ...mapState({
            homeList:(state)=> state.home.data
        }),
        ...mapGetters(['lens'])
    },
    methods:{
        ...mapActions({
            getHomeData:'getHomeData'
        }),
        handleAdd(){
            this.count = this.count + 1;
        },
        handleClean(){
            this.$store.commit('clearData');
        }
    },
    mounted () {
        this.swiper = new Swiper(".swiper-container", {
            effect: "coverflow",
            initialSlide: 1,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: -20,
                depth: 0,
                modifier: 1,
                slideShadows: false
            }
        });
        //this.getHomeData({payload:'home-payload'})//client-request
    },
    asyncData({store}){
        return store.dispatch("getHomeData",{payload:'home-payload'});
    }
}
</script>
<style lang="less">
    .home{
        color:red;
    }
    .swiper-container{
        width:400px;
        height:400px;
        border:1px solid red;
        box-sizing: content-box;
        .swiper-wrapper{
            .swiper-slide{
                width:70%;
                border:1px solid blue;
                box-sizing: content-box;
                &.swiper-slide-prev{
                    opacity:0.3;
                }
                &.swiper-slide-next{
                    opacity:0.3;
                }
            }
        }
    }
</style>