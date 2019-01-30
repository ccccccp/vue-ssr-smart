const source = [{name:'zs',age:11,id:1,desc:'张三简介'},{name:'ls',age:12,id:2,desc:'lisi简介'}];
export function getData(params){
    return new Promise((reslve,reject)=>{
        setTimeout(function(){
            console.log("请求数据",params);
            reslve({
                code:200,
                data:{
                    dataList:source,
                    total:2,
                    page:1,
                    pageSize:10
                }
            })
        },1)
    })
}
export function getDetail(id){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log("请求数据,id:",id);
            resolve({
                code:200,
                data:{
                    data:source.filter(p=>p.id == id)[0]
                }
            })
        },1)
    })
}
