module.exports = function (env) {
    return require(`./config/webpack.${env.prod ? 'prod' : 'dev'}.js`)(env)
}