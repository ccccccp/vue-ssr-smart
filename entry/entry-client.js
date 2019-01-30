import {createApp} from '../src/main.js';
const {app,router,store} = createApp();
if(window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(()=>{
    router.beforeResolve((to,from,next)=>{
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);
        console.log("matched",matched);
        console.log("prevMatched",prevMatched);
        console.log("to",to);
        console.log("from",from);
        let hasDiff = false;
        const activated = matched.filter((cmp,i)=>{
            return hasDiff || (hasDiff = cmp!==prevMatched[i])
        });
        const funs = activated.map((cmp)=>{
            if(cmp.asyncData){
                return cmp.asyncData({store,route:to})
            }
        });
        console.log(funs);
        Promise.all(funs).then(next).catch(next);
    })
    app.$mount("#root")
})