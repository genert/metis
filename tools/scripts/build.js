'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const fs = require('fs-jetpack');
const chalk = require('chalk');
const webpack = require('webpack');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpackConfig = require('../webpack.config.production');
const config = require('../config');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(config.applicationBuild)
    .then((previousFileSizes) => {
        // Remove all content but keep the directory so that
        // if you're in it, you don't end up in Trash
        fs.remove(config.applicationBuild);

        // Start the webpack build
        return build(previousFileSizes);
    })
    .then(
        ({ stats, previousFileSizes, warnings }) => {
            if (warnings.length) {
                console.log(chalk.yellow('Compiled with warnings.\n'));
                console.log(warnings.join(`\n\n`));
                console.log(`\nSearch for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`);
                console.log(`To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`);
            } else {
                console.log(chalk.green('Compiled successfully.\n'));
            }
        },
        (error) => {
            console.log(chalk.red('Failed to compile.\n'));
            console.log((error.message || error) + '\n');
            process.exit(1);
        }
    );

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
    console.log('Creating an optimized production build...');

    let compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }

            const messages = formatWebpackMessages(stats.toJson({}, true));

            if (messages.errors.length) {
                return reject(new Error(messages.errors.join('\n\n')));
            }

            return resolve({
                stats,
                previousFileSizes,
                warnings: messages.warnings,
            });
        });
    });
}

function copyPublicFolder() {
    fs.copy(config.appPublic, config.applicationBuild, {
        matching: ['*.html'],
    });
}