import {getDetail as getDetailInterface} from '@/store/api.js';
export default {
    state:{
        data:{
            name:'',
            desc:''
        }
    },
    actions:{
        getDetail({commit,state},{payload}){
            
            return getDetailInterface(payload).then((res)=>{
                commit({
                    type:'setDetailData',
                    payload:res.data.data
                });
            },(e)=>{
            })
        }
    },
    mutations:{
        setDetailData(state,{payload={}}){
            state.data = {...payload};
        },
        clearData(state){
            state.data = {
                name:'',
                desc:''
            };
        }
    },
    getters:{
    }
}