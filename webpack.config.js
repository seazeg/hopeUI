/*
 * @Author       : Evan.G
 * @Date         : 2020-07-27 09:41:42
 * @LastEditTime : 2020-08-10 13:39:28
 * @Description  :
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const pkg = require("./package.json");

module.exports = {
    entry: ["@babel/polyfill", "./src/hopeui.js"],
    // devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "localhost",
        compress: true,
        host: "0.0.0.0",
        port: 8090,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                },
                include: /src/,
                exclude: /node_modules/,
            },
            {
                test: /\.jpg|png|gif|bmp|jpeg$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[hash:5].[ext]",
                            limit: 1024, // size <= 1kib
                            outputPath: "img",
                        },
                    },
                ],
            },
            {
                test: /\.ttf|eot|svg|woff|woff2$/,
                use: "url-loader",
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: {
                            // hmr: true,
                            // reloadAll: true,
                        },
                    },
                    "css-loader",
                    "less-loader",
                ],
            },
        ],
    },
    output: {
        filename: "hopeui.js",
        path: path.resolve(__dirname, "dist"),
        library: "hopeui",
        libraryTarget: "window",
    },
    mode: process.env.NODE_ENV == "development" ? "development" : "production",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: false,
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: true,
                    keep_fnames: false,
                },
            }),
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
        new webpack.BannerPlugin(
            `${pkg.description} version ${pkg.version}\nAuthor Evan.G\nFor more information, please visit ${pkg.author.github}\n${pkg.description} is available under the terms of the MIT license.`
        ),
        new ExtractCssChunks({
            filename: "hopeui.css",
            chunkFilename: "[id].css",
            orderWarning: true,
        }),
    ],
};
