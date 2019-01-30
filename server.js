const fs = require("fs");
const path = require("path");
const express = require("express");
const server = express();
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
const { createBundleRenderer } = require("vue-server-renderer");
const template = fs.readFileSync(path.resolve(__dirname, 'public/index.ssr.html'), 'utf-8');
const isProd = process.env.NODE_ENV === 'production';
const port = 8085;
let renderer;
if(isProd){
    //打包
    renderer = createRenderer(serverBundle,clientManifest);
}else{
    //监听修改后重写renderer
    require("./webpack/setup-dev-server.js")(server,(serverBundle,clientManifest)=>{
        renderer = createRenderer(serverBundle,clientManifest);
    })
}
function createRenderer(serverBundleJson,clientManifest){
    return createBundleRenderer(serverBundleJson,{
        runInNewContext: false, // 推荐
        shouldPreload:false,
        template,
        clientManifest
    })
}

server.use("/js", express.static(__dirname + '/dist/js'));
server.use("/css", express.static(__dirname + '/dist/css'));
server.get("*",(req, res) => {
    const context = { url: req.url };
    renderer.renderToString(context,(err, html) => {
        if (err) {
            console.log(err);
            res.status(500).end("<h1>Internet Server Error</h1>")
        }
        res.end(html)
    });
})

server.listen(port,(err)=>{
    if(err) return;
    console.log("server running at http://localhost:"+ port)
});
