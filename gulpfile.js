const browserSync = require("browser-sync").create();
const del = require("del");
const { series, parallel, watch } = require("gulp");
const { buildImages } = require("./gulp/tasks/images");
const { buildScripts } = require("./gulp/tasks/scripts");
const { buildStyles } = require("./gulp/tasks/styles");
const { buildHtml } = require("./gulp/tasks/html");

/**
 * BrowserSync
 */
const serve = () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
};

/**
 * Clean dist folder
 */
const clean = () => del(["./dist"]);
const cleanHtml = () => del(["./dist/*.html"]);
const cleanStyles = () => del(["./dist/styles"]);
const cleanScripts = () => del(["./dist/scripts"]);
const cleanImages = () => del(["./dist/assets/img"]);

/**
 * Watch
 */
const watchHtml = () => {
  watch("./app/src/**/*.{html,njk}")
    .on("change", series(buildHtml, browserSync.reload))
    .on("unlink", series(cleanHtml, buildHtml, browserSync.reload));
};

const watchStyles = () => {
  watch("./app/styles/**/*.scss")
    .on("change", series(buildStyles, browserSync.reload))
    .on("unlink", series(cleanStyles, buildStyles, browserSync.reload));
};

const watchScripts = () => {
  watch("./app/scripts/**/*.js")
    .on("change", series(buildScripts, browserSync.reload))
    .on("unlink", series(cleanScripts, buildScripts, browserSync.reload));
};

const watchImages = () => {
  watch("./app/assets/img/**/*")
    .on("change", series(buildImages, browserSync.reload))
    .on("unlink", series(cleanImages, buildImages, browserSync.reload));
};

/**
 * Build
 */
const dev = series(
  clean,
  // lintScripts,
  // lintStyles,
  parallel(buildImages, buildStyles, buildScripts, buildHtml),
  parallel(serve, watchImages, watchStyles, watchScripts, watchHtml)
);

const prod = series(
  clean,
  parallel(
    // lintScripts,
    // lintStyles,
    buildImages,
    buildScripts,
    buildStyles,
    buildHtml
  )
);

/**
 * Export
 */
module.exports = {
  dev,
  prod,
};

exports.default = prod;
