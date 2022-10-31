/*
 * @Author       : Evan.G
 * @Date         : 2020-07-27 09:41:42
 * @LastEditTime : 2022-10-31 15:02:13
 * @Description  :
 */

const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const pkg = require("./package.json");

module.exports = {
    entry: ["./src/hopeui.js"],
    // entry: ["@babel/polyfill", "./src/hopeui.js"],
    // devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "0.0.0.0",
        compress: true,
        port: 8090,
        proxy: {
            "/app": {
                target: "http://0.0.0.0:9909",
                pathRewrite: {
                    "^/app": "",
                },
                changeOrigin: true,
            },
        },
        // hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                include: /src/,
                exclude: /node_modules/,
            },
            {
                test: /\.jpg|png|gif|bmp|jpeg$/,
                use: "url-loader",
            },
            {
                test: /\.ttf|eot|svg|woff|woff2$/,
                use: "url-loader",
            },
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
        ],
    },
    output: {
        filename: `hopeui.min.js`,
        path: path.resolve(__dirname, `dist/${pkg.version}/`),
        library: "hopeui",
        libraryTarget: "window",
    },
    mode: process.env.NODE_ENV == "development" ? "development" : "production",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                // sourceMap: true,
                uglifyOptions: {
                    ie8: true,
                    compress: {
                        properties: false,
                        keep_fnames: true,
                    },
                    mangle: {
                        keep_fnames: true,
                    },
                },
            }),
            new OptimizeCssAssetsPlugin({}),
        ],
        // minimize: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "HopeUI",
            filename: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
            },
            // hash: true,
            template: path.join(__dirname, "./src/index.html"),
        }),
        new HtmlWebpackPlugin({
            title: "HopeUI",
            filename: "index2.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
            },
            // hash: true,
            template: path.join(__dirname, "./src/index2.html"),
        }),
        new HtmlWebpackPlugin({
            title: "HopeUI",
            filename: "index3.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
            },
            // hash: true,
            template: path.join(__dirname, "./src/index3.html"),
        }),
        new webpack.BannerPlugin(
            `${pkg.description} version ${pkg.version}\nAuthor Evan.G\n${pkg.description} is available under the terms of the MIT license.`
        ),
        new MiniCssExtractPlugin({
            filename: `hopeui.min.css`,
            path: path.resolve(__dirname, `dist/${pkg.version}/`),
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: "src/components/", to: "components/" }],
        }),
    ],
};
