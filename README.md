# vue-ssr


## 支持的功能

- 公共模块分离
- 路由懒加载
- 服务端渲染数据预取
- 本地调试热模块替换

## 需要支持的浏览器

1. MS IE11(无需支持 IE10 及以下版本)
2. MS Edge
3. Google Chrome
4. Mozilla Firefox
5. Apple Safari 10+

## 启动项目


```bash
#安装依赖
npm install

# 本地需要全局安装cross-env包 
npm install -g cross-env

# 启动本地调试模式
npm run dev

# 构建并运行服务
npm run start

```
##增加需要服务端渲染数据的组件

- 需要用`vuex`存数据
- 在组件中增加asyncData方法来`dispatch`
```js

import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name:'xxx',
    computed:{
        ...mapState({
            homeList:(state)=> state.home.data
        })
    },
    asyncData({store,route}){
        return store.dispatch("getHomeData");
    }
}

```

