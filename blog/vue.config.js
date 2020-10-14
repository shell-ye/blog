const webpack = require('webpack')

module.exports = {
    // productionSourceMap: false,
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    // css: {
    //     extract: false
    // },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                // 生产与开发环境使用不同的变量
                AXIOS_URL: process.env.NODE_ENV === 'production' ? JSON.stringify('http://121.196.34.102:3002') : JSON.stringify('http://127.0.0.1:3002'), // axios 的请求 URL
            }),
        ]
    }
}