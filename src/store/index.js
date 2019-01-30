import vue from 'vue';
import vuex from 'vuex';
import home from './modules/home.js';
import about from './modules/about.js';
import people from './modules/people.js';

vue.use(vuex);
// export default new vuex.Store({
//     modules:{
//         home,
//         //about,
//         //people
//     }
// })
export function createStore(){
    return new vuex.Store({
        modules:{
            home,
            //about,
            people
        }
    })
}