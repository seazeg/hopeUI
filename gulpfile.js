/*
 * @Author       : Evan.G
 * @Date         : 2020-07-14 10:56:33
 * @LastEditTime : 2020-07-15 15:29:35
 * @Description  :
 */

const { series, parallel, watch, src, dest } = require("gulp"),
    browserSync = require("browser-sync").create(),
    less = require("gulp-less"),
    shell = require("gulp-shell"),
    plumber = require("gulp-plumber");

/**
 * @description 本地web服务器
 * @returns
 */
function webService() {
    browserSync.init({
        port: 3007,
        server: {
            baseDir: "static/",
            directory: true,
            middleware: function (req, res, next) {
                const fs = require("fs");
                const ssi = require("ssi");
                const baseDir = "static/";
                let pathname = require("url").parse(req.url).pathname;
                let filename = require("path").join(
                    baseDir,
                    pathname.substr(-1) === "/"
                        ? pathname + "index.html"
                        : pathname
                );

                let parser = new ssi(baseDir, baseDir, "/**/*.html", true);

                if (
                    filename.indexOf(".shtml") > -1 &&
                    fs.existsSync(filename)
                ) {
                    res.end(
                        parser.parse(
                            filename,
                            fs.readFileSync(filename, {
                                encoding: "utf8",
                            })
                        ).contents
                    );
                } else {
                    next();
                }
            },
        },
    });
}

/**
 * @description 文件调整监听
 * @returns
 */
function watchFile() {
    let watcher = watch(["src/*.*", "src/**/*.*"]);
    watcher.on("change", (path) => {
        let separator = path.indexOf("\\") > 0 ? "\\" : "/"; //分隔符
        let pathArray = path.split(separator);
        let fileName = pathArray[pathArray.length - 1];
        let type = fileName.split(".")[1];

        if (type == "js") {
            src(path)
                .pipe(plumber())
                .pipe(shell(["npm run build"]));
            browserSync.reload();
            console.log(`${path}已更新`);
        } else if (type == "less") {
            src(["src/*.less", "src/**/*.less"])
                .pipe(plumber())
                .pipe(less())
                .pipe(dest("static/"));
            browserSync.reload();
            console.log(`${path}已更新`);
        } else if (type == "html" || type == "shtml") {
            src("src/*.html").pipe(dest("static/"));
            browserSync.reload();
            console.log(`${path}已更新`);
        } else if (
            type == "eot" ||
            type == "ttf" ||
            type == "svg" ||
            type == "woff" ||
            type == "woff2"
        ) {
            src("src/font/*").pipe(dest("static/font/"));
            browserSync.reload();
            console.log(`${path}已更新`);
        }
    });
}

//调试命令
exports.go = series(parallel(series(watchFile), webService));
