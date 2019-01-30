import Router from 'vue-router';
import Vue from 'vue';
// import Home from './routes/home.vue';
// import Animal from './routes/animal.vue';
// import People from './routes/people.vue';
Vue.use(Router);

export default function createRouter(){
    return new Router({
        mode:'history',
        routes:[
            {path:'/',component:()=>import(/* webpackChunkName: "home" */ './routes/home.vue'),name:'home' },
            {path:'/animal',component:()=>import(/* webpackChunkName: "animal" */ './routes/animal.vue'),name:'animal'},
            {
                path:'/people/:id',
                component:()=>import('./routes/people.vue'),
                name:'people',
                children:[
                    {path:'animal',component:()=>import(/* webpackChunkName: "people-animal" */ './routes/people-animal.vue'),name:'people-animal' },
                    {path:'flower',component:()=>import(/* webpackChunkName: "people-flower" */ './routes/people-flower.vue'),name:'people-flower' }
                ]
            },
            
        ]
        // routes:[
        //     {path:'/',component:Home,name:'home' },
        //     {path:'/animal',component:Animal,name:'animal'},
        //     {path:'/people',component:People,name:'people' }
        // ]
    })
}