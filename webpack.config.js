/*
 * @Author       : Evan.G
 * @Date         : 2020-07-27 09:41:42
 * @LastEditTime : 2021-06-28 17:02:42
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
        filename: `hopeui.${pkg.version}.min.js`,
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
                // sourceMap: true,
                uglifyOptions: {
                    compress: {
                        properties: false,
                        ie8: true,
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
        new webpack.BannerPlugin(
            `${pkg.description} version ${pkg.version}\nAuthor Evan.G\nFor more information, please visit ${pkg.author.github}\n${pkg.description} is available under the terms of the MIT license.`
        ),
        new MiniCssExtractPlugin({
            filename: `hopeui.${pkg.version}.min.css`,
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "static/libs", to: "assets/" },
                { from: "src/components/", to: "components/" },
            ],
        }),
    ],
};
