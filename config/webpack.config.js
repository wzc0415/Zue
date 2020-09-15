const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

let config = {
    entry: path.join(__dirname, "../src/main.js"), //输入文件
    output: {
        filename: "build.js", //输出文件
        path: path.join(__dirname, 'dist') //输出路径

    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins:[
        new HTMLPlugin({
            template: './index.html',
        }),

    ]
}
module.exports = config;
