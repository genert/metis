const path = require('path');

module.exports = {
    package: {
        entry: path.resolve(__dirname, '..', 'src', 'index.ts'),
        dist: path.resolve(__dirname, '..', 'dist'),
    },

    client: {
        html: {
            entry: path.resolve(__dirname, '..', 'src', 'html', 'index.html'),
        }
    },

    root: path.resolve(__dirname, '..'),

    appSrc: path.resolve(__dirname, 'src'),

    appIndexJs: path.resolve(__dirname, '..', 'src', 'index.ts'),

    applicationBuild: path.resolve(__dirname, '..', 'dist'),

    appPublic: path.resolve(__dirname, '..', 'public'),

    nodeModules: path.resolve(__dirname, '../node_modules'),

    src: path.resolve(__dirname, '../src'),

    dist: path.resolve(__dirname, '..', 'public'),

    appPackageJson: path.resolve(__dirname, '../package.json'),

};
