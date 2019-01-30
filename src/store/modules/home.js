import {getData} from '@/store/api.js';
export default {
    state:{
        data:[]
    },
    actions:{
        async getHomeData({commit,state},{payload}){
            return getData(payload).then((res)=>{
                commit({
                    type:'setData',
                    payload:res.data.dataList
                });
            })
        }
    },
    mutations:{
        setData(state,{payload=[]}){
            state.data = [...payload];
        },
        clearData(state){
            state.data = [];
        }
    },
    getters:{
        lens:(state)=>state.data.length
    }
}