// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config.base');
const config = require('./config');

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (process.env.NODE_ENV !== 'production') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

const productionConfig = merge(webpackConfig, {
    mode: 'production',

    // Don't attempt to continue if there are any errors.
    bail: true,

    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    entry: config.package.entry,

    output: {
        // The build folder.
        path: config.applicationBuild,

        // Generated JS file names (with nested folders).
        // There will be one main bundle, and one file per asynchronous chunk.
        filename: '[name].js',

        library: 'Metis',
    
        libraryTarget: 'window',

        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: '/',

        // Point sourcemap entries to original disk location
        devtoolModuleFilenameTemplate: (info) =>
            path.relative(config.appSrc, info.absoluteResourcePath),
    },

    plugins: [
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
});

module.exports = productionConfig;