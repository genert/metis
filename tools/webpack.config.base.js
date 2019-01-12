const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const config = require('./config');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

module.exports = {
    cache: true,

    context: config.root,

    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win"
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: ['node_modules'],

        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290
        extensions: ['.ts', '.json'],

        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            // This often causes confusion because we only process files within src/ with babel.
            // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
            // please link the files into your node_modules/ and let module-resolution kick in.
            // Make sure your source files are compiled, as they will not be processed in any way.
            new ModuleScopePlugin(config.appSrc)
        ]
    },

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },

    module: {
        rules: [{
            test: /\.(ts)$/,
            include: config.src,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        compilerOptions: {
                            'sourceMap': true,
                            'isolatedModules': true,
                            'noEmitOnError': false,
                        },
                    },
                },
            ]
        }, {
            test: /\.json$/,
            include: [config.src],
            use: { loader: 'json-loader' },
        }]
    },

    plugins: [
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),

		// Add module names to factory functions so they appear in browser profiler.
		new webpack.NamedModulesPlugin(),

		// If you require a missing module and then `npm install` it, you still have
		// to restart the development server for Webpack to discover it. This plugin
		// makes the discovery automatic so you don't have to restart.
		// See https://github.com/facebookincubator/create-react-app/issues/186
		new WatchMissingNodeModulesPlugin(config.nodeModules),
    ]
};