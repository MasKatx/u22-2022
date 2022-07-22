const path = require('path');
const glob = require("glob");
const entries = glob.sync("./src/**/*.js");

module.exports = {
    entry: {
        stuScoreInput: "./src/student/scoreInput.js",
        stuScoreCfm: "./src/student/scoreCfm.js",
        teacherScoreInput: "./src/teacher/scoreInput.js",
        teacherScoreCfm: "./src/teacher/scoreCfm.js",
        classList: "./src/teacher/classList.js",
        stuSearch: "./src/teacher/stuSearch.ts",
        classCreate: "./src/teacher/classCreate.js",
    },
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};
