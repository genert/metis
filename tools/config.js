const path = require('path');

module.exports = {
    client: {
        html: {
            entry: path.resolve(__dirname, '..', 'src', 'html', 'index.html'),
        }
    },

    root: path.resolve(__dirname, '..'),

    appSrc: path.resolve(__dirname, 'src', 'js'),

    appIndexJs: path.resolve(__dirname, '..', 'src', 'js', 'core', 'index.tsx'),

    applicationBuild: path.resolve(__dirname, '..', 'build'),

    appPublic: path.resolve(__dirname, '..', 'public'),

    nodeModules: path.resolve(__dirname, '../node_modules'),

    src: path.resolve(__dirname, '../src/js'),

    dist: path.resolve(__dirname, '..', 'public'),

    appPackageJson: path.resolve(__dirname, '../package.json'),

};
