const path = require("path");
// 引入自动打包生成html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 每次打包前删除源文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 热加载
const webpack = require("webpack");

module.exports = {
    // 开发模式
    mode: "development",
    // devtool
    devtool: "cheap-module-eval-source-map",
    // 实时打包配置
    devServer: {
        contentBase: "./bundle",
        open: true,
        port: 8088,
        proxy: {
            "/api": {
                target: "http://localhost:9092",
            },
        },
        hot: true,
        //即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
        hotOnly: true,
    },
    // 入口文件
    entry: "./src/js/index.js",

    // 输出文件
    output: {
        // 路径
        path: path.resolve(__dirname, "bundle"),
        // 文件名
        filename: "bundle.js",
    },

    // loader
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]_[hash].[ext]",
                            outputPath: "imges/",
                            // ⼩于2048，才转换成base64
                            limit: 2048,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    // 插件
    plugins: [
        // html模板文件
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "webpack",
        }),
        // 打包前删除源文件
        new CleanWebpackPlugin(),
        // 热加载
        new webpack.HotModuleReplacementPlugin()
    ],
};
