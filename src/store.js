import Vue from 'vue';
import Vuex from 'vuex';
import {fetchItem} from './api';
Vue.use(Vuex);

export function createStore(){
    return new Vuex.Store({
        state:{
            items:{}
        },
        actions:{
            fetchItem({commit},id){
                return fetchItem(id).then((res)=>{
                    if(res.code ===200){
                        commit("setItem",{id,data:res.data})
                    }
                })
            }
        },
        mutations:{
            setItem(state,{id,data}){
                Vue.set(state.items,id,data)
            }
        }
    })
}
