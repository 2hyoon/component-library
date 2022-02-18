const { src, dest } = require("gulp");

// use a different version of webpack than the one webpack-stream uses
const compiler = require("webpack");

// run webpack as a stream to conveniently integrate with gulp.
const webpack = require("webpack-stream");

// eslint
const eslint = require("gulp-eslint");

// webpack module
const webpackModule = {
  rules: [
    {
      test: /\.(js)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          // babelrc: false,
          presets: ["@babel/preset-env"],
        },
      },
    },
  ],
};

function buildScripts() {
  return src([
    "./app/scripts/vendors/noframework.waypoints.min.js",
    "./app/scripts/app.js",
  ])
    .pipe(
      webpack(
        {
          mode: process.env.NODE_ENV || "production",
          devtool: "source-map",
          watch: false,
          output: {
            filename: "app.js",
          },
          module: webpackModule,
        },
        compiler
      )
    )
    .pipe(dest("./dist/scripts"));
}

function lintScripts() {
  return src("./app/scripts/**/*.js")
    .pipe(eslint({ configFile: ".eslintrc.json", useEslintrc: true }))
    .pipe(eslint.format());
  // .pipe(eslint.failAfterError());
}

module.exports = {
  buildScripts,
  // lintScripts,
};
