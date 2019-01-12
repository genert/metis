// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('./webpack.config.base');
const config = require('./config');

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (process.env.NODE_ENV !== 'production') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

// Don't attempt to continue if there are any errors.
webpackConfig.bail = true;

// We generate sourcemaps in production. This is slow but gives good results.
// You can exclude the *.map files from the build during deployment.
webpackConfig.entry = './src/index.ts';

// In production, we only want to load the polyfills and the app code.
webpackConfig.entry = [
    config.appIndexJs,
];

webpackConfig.output = {
    // The build folder.
    path: config.applicationBuild,

    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    filename: 'static/[name].[chunkhash:8].js',
    chunkFilename: 'static/[name].[chunkhash:8].chunk.js',

    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: '/',

    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: (info) =>
        path.relative(config.appSrc, info.absoluteResourcePath),
};

// Minify the code.
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        // This feature has been reported as buggy a few times, such as:
        // https://github.com/mishoo/UglifyJS2/issues/1964
        // We'll wait with enabling it by default until it is more solid.
        reduce_vars: false,
    },
    output: {
        comments: false,
    },
    sourceMap: true,
}));

// Makes some environment variables available to the JS code, for example:
// if (process.env.NODE_ENV === 'development') { ... }
webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
    },
}));

module.exports = webpackConfig;