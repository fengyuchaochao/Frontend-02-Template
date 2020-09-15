const baseWebpackConfig = require('./webpack.prod.conf');
module.exports = {
    ...baseWebpackConfig,
    devServer: {
        host: 'localhost',
        port: 9000,
        contentBase: 'src'
    }
};
