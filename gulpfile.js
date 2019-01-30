const cp = require("child_process");
const path = require("path");
const gulp = require("gulp");
const chalk = require("chalk");
const appEntry = path.join(__dirname,'app/index.js');

let appProcess = cp.fork(appEntry);

//restart
gulp.task("restart",function(done){
    appProcess.kill('SIGINT');
    appProcess = cp.fork(appEntry);
    console.log(chalk.green("===========restart============"))
});

gulp.task("watch",function(){
    gulp.watch("app/**/*.*",gulp.series("restart"))
})
appProcess.on("SIGINT",()=>{
    appProcess.exit(0);
});


gulp.task("default",gulp.parallel("watch"))