const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.esbuild');

module.exports = function () {
    return merge(commonConfig(), {
        mode: 'production',
        optimization: {
            minimize: true
        }
    });
};