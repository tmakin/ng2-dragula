
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = webpackMerge(baseConfig, {

    devtool : "eval", //disable source map

    output: {
        publicPath: ''
    }
});