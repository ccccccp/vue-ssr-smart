<template>
    <div class="people">
        {{peopleData.name}}
        <div>{{peopleData.desc}}</div>
        <div>{{count}}</div>
        <button @click="handleAdd">Ad</button>  
        <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">1111</div>
            <div class="swiper-slide">22222</div>
            <div class="swiper-slide">33333</div>
            <div class="swiper-slide">4444</div>
        </div>
    </div>
    <div>
        <router-link to="/people/1">11111</router-link>
        <router-link to="/people/2">22222</router-link>
    </div>
    <div>
        <router-link :to="`/people/${$route.params.id}/animal`">养的宠物</router-link>
        <router-link :to="`/people/${$route.params.id}/flower`">养的花</router-link>
        <div>
            <router-view></router-view>
        </div>
    </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex';
import Swiper from 'swiper/dist/js/swiper.min.js';
import 'swiper/dist/css/swiper.min.css'
export default {
    name:'people',
    data(){
        return {
            msg:'people',
            count:0,
            swiper:null
        }
    },
    computed:{
        ...mapState({
            peopleData:state=>state.people.data
        })
    },
    methods:{
        handleAdd(){
            this.count = this.count + 1;
        },
        initSwiper(){
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
        }
    },
    mounted () {
        this.initSwiper();
    },
    asyncData({store,route}){
        const {params={}} = route;
        const {id='0'} = params;
        return store.dispatch("getDetail",{payload:id})
    },
    watch:{
        '$route.params.id':function(to){
            this.$options.asyncData({
                store:this.$store,
                route:this.$route
            });
        }
    }
}
</script>
<style lang="less">
    .people{
        color:aquamarine;
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