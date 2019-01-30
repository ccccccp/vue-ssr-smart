import {createApp} from '../src/main.js';

export default context => new Promise((resolve,reject)=>{
    const {app,router,store} = createApp();
    router.push(context.url);
    router.onReady(()=>{
        const matchedComponents = router.getMatchedComponents();
        console.log("cmp:",matchedComponents);
        if(!matchedComponents.length) return reject({code:404});
        Promise.all(matchedComponents.map((component)=>{
            if(component.asyncData){
                return component.asyncData({store,route:router.currentRoute})
            }
        })).then(()=>{
            context.state = store.state;
            resolve(app);
        },reject);
        
    },reject)
    
})