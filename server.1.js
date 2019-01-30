const fs = require("fs");
const path = require("path");
//const createApp = require('./dist/js/server.js').default;
const express = require("express");
const server = express();
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
const { createBundleRenderer, createRenderer } = require("vue-server-renderer");
const template = fs.readFileSync(path.resolve(__dirname, 'public/index.ssr.html'), 'utf-8');
console.log(template);
const renderer = createBundleRenderer(serverBundle, {
    //inject:false,
    runInNewContext: false, // 推荐
    shouldPreload:false,
    
    template,
    clientManifest
})

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

const htmlContext = {
    title: 'vue-ssr-test'
}

server.listen(8080);
