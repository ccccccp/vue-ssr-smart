const webpack = require("webpack");
const clientConfig = require("./webpack.config.client");
const serverConfig = require("./webpack.config.server");
const MFS = require('memory-fs');
const path = require("path");
const chalk = require("chalk");

module.exports = function (server, callback) {
    let bundle;
    let manifest;
    clientConfig.entry.index = ['webpack-hot-middleware/client'].concat(clientConfig.entry.index)
    //clientConfig.output.filename = 'js/[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    server.use(devMiddleware);
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem
        const filePath = path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json');
        if (fs.existsSync(filePath)) {
            manifest = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            if (bundle) {
                console.log(chalk.red("client-builded"))
                callback(bundle, manifest);
            }
        }
    })

    // hot middleware
    server.use(require('webpack-hot-middleware')(clientCompiler));

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig);

    //服务端打包完成
    serverCompiler.plugin('done', () => {
        const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json');
        bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
        if(manifest){
            callback(bundle, manifest);
        } 
    })
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err));
        console.log(chalk.yellow("=============CHANGE==============="))
        const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json');
        bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
        if(manifest){
            callback(bundle, manifest);
        } 
    });
}