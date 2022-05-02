var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function () {
    return {
        cache: {
            type: 'filesystem',
        },
        entry: {
            app: path.resolve(__dirname, '../src/main.ts')
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].bundle.js',
            chunkFilename: "chunk.[contenthash].js",
        },
        resolve: {
            extensions: [".ts", ".js"],
            alias: {
                components: path.resolve(__dirname, '../src/app/components/'),
                config: path.resolve(__dirname, '../src/app/config/'),
                interfaces: path.resolve(__dirname, '../src/app/interfaces/'),
                utils: path.resolve(__dirname, '../src/app/utils/'),
                pages: path.resolve(__dirname, '../src/app/pages/'),
                services: path.resolve(__dirname, '../src/app/services/'),
                modules: path.resolve(__dirname, '../src/app/modules/'),
                'environments/environment': path.resolve(__dirname, '../src/environments/environment.ts'),
                pipes: path.resolve(__dirname, '../src/app/pipes/'),
                directives: path.resolve(__dirname, '../src/app/directives/')
            },
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [{
                    test: /\.ts$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'ts',
                        target: 'es2015'
                    }
                }, {
                    test: /\.ts$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheCompression: false,
                            cacheDirectory: true,
                            presets: ['@babel/preset-typescript'],
                            plugins: [
                                "babel-plugin-angular12-template",
                                "babel-plugin-transform-typescript-metadata",
                                ["@babel/plugin-proposal-decorators", {
                                    "legacy": true
                                }],
                                ["@babel/plugin-proposal-class-properties", {
                                    "loose": false
                                }],
                            ]
                        }
                    }
                },
                {
                    test: /\.(html|css)$/,
                    exclude: /(node_modules|bower_components)/,
                    include: [
                        path.resolve(__dirname, "../src/app")
                    ],
                    loader: 'raw-loader',
                },
                {
                    test: /\.css$/i,
                    exclude: /(node_modules|bower_components)/,
                    include: [path.resolve(__dirname, '../src/styles.css')],
                    use: [
                        "style-loader",
                        "css-loader",
                        "postcss-loader"
                    ],
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [{
                    from: path.resolve(__dirname, '../src/assets'),
                    to: "assets/",
                }, ],
            }),
            /** hide errors (export interfaces) */
            new FilterWarningsPlugin({
                exclude: /module has no exports/
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html')
            }),
            new BundleAnalyzerPlugin()
        ]
    }
};