const {
    merge
} = require('webpack-merge');
const commonConfig = require('./webpack.esbuild');

module.exports = function () {
    return merge(commonConfig(), {
        mode: 'development',
        target: 'web',
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            open: true,
            port: 4200
        }
    })
};