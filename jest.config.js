module.exports = {
    "verbose": false,
    "roots": [
        "<rootDir>/test"
    ],
    "transform": {
        "^.+\\.ts$": "ts-jest"
    },
    "setupTestFrameworkScriptFile": "./test/setup.js",
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "json",
        "js",
        "node"
    ],
};