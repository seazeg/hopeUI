/*
 * @Author       : Evan.G
 * @Date         : 2020-07-27 09:41:42
 * @LastEditTime : 2020-07-27 15:42:46
 * @Description  :
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pkg = require("./package.json");

module.exports = {
    entry: "./src/hopeui.js",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "localhost",
        compress: true,
        port: 8090,
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
                use: "url-loader?limit=图片大小",
            },
            {
                test: /\.ttf|eot|svg|woff|woff2$/,
                use: "url-loader",
            },
            {
                test: /\.(css|less)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
            }),
        ],
        // minimize: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Study Demo",
            filename: "index.html", //指定生成的HTML文件名
            template: path.join(__dirname, "./src/index.html"), // 指定模板路径
        }),
        new webpack.BannerPlugin(
            `${pkg.description} version ${pkg.version}\nAuthor Evan.G\nFor more information, please visit ${pkg.author.github}\n${pkg.description} is available under the terms of the MIT license.`
        ),
        new MiniCssExtractPlugin({
            filename: "hopeui.css",
            chunkFilename: "[id].css",
        }),
    ],
};
