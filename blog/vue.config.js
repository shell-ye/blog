module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    configureWebpack: {
        entry: ['babel-polyfill', './src/main.js'],
    }
}